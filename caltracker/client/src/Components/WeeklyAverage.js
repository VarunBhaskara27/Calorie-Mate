import React from "react";
import { Table } from "react-bootstrap";

//Component to display weekly averages

const WeeklyAverage = ({ average, goals }) => {
  const nutrients = [
    "Sodium",
    "Fiber",
    "Fat",
    "Carbs",
    "Calories",
    "Sugars",
    "Protein",
  ];

  const offset = {};

  for (let nutrient of nutrients) {
    if (average && average.length && goals) {
      offset[nutrient] = average[0][nutrient] - goals[nutrient];
    }
  }
  return (
    <div>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>Goal</th>
            <th>Goal Value</th>
            <th>Weekly Average</th>
            <th>Offset</th>
          </tr>
        </thead>
        <tbody>
          {nutrients.map((nut, index) => (
            <tr key={index}>
              <td>{nut}</td>
              <td>{goals[nut]}</td>
              <td>{average[0][nut]}</td>
              <td style={{ color: offset[nut] < 0 ? "red" : "green" }}>
                {offset[nut]}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WeeklyAverage;
