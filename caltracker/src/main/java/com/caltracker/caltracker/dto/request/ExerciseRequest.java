package com.caltracker.caltracker.dto.request;

import lombok.Data;

@Data
public class ExerciseRequest {
    private String exerciseType;
    private int minutes;
}
