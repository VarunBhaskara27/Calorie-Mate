package com.caltracker.caltracker.model.Factory;

import com.caltracker.caltracker.model.User;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Data
@Document(value = "Exercise")
public class Hiking extends Exercise{
    public Hiking(int minutes){
        super(minutes);
    }
}