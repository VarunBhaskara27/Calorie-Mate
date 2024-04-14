package com.caltracker.caltracker.model.Factory;
import com.caltracker.caltracker.model.User;

import java.util.Date;


//Factory Method creator
public class ExerciseCreator extends ExerciseFactory{

    @Override
    Exercise createExercise(String type,int minutes) {
        switch (type){
            case "Running":
                return new Running(minutes);
            case "Skiing":
                return new Skiing(minutes);
            case "Hiking":
                return new Hiking(minutes);
            case "Yoga":
                return new Yoga(minutes);
            default:
                throw new IllegalArgumentException("Unsupported exercise");
        }
    }
}
