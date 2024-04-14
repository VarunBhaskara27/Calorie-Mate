package com.caltracker.caltracker.service;


import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.model.AddableFoodItem;
import com.caltracker.caltracker.model.Factory.Exercise;
import com.caltracker.caltracker.model.FoodItemDetailed;
import com.caltracker.caltracker.model.FoodItemNonDetailed;
import com.caltracker.caltracker.model.User;
import com.caltracker.caltracker.repository.ConsumptionRepository;
import com.caltracker.caltracker.repository.UserRepository;
import com.caltracker.caltracker.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
public class APIService {
    private String instantSearch = "https://trackapi.nutritionix.com/v2/search/instant?query=";
    private String nutrientSearch = "https://trackapi.nutritionix.com/v2/natural/nutrients";

    // Headers
    private String appId;
    private String appKey;
    private String contentType = "application/json";

    private final UserRepository userRepository;
    private final ConsumptionRepository consumptionRepository;
    private final UserService userService;
    private final MongoTemplate mongoTemplate;

    //Constructor based dependency injection.

    public APIService(
            @Value("${caltracker.app.nutriotnixAppId}") String appId,
            @Value("${caltracker.app.nutriotinixAppKey}") String appKey,UserRepository userRepository
            ,ConsumptionRepository consumptionRepository,
            UserService userService
            ,MongoTemplate mongoTemplate) {
        this.appId = appId;
        this.appKey = appKey;
        this.userRepository=userRepository;
        this.consumptionRepository=consumptionRepository;
        this.userService=userService;
        this.mongoTemplate=mongoTemplate;
    }

    private String formatJson(String unformattedString) {
        String unfStr = unformattedString;
        return unfStr.substring(0, 1).toUpperCase() + unfStr.substring(1);
    }

