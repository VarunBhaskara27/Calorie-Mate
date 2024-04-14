package com.caltracker.caltracker.controller;


import com.caltracker.caltracker.dto.request.GoalRequest;
import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.service.ProfileService;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

//Has all routes related to getting user goals and updating them
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ProfileService profileService;
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/getGoals")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String,Integer>> getUserGoals() throws UserNotFoundException {
        return new ResponseEntity<>(profileService.getUserGoals(), HttpStatus.OK);
    }

    @PatchMapping("/updateGoals")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String,Integer>> setUserGoals(@RequestBody(required = false) String goalRequest) throws JSONException {
        return new ResponseEntity<>(profileService.updateUserGoals(goalRequest),HttpStatus.CREATED);
    }
}
