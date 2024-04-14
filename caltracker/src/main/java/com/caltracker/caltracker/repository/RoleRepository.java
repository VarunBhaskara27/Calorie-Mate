package com.caltracker.caltracker.repository;

import com.caltracker.caltracker.model.ERole;
import com.caltracker.caltracker.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


//Proxy intermediary which talks to MongoDB model
public interface RoleRepository extends MongoRepository<Role,String> {
    Optional<Role> findByName(ERole name);
}
