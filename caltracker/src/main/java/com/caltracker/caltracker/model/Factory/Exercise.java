package com.caltracker.caltracker.model.Factory;
import com.caltracker.caltracker.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;


//Base class for Exercises inherited by other subclasses
@Data
@Document(value = "Exercise")
public abstract class Exercise {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId exerciseId;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    private int minutes;
    private String type;
    private int caloriesBurned;
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    public Exercise(int minutes){
        this.minutes=minutes;
    }

    public Exercise(){

    }

}
