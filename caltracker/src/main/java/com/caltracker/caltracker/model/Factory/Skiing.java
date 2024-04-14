package com.caltracker.caltracker.model.Factory;


import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(value = "Exercise")
public class Skiing extends Exercise{
    public Skiing(int minutes){
        super(minutes);
    }
}
