import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

//Component to display daily totals for a given a date range

const StatsTable = ({ totals, overall }) => {
  const results = totals.filter((element) => {
    if (Object.keys(element).length !== 0) {
      return true;
    }
    return false;
  });

  const columns = [
    { dataField: "Day", text: "Day" },
    { dataField: "Calories", text: "Calories" },
    { dataField: "Protein", text: "Protein" },
    { dataField: "Carbs", text: "Carbs" },
    { dataField: "Fat", text: "Fat" },
    { dataField: "Sugars", text: "Sugars" },
    { dataField: "Fiber", text: "Fiber" },
    { dataField: "Sodium", text: "Sodium" },
  ];

  const rows = () => {
    const rowsData = [...results];
    if (overall && overall.length) {
      rowsData.push({
        Day: "Totals",
        Calories: overall[0].Calories,
        Protein: overall[0].Protein,
        Carbs: overall[0].Carbs,
        Fat: overall[0].Fat,
        Sugars: overall[0].Sugars,
        Fiber: overall[0].Fiber,
        Sodium: overall[0].Sodium,
      });
    }
    return rowsData;
  };

  return (
    <div>
      <BootstrapTable
        keyField='foodName'
        data={rows()}
        columns={columns}
        rowClasses={(row, rowIndex) => {
          if (rowIndex === rows().length - 1) {
            return "last-row";
          } else {
            return "";
          }
        }}
      />
    </div>
  );
};

export default StatsTable;
