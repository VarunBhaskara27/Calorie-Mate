package com.caltracker.caltracker.controller;
import javax.validation.Valid;

import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.dto.request.LoginRequest;
import com.caltracker.caltracker.dto.request.SignupRequest;
import com.caltracker.caltracker.service.AuthenticationService;
import com.caltracker.caltracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


//Code inspired by https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/controller/AuthenticationController.java

//Routes to SignIn, SignUp and SignOut
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(
            UserService userService,
            AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignupRequest signUpRequest) throws UserNotFoundException {
        return new ResponseEntity<>(userService.signUp(signUpRequest),HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody LoginRequest loginRequest) throws UserNotFoundException {
        return new ResponseEntity<>(authenticationService.signIn(loginRequest), HttpStatus.OK);
    }

    @PostMapping(value = "/sign-out")
    public ResponseEntity<?> signOut() {
        authenticationService.signOut();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}