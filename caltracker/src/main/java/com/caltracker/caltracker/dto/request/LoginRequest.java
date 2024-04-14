package com.caltracker.caltracker.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;


//Code from https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/dto/request/SignInRequestDTO.java
//Data Transfer Objects enable faster Serialization and Deerialization
@Data
public class LoginRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;

}