package com.caltracker.caltracker.model;


import lombok.Data;

import java.util.ArrayList;


//Code inspired from https://github.com/murphy1/foodlogger/blob/master/src/main/java/com/murphy1/foodlogger/model/NutritionixBaseProduct.java
//To store search result details
@Data
public class FoodItemNonDetailed {
    private String name;
    private ArrayList<String> servingUnit;
    private String tag;
    private int servingQty;
    private int tagId;
}
