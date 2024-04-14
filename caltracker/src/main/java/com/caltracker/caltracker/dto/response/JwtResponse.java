package com.caltracker.caltracker.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

//Code from https://github.com/Jelani-Ak/twitter-clone-project/blob/main/backend/src/main/java/com/jelaniak/twittercloneproject/dto/request/SignInRequestDTO.java
@Data
public class JwtResponse {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private String id;

    private String email;
    private String token;

    private List<String> roles;

    private String username;
    private String type = "Bearer";

    public JwtResponse(
            String id,
            String email,
            String username,
            String token,
            List<String> roles) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.username = username;
        this.roles = roles;
    }
}

