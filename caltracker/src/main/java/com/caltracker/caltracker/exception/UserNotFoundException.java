package com.caltracker.caltracker.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException() {
    }
    public UserNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
