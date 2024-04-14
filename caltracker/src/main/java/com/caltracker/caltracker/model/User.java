package com.caltracker.caltracker.model;

import com.caltracker.caltracker.model.Factory.Exercise;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


//User model which store's user details and has references to user Exercises and consumptions
@Data
@Document(collection = "Users")
public class User {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userId;
    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    private double weightInPounds;
    private double heightInInches;
    private int age;
    @NotBlank
    private String gender;
    private Map<String,Integer> goals;
    @NotBlank
    private String exCategory;

    //Code inspired from https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/model/User.java
    @DBRef
    private Set<Role> roles=new HashSet<>();
    @DBRef private ArrayList<Exercise> exerciseList=new ArrayList<>();
    @DBRef private ArrayList<AddableFoodItem> consumptions=new ArrayList<>();
}
