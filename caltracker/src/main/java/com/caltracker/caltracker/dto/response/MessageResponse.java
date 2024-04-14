package com.caltracker.caltracker.dto.response;

//Code from https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/dto/request/SignInRequestDTO.java
public class MessageResponse {
    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}