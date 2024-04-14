package com.caltracker.caltracker.controller;


import com.caltracker.caltracker.dto.request.ExerciseRequest;
import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.model.Factory.Exercise;
import com.caltracker.caltracker.model.User;
import com.caltracker.caltracker.service.ProfileService;
import com.caltracker.caltracker.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

//Has all routes related to exercise creation, deletion, update and fetching
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/exercise")
public class UserController {
    private final ProfileService profileService;
    public UserController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/addExercise")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Exercise> addExercise(@Valid @RequestBody ExerciseRequest exerciseRequest,@RequestParam String date) throws UserNotFoundException {
        return new ResponseEntity<>(profileService.createExercise(exerciseRequest,date),HttpStatus.CREATED);
    }

    @GetMapping("/getExercise/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Exercise> getExercises(@PathVariable("id") String exerciseId) throws UserNotFoundException {
        return new ResponseEntity<>(profileService.getAllExercisesOfUser(exerciseId),HttpStatus.OK);
    }

    @GetMapping("/getExerciseByDate")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Exercise>> getExercisesByDate(@RequestParam String date) throws UserNotFoundException {
        return new ResponseEntity<>(profileService.getAllExercisesOfUserByDate(date),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Boolean> deleteExercise(@PathVariable("id") String exerciseId){
        Boolean flag = profileService.deleteExercise(exerciseId);
        return ResponseEntity.ok(flag);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Exercise> updateExercise(@PathVariable("id") String exerciseId,@RequestBody(required = false) ExerciseRequest exerciseRequest){
        return new ResponseEntity<>(profileService.updateExercise(exerciseId,exerciseRequest),HttpStatus.CREATED);
    }
}