    /**
     * @param baseArray
     * @return result, return's a list of FoodItemNonDetailed (In Models) with needed fields from the API result.
     */
    private List<FoodItemNonDetailed> getDetailsInList(JSONArray baseArray) {
        List<FoodItemNonDetailed> result = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            FoodItemNonDetailed product = new FoodItemNonDetailed();
            try {
                product.setName(formatJson((baseArray.getJSONObject(i).getString("food_name"))));
                product.setServingUnit(getServingUnits(baseArray.getJSONObject(i).optString("food_name","g")));
                product.setTag((baseArray.getJSONObject(i).getString("tag_name")));
                product.setServingQty((baseArray.getJSONObject(i).optInt("serving_qty",1)));
                product.setTagId((baseArray.getJSONObject(i).optInt("tag_id",1)));
                result.add(product);
            } catch (JSONException e) {
                log.error("Field unavailable in nutriotinix API");
            } catch (IOException e) {
                throw new RuntimeException(e);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }


    /**
     *
     * @param queryString
     * @return Returns available servingUnit's for each item user searches, this allows user to select a serving size (Ex Cup, tbl Spoon etc)
     * @throws IOException
     * @throws InterruptedException
     * @throws JSONException
     */
    private ArrayList<String> getServingUnits(String queryString) throws IOException, InterruptedException, JSONException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(nutrientSearch))
                .header("Content-Type", contentType)
                .header("x-app-id", appId)
                .header("x-app-key", appKey)
                .POST(HttpRequest.BodyPublishers.ofString("{\"query\":\"" + queryString + "\"}"))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject jsonObject = new JSONObject(response.body());
        JSONArray foods = (JSONArray) jsonObject.get("foods");
        JSONObject details = foods.getJSONObject(0);
        JSONArray measures = (JSONArray) details.get("alt_measures");
        ArrayList<String> servingUnits = new ArrayList<>();
        for (int i = 0; i < measures.length(); i++) {
            JSONObject unit = measures.getJSONObject(i);
            servingUnits.add(unit.getString("measure"));
        }
        return servingUnits;
    }

    /**
     *
     * @param query
     * @return List of foodItems that are displayed after user searches for a food on the frontend.
     * @throws java.io.IOException
     * @throws InterruptedException
     * @throws JSONException
     */

    public List<FoodItemNonDetailed> searchFoods(String query) throws java.io.IOException, InterruptedException, JSONException {
        String searchQuery = query.replaceAll("\\s+", "+");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(instantSearch + searchQuery))
                .header("Content-Type", contentType)
                .header("x-app-id", appId)
                .header("x-app-key", appKey)
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject jsonObject = new JSONObject(response.body());
        JSONArray commonFoods = (JSONArray) jsonObject.get("common");

        List<FoodItemNonDetailed> result = getDetailsInList(commonFoods);

        return result;
    }

    /**
     *
     * @param queryString
     * @param servingSize
     * @param quantity
     * @return When user select's a serving size and quantity for a given food item, this method return's details about the selected food item on the screen.
     * @throws IOException
     * @throws InterruptedException
     * @throws JSONException
     */

    public FoodItemDetailed viewDetails(String queryString, String servingSize, int quantity) throws IOException, InterruptedException, JSONException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(nutrientSearch))
                .header("Content-Type", contentType)
                .header("x-app-id", appId)
                .header("x-app-key", appKey)
                .POST(HttpRequest.BodyPublishers.ofString("{\"query\":\"" + quantity + " " + servingSize + " " + queryString + "\"}"))
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        JSONObject jsonObject = new JSONObject(response.body());
        JSONArray foods = (JSONArray) jsonObject.get("foods");
        JSONObject details = foods.getJSONObject(0);
        FoodItemDetailed foodItemDetailed = new FoodItemDetailed();
        try {
            foodItemDetailed.setFoodName(formatJson((details.getString("food_name"))));
            foodItemDetailed.setServingQty(details.optInt("serving_qty",1));
            foodItemDetailed.setServingUnit(details.optString("serving_unit","g"));
            foodItemDetailed.setServingWeightGrams((int) details.optDouble("serving_weight_grams",0));
            foodItemDetailed.setCalories((int) details.optDouble("nf_calories",0));
            foodItemDetailed.setSugars((int) details.optDouble("nf_sugars",0));
            foodItemDetailed.setFat((int) details.optDouble("nf_total_fat",0));
            foodItemDetailed.setSodium((int) details.optDouble("nf_sodium",0));
            foodItemDetailed.setFiber((int) details.optDouble("nf_dietary_fiber",0));
            foodItemDetailed.setProtein((int) details.optDouble("nf_protein",0));
            foodItemDetailed.setPotassium((int) details.optDouble("nf_potassium",0));
            foodItemDetailed.setCarbs((int) details.optDouble("nf_total_carbohydrate",0));
        } catch (JSONException e) {
            log.error("Field unavailable in nutriotinix API");
        }
        return foodItemDetailed;
    }

    /**
     * Utility method to fetchUser based on the JWT key that is passed
     * @return
     * @Reference: https://github.com/bezkoder/spring-boot-security-jwt-auth-mongodb/tree/master/src/main/java/com/bezkoder/spring/jwt/mongodb/controllers
     */

    public User fetchUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails=(UserDetailsImpl) auth.getPrincipal();
        User user=userService.findByEmail(userDetails.getEmail());
        return user;
    }

    /**
     * Method to add food into the Consumption document when user clicks on a button
     * @param foodItemDetailed (Details about the food Item that were previously fetched)
     * @param date (Day of consumption)
     * @param mealType (Breakfast, Lunch, Dinner)
     * @return
     */

    public AddableFoodItem addFood(FoodItemDetailed foodItemDetailed,String date,String mealType){
        User user=fetchUser();
        AddableFoodItem addableFoodItem=new AddableFoodItem();
        addableFoodItem.setFoodId(new ObjectId());
        addableFoodItem.setUserId(user.getUserId());
        addableFoodItem.setFoodName(foodItemDetailed.getFoodName());
        addableFoodItem.setServingQty(foodItemDetailed.getServingQty());
        addableFoodItem.setServingUnit(foodItemDetailed.getServingUnit());
        addableFoodItem.setServingWeightGrams(foodItemDetailed.getServingWeightGrams());
        addableFoodItem.setCalories(foodItemDetailed.getCalories());
        addableFoodItem.setSugars(foodItemDetailed.getSugars());
        addableFoodItem.setFat(foodItemDetailed.getFat());
        addableFoodItem.setSodium(foodItemDetailed.getSodium());
        addableFoodItem.setFiber(foodItemDetailed.getFiber());
        addableFoodItem.setProtein(foodItemDetailed.getProtein());
        addableFoodItem.setPotassium(foodItemDetailed.getPotassium());
        addableFoodItem.setCarbs(foodItemDetailed.getCarbs());
        LocalDate consumptionDate=LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        addableFoodItem.setDate(consumptionDate);
        addableFoodItem.setMealType(mealType);
        user.getConsumptions().add(addableFoodItem);
        userService.saveUser(user);
        return consumptionRepository.save(addableFoodItem);
    }

    /**
     * Remove consumption from the DB for the user
     * @param id
     * @return
     */

    public Boolean removeConsumption(String id){
        User user=fetchUser();
        var obId=new ObjectId(id);
        AddableFoodItem addableFoodItem=consumptionRepository.findById(obId).orElseThrow(()->new UserNotFoundException("Consumption not found"));
        user.getConsumptions().remove(addableFoodItem);
        consumptionRepository.delete(addableFoodItem);
        userService.saveUser(user);
        return true;
    }

    /**
     * Used for rendering user consumptions on the home screen, returns a Map with Breakfast items, Lunch items and dinner items
     * @param date
     * @return
     */

    public Map<String,List<AddableFoodItem>> getAllConsumptionsOfUserByDate(String date){
        User user=fetchUser();
        LocalDate consumptionDate=LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<AddableFoodItem> breakfast=new ArrayList<>();
        List<AddableFoodItem> lunch=new ArrayList<>();
        List<AddableFoodItem> dinner=new ArrayList<>();
        List<String> mealTypes= Arrays.asList("Breakfast","Lunch","Dinner");
        for(String meal: mealTypes){
            //https://www.baeldung.com/queries-in-spring-data-mongodb
            Query query=new Query();
            query.addCriteria(Criteria.where("userId").is(user.getUserId()).and("date").is(consumptionDate));
            query.addCriteria(Criteria.where("mealType").is(meal));
            List<AddableFoodItem> mealItems = mongoTemplate.find(query, AddableFoodItem.class);
            switch (meal){
                case "Breakfast":
                    breakfast.addAll(mealItems);
                    break;
                case "Lunch":
                    lunch.addAll(mealItems);
                    break;
                case "Dinner":
                    dinner.addAll(mealItems);
                    break;
            }
        }
        Map<String,List<AddableFoodItem>> result=new HashMap<>();
        result.put("Breakfast",breakfast);
        result.put("Lunch",lunch);
        result.put("Dinner",dinner);
        return result;
    }
}
