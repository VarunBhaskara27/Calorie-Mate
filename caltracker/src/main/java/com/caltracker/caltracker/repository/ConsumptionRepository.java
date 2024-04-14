package com.caltracker.caltracker.repository;

import com.caltracker.caltracker.model.AddableFoodItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//Proxy intermediary which talks to MongoDB model
@Repository
public interface ConsumptionRepository extends MongoRepository<AddableFoodItem, ObjectId> {
    Optional<List<AddableFoodItem>> findByUserId(ObjectId id);
}
