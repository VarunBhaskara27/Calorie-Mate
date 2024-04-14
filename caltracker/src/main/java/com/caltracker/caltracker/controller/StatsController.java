package com.caltracker.caltracker.controller;


import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.model.AddableFoodItem;
import com.caltracker.caltracker.service.ProfileService;
import com.caltracker.caltracker.service.StatsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


//Has all routes related to getting user statistics
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/getStats")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String,List<Map<String,String>>>> getUserStats(@RequestParam String fromDate, @RequestParam String toDate) throws UserNotFoundException {
        return new ResponseEntity<>(statsService.getStats(fromDate,toDate), HttpStatus.OK);
    }
}
