package com.caltracker.caltracker.model.Factory;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(value = "Exercise")
public class Running extends Exercise{
    public Running(int minutes){
        super(minutes);
    }
}
