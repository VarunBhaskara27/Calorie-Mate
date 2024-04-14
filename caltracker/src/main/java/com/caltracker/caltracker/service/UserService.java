package com.caltracker.caltracker.service;

import com.caltracker.caltracker.dto.request.LoginRequest;
import com.caltracker.caltracker.dto.request.SignupRequest;
import com.caltracker.caltracker.dto.response.JwtResponse;
import com.caltracker.caltracker.exception.UserNotFoundException;
import com.caltracker.caltracker.model.ERole;
import com.caltracker.caltracker.model.Role;
import com.caltracker.caltracker.model.Template.FemaleMaintenanceCalculator;
import com.caltracker.caltracker.model.Template.MaleMaintenanceCalculator;
import com.caltracker.caltracker.model.Template.UserMaintenanceCalculator;
import com.caltracker.caltracker.model.User;
import com.caltracker.caltracker.repository.RoleRepository;
import com.caltracker.caltracker.repository.UserRepository;
import com.caltracker.caltracker.security.jwt.JwtUtils;
import com.caltracker.caltracker.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.caltracker.caltracker.utils.Helper.getTimeNow;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    //Code largely inspired by https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/service/UserService.java

    @Autowired
    public UserService(UserRepository userRepository,RoleRepository roleRepository,PasswordEncoder encoder,JwtUtils jwtUtils,AuthenticationManager authenticationManager){
        this.userRepository=userRepository;
        this.roleRepository=roleRepository;
        this.encoder=encoder;
        this.authenticationManager=authenticationManager;
        this.jwtUtils=jwtUtils;
    }

    public User findByUserId(ObjectId userId) throws UserNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User by Id: [" + userId + "] was not found"));

        return user;
    }

    public User findByEmail(String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User by Id: [" + email + "] was not found"));
        return user;
    }

    private void checkUserNameExists(SignupRequest signupRequest) throws UserNotFoundException{
        boolean userExists=userRepository.existsByUsername(signupRequest.getUsername());

        if(userExists){
            log.error(getTimeNow() + "Failed to create user. Username, '" + signupRequest.getUsername() + "' is already taken");
            throw new UserNotFoundException("Failed to create user. Username, '" + signupRequest.getUsername() + "' is already taken");
        }
    }

    private void checkEmailExists(SignupRequest signupRequest) throws UserNotFoundException{
        boolean userExists=userRepository.existsByEmail(signupRequest.getEmail());

        if(userExists){
            log.error(getTimeNow() + "Failed to create user. Email, '" + signupRequest.getEmail() + "' is already taken");
            throw new UserNotFoundException("Failed to create user. Email, '" + signupRequest.getEmail() + "' is already taken");
        }
    }

    public JwtResponse signUp(SignupRequest signupRequest) throws UserNotFoundException{
        log.info(getTimeNow() + "Creating new user, '" + signupRequest.getUsername() + "'..");
        checkUserNameExists(signupRequest);
        checkEmailExists(signupRequest);
        log.info(getTimeNow() + "User created successfully");
        return createUser(signupRequest);
    }

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

    /**
     * Method to create user
     * @param signupRequest
     * @return
     */

    private JwtResponse createUser(SignupRequest signupRequest){
        User user=new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(encoder.encode(signupRequest.getPassword()));
        user.setWeightInPounds(signupRequest.getWeightInPounds());
        user.setHeightInInches(signupRequest.getHeightInInches());
        user.setAge(signupRequest.getAge());
        user.setGender(signupRequest.getGender());
        user.setExCategory(signupRequest.getExCategory());
        UserMaintenanceCalculator calculator=null;

        //Template method used here to calculate BMR and maintenance calories per user
        if(user.getGender().equalsIgnoreCase("male")){
            calculator=new MaleMaintenanceCalculator();
        }else{
            calculator=new FemaleMaintenanceCalculator();
        }
        user.setGoals(calculator.calculateCalories(user));
        user.setExerciseList(new ArrayList<>());
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);
        LoginRequest loginRequest=new LoginRequest();
        loginRequest.setUsername(signupRequest.getUsername());
        loginRequest.setPassword(signupRequest.getPassword());
        saveUser(user);
        return signIn(loginRequest);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

}
