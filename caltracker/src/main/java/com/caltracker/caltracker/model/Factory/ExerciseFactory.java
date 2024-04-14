package com.caltracker.caltracker.model.Factory;

import com.caltracker.caltracker.model.User;

import java.util.Date;

//Factory method
public abstract class ExerciseFactory {
    abstract Exercise createExercise(String type, int minutes);
    //Approximate estimation of Metabolic Equivalent of Task based on exercise
    public double getMetsForExercise(String exerciseName){
        switch (exerciseName){
            case "Running": return 7.0;
            case "Yoga": return 3.0;
            case "Hiking": return 4.5;
            case "Skiing": return 5.0;
            default:
                throw new IllegalArgumentException("Unsupported exercise: "+exerciseName);
        }
    }
    public int calculateCalories(String type,int minutes,double userWeight) {
        double weightInKgs=userWeight/2.2;
        double timeInHours = minutes / 60.0;
        double caloriesBurned = getMetsForExercise(type) * weightInKgs * timeInHours;
        return (int)caloriesBurned;
    }
    public Exercise processExercise(String type,int minutes,double userWeight){
        Exercise exercise=createExercise(type,minutes);
        exercise.setCaloriesBurned(calculateCalories(type,minutes,userWeight));
        return exercise;
    }
}
