package com.caltracker.caltracker.service;

import com.caltracker.caltracker.dto.request.ExerciseRequest;
import com.caltracker.caltracker.dto.request.GoalRequest;
import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.model.Factory.Exercise;
import com.caltracker.caltracker.model.Factory.ExerciseCreator;
import com.caltracker.caltracker.model.User;
import com.caltracker.caltracker.repository.ExerciseRepository;
import com.caltracker.caltracker.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;


@Slf4j
@Service
public class ProfileService {

    private final UserService userService;
    private final ExerciseRepository exerciseRepository;
    private final MongoTemplate mongoTemplate;

    public ProfileService(UserService userService,ExerciseRepository exerciseRepository,MongoTemplate mongoTemplate){
        this.userService=userService;
        this.exerciseRepository=exerciseRepository;
        this.mongoTemplate=mongoTemplate;
    }

    public User fetchUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails=(UserDetailsImpl) auth.getPrincipal();
        User user=userService.findByEmail(userDetails.getEmail());
        return user;
    }

    /**
     * Create exercise for a given date
     * @param exerciseRequest
     * @param date
     * @return
     * @throws UserNotFoundException
     */

    public Exercise createExercise(ExerciseRequest exerciseRequest,String date) throws UserNotFoundException {
        ExerciseCreator exerciseCreator=new ExerciseCreator();
        User user=fetchUser();

        //Factory pattern used here, takes user exercise name, number of minutes and userweight and
        //calculates the calories burned based on the exercise being initialized
        Exercise exercise=exerciseCreator.processExercise(exerciseRequest.getExerciseType(),exerciseRequest.getMinutes(),user.getWeightInPounds());
        exercise.setExerciseId(new ObjectId());
        exercise.setType(exerciseRequest.getExerciseType());
        exercise.setMinutes(exerciseRequest.getMinutes());
        exercise.setUserId(user.getUserId());
        LocalDate exerciseDate=LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        exercise.setDate(exerciseDate);
        user.getExerciseList().add(exercise);
        userService.saveUser(user);
        return exerciseRepository.save(exercise);
    }

    /**
     * GET method to return exercise details by ID
     * @param exerciseId
     * @return
     */

    public Exercise getAllExercisesOfUser(String exerciseId){
        var obId=new ObjectId(exerciseId);
        return exerciseRepository.findById(obId).orElseThrow(()-> new UserNotFoundException("Exercises not found"));
    }

    /**
     * GET method to return exercises by date
     * @param date
     * @return
     */

    public List<Exercise> getAllExercisesOfUserByDate(String date){
        User user=fetchUser();
        LocalDate exerciseDate=LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        Query query=new Query();
        query.addCriteria(Criteria.where("userId").is(user.getUserId()).and("date").is(exerciseDate));
        List<Exercise> exercises=mongoTemplate.find(query,Exercise.class);
        return exercises;
    }

    /**
     * DELETE method to delete exercise by ID
     * @param id
     * @return
     */

    public Boolean deleteExercise(String id){
        User user=fetchUser();
        var obId=new ObjectId(id);
        Exercise exercise=exerciseRepository.findById(obId).orElseThrow(()->new UserNotFoundException("Exercise not found"));
        user.getExerciseList().remove(exercise);
        exerciseRepository.delete(exercise);
        userService.saveUser(user);
        return true;
    }

    /**
     * PATCH method to update exercise by id using exercise data
     * @param id
     * @param exerciseRequest
     * @return
     */

    public Exercise updateExercise(String id,ExerciseRequest exerciseRequest){
        var obId=new ObjectId(id);
        if(exerciseRequest!=null){
            User user=fetchUser();
            Exercise exercise=exerciseRepository.findById(obId).orElseThrow(()->new UserNotFoundException("Exercise not found"));
            if(exerciseRequest.getMinutes()!=0){
                exercise.setMinutes(exerciseRequest.getMinutes());
            }
            if(exerciseRequest.getExerciseType()!=null){
                exercise.setType(exerciseRequest.getExerciseType());
            }
            ExerciseCreator exerciseCreator=new ExerciseCreator();
            exercise.setCaloriesBurned((exerciseCreator.processExercise(exercise.getType(),exercise.getMinutes(),user.getWeightInPounds())).getCaloriesBurned());
            return exerciseRepository.save(exercise);
        }else{
            Exercise exercise=exerciseRepository.findById(obId).orElseThrow(()->new UserNotFoundException("Exercise not found"));
            return exercise;
        }
    }

    /**
     * GET method to calculate user goals
     * @return
     */

    public Map<String,Integer> getUserGoals(){
        User user=fetchUser();
        return user.getGoals();
    }

    /**
     * PATCH method to update user goals /profile screen on the frontend
     * @param goalRequest
     * @return
     * @throws JSONException
     */

    public Map<String,Integer> updateUserGoals(String goalRequest) throws JSONException {
        User user=fetchUser();
        JSONObject goalJson=new JSONObject(goalRequest);
        if(goalJson!=null){
            if(goalJson.has("Calories")){
                user.getGoals().put("Calories",(Integer) goalJson.get("Calories"));
            }
            if(goalJson.has("Carbs")){
                user.getGoals().put("Carbs",(Integer) goalJson.get("Carbs"));
            }
            if(goalJson.has("Protein")){
                user.getGoals().put("Protein",(Integer) goalJson.get("Protein"));
            }
            if(goalJson.has("Fat")){
                user.getGoals().put("Fat",(Integer) goalJson.get("Fat"));
            }
            if(goalJson.has("Sodium")){
                user.getGoals().put("Sodium",(Integer) goalJson.get("Sodium"));
            }
            if(goalJson.has("Fiber")){
                user.getGoals().put("Fiber",(Integer) goalJson.get("Fiber"));
            }
            if(goalJson.has("Sugars")){
                user.getGoals().put("Sugars",(Integer) goalJson.get("Sugars"));
            }
            userService.saveUser(user);
            return user.getGoals();
        }else{
            return user.getGoals();
        }
    }
}
