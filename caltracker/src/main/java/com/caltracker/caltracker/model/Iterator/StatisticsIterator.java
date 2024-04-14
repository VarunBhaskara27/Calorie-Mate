package com.caltracker.caltracker.model.Iterator;

import com.caltracker.caltracker.model.AddableFoodItem;

import java.util.*;


//Iterator pattern to iterate over entities to calculate statistics
public class StatisticsIterator implements Iterator<List<AddableFoodItem>> {
    private List<List<AddableFoodItem>> items;
    private int index;

    public StatisticsIterator(List<List<AddableFoodItem>> items){
        this.items=items;
    }
    @Override
    public boolean hasNext() {
        return index<items.size();
    }

    @Override
    public List<AddableFoodItem> next() {
        return items.get(index++);
    }

    public ArrayList<Map<String,String>> getDayTotals(){
        ArrayList<Map<String,String>> res=new ArrayList<>();
        for(List<AddableFoodItem> item: items){
            Map<String,String> dayTotals=new HashMap<>();
            for(AddableFoodItem i: item){
                dayTotals.put("Calories",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Calories","0"))+i.getCalories()));
                dayTotals.put("Carbs",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Carbs","0"))+i.getCarbs()));
                dayTotals.put("Protein",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Protein","0"))+i.getProtein()));
                dayTotals.put("Fat",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Fat","0"))+i.getFat()));
                dayTotals.put("Sugars",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Sugars","0"))+i.getSugars()));
                dayTotals.put("Fiber",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Fiber","0"))+i.getFiber()));
                dayTotals.put("Sodium",String.valueOf (Integer.parseInt(dayTotals.getOrDefault("Sodium","0"))+i.getSodium()));
                dayTotals.put("Day",i.getDate().toString());
            }
            res.add(dayTotals);
        }
        return res;
    }

    public ArrayList<Map<String,String>> getOverallTotals(){
        ArrayList<Map<String,String>> dayTotals=this.getDayTotals();
        ArrayList<Map<String,String>> res=new ArrayList<>();
        Map<String,String> overallTotals = new HashMap<>();
        for(Map<String,String> dayTotal : dayTotals){
            for(Map.Entry<String,String> entry: dayTotal.entrySet()){
                if(entry.getKey().equals("Day")){
                    continue;
                }
                String key=entry.getKey();
                String value=entry.getValue();
                overallTotals.put(key, String.valueOf (Integer.parseInt(overallTotals.getOrDefault(key, "0")) + Integer.parseInt(value)));
            }
        }
        overallTotals.remove("Day");
        res.add(overallTotals);
        return res;
    }

    public ArrayList<Map<String,String>> getAverages(){
        ArrayList<Map<String,String>> dayTotals=this.getOverallTotals();
        ArrayList<Map<String,String>> res=new ArrayList<>();
        Map<String,String> overallTotals = new HashMap<>();
        for(Map<String,String> dayTotal : dayTotals){
            for(Map.Entry<String,String> entry: dayTotal.entrySet()){
                String key=entry.getKey();
                String value=entry.getValue();
                int dividedValue = Integer.parseInt(value) / this.items.size();
                overallTotals.put(key, String.valueOf (dividedValue));
            }
        }
        res.add(overallTotals);
        return res;
    }


}
