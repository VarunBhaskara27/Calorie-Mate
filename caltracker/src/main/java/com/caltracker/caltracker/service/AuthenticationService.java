package com.caltracker.caltracker.service;


import com.caltracker.caltracker.dto.request.LoginRequest;
import com.caltracker.caltracker.dto.response.JwtResponse;
import com.caltracker.caltracker.security.jwt.JwtUtils;
import com.caltracker.caltracker.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AuthenticationService {

    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(
            JwtUtils jwtUtils,
            UserService userService,
            AuthenticationManager authenticationManager
    ) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }
    //Mostly code from https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/service/AuthenticationService.java

    /**
     * LoginUser based on email and password(Fields contained in LoginDTO)
     * @param loginRequest
     * @return
     */
    public JwtResponse signIn(LoginRequest loginRequest){
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt=jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails=(UserDetailsImpl) authentication.getPrincipal();
        List<String> roles=userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var response=new JwtResponse(userDetails.getId(),userDetails.getEmail(),userDetails.getUsername(),jwt,roles);
        return response;
    }

    public void signOut(){
        SecurityContext securityContext=SecurityContextHolder.getContext();
        securityContext.setAuthentication(null);
    }


}
