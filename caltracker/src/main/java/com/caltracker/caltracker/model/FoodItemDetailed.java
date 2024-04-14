package com.caltracker.caltracker.model;
import lombok.Data;


//Code inspired from https://github.com/murphy1/foodlogger/blob/master/src/main/java/com/murphy1/foodlogger/model/NutritionixDetailedProduct.java
//To display details when user click's on view details
@Data
public class FoodItemDetailed {
    private String foodName;
    private int servingQty;
    private String servingUnit;
    private int servingWeightGrams;
    private int calories;
    private int sugars;
    private int fat;
    private int sodium;
    private int fiber;
    private int protein;
    private int potassium;
    private int carbs;
}
