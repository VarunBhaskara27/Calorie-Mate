import React from "react";
import { Button } from "react-bootstrap";

//Component to display the consumption's per day as a table

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
const ConsumptiondDailyView = ({ consumption, deleteConsumption }) => {
  const mealTypes = Object.keys(consumption);

  const totals = mealTypes.reduce((acc, mealType) => {
    const items = consumption[mealType];
    const mealTotals = items.reduce(
      (mealAcc, item) => {
        mealAcc.fat += item.fat;
        mealAcc.protein += item.protein;
        mealAcc.carbs += item.carbs;
        mealAcc.calories += item.calories;
        return mealAcc;
      },
      { fat: 0, protein: 0, carbs: 0, calories: 0 }
    );
    acc[mealType] = mealTotals;
    return acc;
  }, {});

  const rows = (mealType) => {
    const items = consumption[mealType];
    const acc = [...items];
    acc.push({
      foodName: "Totals",
      fat: totals[mealType].fat,
      protein: totals[mealType].protein,
      carbs: totals[mealType].carbs,
      calories: totals[mealType].calories,
    });
    return acc;
  };

  const columns = [
    { dataField: "foodName", text: "Food" },
    { dataField: "fat", text: "Fat" },
    { dataField: "protein", text: "Protein" },
    { dataField: "carbs", text: "Carbs" },
    { dataField: "calories", text: "Calories" },
    {
      text: "",
      formatter: (cell, row) => {
        if (row.foodId) {
          return (
            <Button
              variant='danger'
              size='sm'
              onClick={() => deleteConsumption(row.foodId)}
            >
              <i className='fas fa-trash-alt'></i>
            </Button>
          );
        }
      },
    },
  ];

  return (
    <>
      {rows("Breakfast").length > 1 && (
        <div>
          <h4>Breakfast</h4>
          <BootstrapTable
            keyField='foodName'
            data={rows("Breakfast")}
            columns={columns}
            rowClasses={(row, rowIndex) => {
              if (rowIndex === rows("Breakfast").length - 1) {
                return "last-row";
              } else {
                return "";
              }
            }}
          />
        </div>
      )}

      {rows("Lunch").length > 1 && (
        <div>
          <h4>Lunch</h4>
          <BootstrapTable
            keyField='foodName'
            data={rows("Lunch")}
            columns={columns}
            rowClasses={(row, rowIndex) => {
              if (rowIndex === rows("Lunch").length - 1) {
                return "last-row";
              } else {
                return "";
              }
            }}
          />
        </div>
      )}

      {rows("Dinner").length > 1 && (
        <div>
          <h4>Dinner</h4>
          <BootstrapTable
            keyField='foodName'
            data={rows("Dinner")}
            columns={columns}
            rowClasses={(row, rowIndex) => {
              if (rowIndex === rows("Dinner").length - 1) {
                return "last-row";
              } else {
                return "";
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default ConsumptiondDailyView;
