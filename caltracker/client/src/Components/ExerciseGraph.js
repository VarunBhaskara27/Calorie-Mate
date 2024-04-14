import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

//Component that render's a graph of Calories Eaten vs Calories Burned between two given dates

const ExerciseGraph = ({ toDate, fromDate, totals, exercises }) => {
  let dateRange = [];
  const start = new Date(fromDate);
  const end = new Date(toDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  for (let i = 0; i <= diffDays; i++) {
    const curDate = new Date(start);
    curDate.setDate(curDate.getDate() + i);
    dateRange.push(curDate.toISOString().slice(0, 10));
  }

  const plotData = dateRange.map((day) => {
    const calsEatenItem = totals.find((item) => item.Day === day);
    const calsBurnedItem = exercises.find((item) => item.Day === day);
    const calsEaten = calsEatenItem ? parseInt(calsEatenItem.Calories) : 0;
    const calsBurned = calsBurnedItem
      ? parseInt(calsBurnedItem.CaloriesBurned)
      : 0;
    return {
      Day: day,
      caloriesEaten: calsEaten,
      caloriesBurned: calsBurned,
    };
  });

  console.log(plotData);

  return (
    <LineChart width={600} height={300} data={plotData}>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='Day' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type='monotone' dataKey='caloriesEaten' stroke='#8884d8' />
      <Line type='monotone' dataKey='caloriesBurned' stroke='#82ca9d' />
    </LineChart>
  );
};

export default ExerciseGraph;
