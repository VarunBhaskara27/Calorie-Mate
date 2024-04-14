package com.caltracker.caltracker.model.Template;

import com.caltracker.caltracker.model.User;

import java.util.HashMap;
import java.util.InvalidPropertiesFormatException;
import java.util.Map;


//Template pattern
public abstract class UserMaintenanceCalculator {
    public final Map<String,Integer> calculateCalories(User user){
        Map<String, Integer> out = new HashMap<>();
        Integer basalMetabolicRate=calculateBMR(user);
        Integer maintenanceCalories=(int) getMultiplier(user)*basalMetabolicRate;
        Integer proteinWeight=(int) ((maintenanceCalories*0.4)/4);
        Integer carbWeight=(int) ((maintenanceCalories*0.4)/4);
        Integer fatWeight=(int) ((maintenanceCalories*0.2)/9);
        out.put("Calories",maintenanceCalories);
        out.put("Sugars",90);
        out.put("Fat",fatWeight);
        out.put("Sodium",2300);
        out.put("Fiber",30);
        out.put("Protein",proteinWeight);
        out.put("Carbs",carbWeight);
        return  out;
    }

    abstract Integer calculateBMR(User user);


    //Equation from https://www.t-nation.com/lean-built-eating/mifflin-st-jeor-calorie-equation-weight-loss/
    //Activity level index
    public double getMultiplier(User user){
        switch (user.getExCategory()){
            case "SEDENTARY" -> {
                return 1.2;
            }
            case "ONE_TO_THREE_TIMES_A_WEEK" ->{
                return 1.375;
            }
            case "FOUR_TO_FIVE_TIMES_A_WEEK"->{
                return 1.46;
            }
            case "DAILY_EXERCISE_OR_INTENSE_EXERCISE_THREE_FOUR_TIMES_A_WEEK" ->{
                return 1.725;
            }case "INTENSE_EXERCISE_SIX_TIMES_A_WEEK" ->{
                return 1.9;
            }
            default -> {
                return 1;
            }
        }
    }

}
