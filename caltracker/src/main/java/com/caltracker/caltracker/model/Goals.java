package com.caltracker.caltracker.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;


//Model to Store calculated user goals, and is then written into the user model
@Data
@Document
public class Goals {
    private Integer calories;
    private Integer sugars;
    private Integer fat;
    private Integer sodium;
    private Integer fiber;
    private Integer protein;
    private Integer potassium;
    private Integer carbs;
}
