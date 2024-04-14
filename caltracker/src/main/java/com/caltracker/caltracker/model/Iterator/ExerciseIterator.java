package com.caltracker.caltracker.model.Iterator;

import com.caltracker.caltracker.model.AddableFoodItem;
import com.caltracker.caltracker.model.Factory.Exercise;

import java.util.*;

public class ExerciseIterator implements Iterator<List<Exercise>> {
    private List<List<Exercise>> items;
    private int index;

    public ExerciseIterator(List<List<Exercise>> items) {
        this.items = items;
    }

    @Override
    public boolean hasNext() {
        return index < items.size();
    }

    @Override
    public List<Exercise> next() {
        return items.get(index++);
    }

    public ArrayList<Map<String, String>> getDayTotals() {
        ArrayList<Map<String, String>> res = new ArrayList<>();
        for (List<Exercise> item : items) {
            Map<String, String> dayTotals = new HashMap<>();
            for (Exercise i : item) {
                dayTotals.put("CaloriesBurned", String.valueOf(Integer.parseInt(dayTotals.getOrDefault("Burned Calories", "0")) + i.getCaloriesBurned()));
                dayTotals.put("Day", i.getDate().toString());
            }
            res.add(dayTotals);
        }
        return res;
    }
}
