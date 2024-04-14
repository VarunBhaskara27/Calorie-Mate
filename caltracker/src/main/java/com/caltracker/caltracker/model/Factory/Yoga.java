package com.caltracker.caltracker.model.Factory;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(value = "Exercise")
public class Yoga extends Exercise{
    public Yoga(int minutes){
        super(minutes);
    }
}