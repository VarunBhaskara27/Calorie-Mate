package com.caltracker.caltracker.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


//Model to store user consumptions along with Macro details, date food was added and the mealtype
@Data
@Document(value = "Consumption")
public class AddableFoodItem {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId foodId;
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    private String foodName;
    private int servingQty;
    private String servingUnit;
    private int servingWeightGrams;
    private Integer calories;
    private Integer sugars;
    private Integer fat;
    private Integer sodium;
    private Integer fiber;
    private Integer protein;
    private Integer potassium;
    private Integer carbs;
    private String mealType;
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
}
