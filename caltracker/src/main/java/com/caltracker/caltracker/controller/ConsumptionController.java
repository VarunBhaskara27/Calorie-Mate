package com.caltracker.caltracker.controller;

import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.model.AddableFoodItem;
import com.caltracker.caltracker.model.FoodItemDetailed;
import com.caltracker.caltracker.model.FoodItemNonDetailed;
import com.caltracker.caltracker.service.APIService;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.net.URLEncoder;

import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;


//Has all routes related to searching for food, viewing details about food, adding foods, deleting them
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/consumption")
public class ConsumptionController {
    private final APIService apiService;

    public ConsumptionController(APIService apiService){
        this.apiService=apiService;
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<FoodItemNonDetailed>> queryApi(@RequestParam String foodName) throws java.io.IOException, InterruptedException, JSONException {
//        String encodedFoodName = URLEncoder.encode(foodName, StandardCharsets.UTF_8);
        return new ResponseEntity<>(apiService.searchFoods(foodName), HttpStatus.ACCEPTED);
    }

    @GetMapping("/details")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<FoodItemDetailed> getDetails(@RequestParam String foodName, @RequestParam String servingSize, @RequestParam int quantity) throws java.io.IOException, InterruptedException, JSONException {
//        String encodedFoodName = URLEncoder.encode(foodName, StandardCharsets.UTF_8);
        return new ResponseEntity<>(apiService.viewDetails(foodName,servingSize,quantity), HttpStatus.ACCEPTED);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addConsumption(@Valid @RequestBody FoodItemDetailed foodItemDetailed,@RequestParam String date,@RequestParam String mealType) throws UserNotFoundException {
        return new ResponseEntity<>(apiService.addFood(foodItemDetailed,date, mealType),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> deleteConsumption(@PathVariable("id") String consumptionId){
        Boolean flag = apiService.removeConsumption(consumptionId);
        return ResponseEntity.ok(flag);
    }

    @GetMapping("/getConsumptionsByDate")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String,List<AddableFoodItem>>> getConsumptionsByDate(@RequestParam String date) throws UserNotFoundException {
        return new ResponseEntity<>(apiService.getAllConsumptionsOfUserByDate(date),HttpStatus.OK);
    }

}
