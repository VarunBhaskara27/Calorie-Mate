package com.caltracker.caltracker.service;

import com.caltracker.caltracker.model.AddableFoodItem;
import com.caltracker.caltracker.model.Factory.Exercise;
import com.caltracker.caltracker.model.Iterator.ExerciseIterator;
import com.caltracker.caltracker.model.Iterator.StatisticsIterator;
import com.caltracker.caltracker.model.User;
import com.caltracker.caltracker.repository.ConsumptionRepository;
import com.caltracker.caltracker.repository.ExerciseRepository;
import com.caltracker.caltracker.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Slf4j
@Service
public class StatsService {
    private final UserService userService;
    private final ExerciseRepository exerciseRepository;
    private final MongoTemplate mongoTemplate;

    private final ConsumptionRepository consumptionRepository;

    public StatsService(UserService userService,ExerciseRepository exerciseRepository,MongoTemplate mongoTemplate,ConsumptionRepository consumptionRepository){
        this.userService=userService;
        this.exerciseRepository=exerciseRepository;
        this.mongoTemplate=mongoTemplate;
        this.consumptionRepository=consumptionRepository;
    }

    public User fetchUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails=(UserDetailsImpl) auth.getPrincipal();
        User user=userService.findByEmail(userDetails.getEmail());
        return user;
    }

    /**
     * GET method to get user statistics between two dates
     * @param fromDate
     * @param toDate
     * @return
     */

    public Map<String,List<Map<String,String>>> getStats(String fromDate, String toDate){
        User user=fetchUser();
        LocalDate fDate=LocalDate.parse(fromDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate tDate=LocalDate.parse(toDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        List<List<AddableFoodItem>> res=new ArrayList<>();
        List<List<Exercise>> exRes=new ArrayList<>();
        for(LocalDate date=fDate; date.isBefore(tDate.plusDays(1)); date=date.plusDays(1)){
            Query query=new Query();
            query.addCriteria(Criteria.where("userId").is(user.getUserId()).and("date").is(date));
            List<AddableFoodItem> mealItems = mongoTemplate.find(query, AddableFoodItem.class);
            List<Exercise> exercises = mongoTemplate.find(query, Exercise.class);
            res.add(mealItems);
            exRes.add(exercises);
        }
        //Iterator pattern used to here sum consumption and exercise related fields between two dates
        StatisticsIterator statisticsIterator=new StatisticsIterator(res);
        ExerciseIterator exerciseIterator=new ExerciseIterator(exRes);
//        StatisticsIterator<Exercise> exerciseStatisticsIterator=new StatisticsIterator<>(exRes);
        Map<String,List<Map<String,String>>> result=new HashMap<>();
        result.put("DayTotals",statisticsIterator.getDayTotals());
        result.put("OverallTotals",statisticsIterator.getOverallTotals());
        result.put("OverallAverages",statisticsIterator.getAverages());
        result.put("exerciseDayTotals",exerciseIterator.getDayTotals());
        return result;
    }


}
