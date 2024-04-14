import React from "react";
import Loader from "./Loader";

//Component to display the overall calorie view per day

const CaloriesOverview = ({
  netCalories,
  caloriesEaten,
  caloriesBurned,
  loading,
}) => {
  let netCaloriesElement;
  if (loading) {
    <Loader />;
  } else {
    netCaloriesElement = (
      <span className='CalOverview__net'>
        {new Intl.NumberFormat().format(netCalories)}
      </span>
    );
  }

  return (
    <div className='CalOverview'>
      {netCaloriesElement}
      {!loading && caloriesEaten !== 0 && caloriesBurned !== 0 && (
        <span className='CalOverview__plusminuscontainer'>
          <span className='CalOverview__plusminus'>
            <span className='CalOverview__plusminus--food'>
              +{caloriesEaten}
            </span>
            <span className='CalOverview__plusminus--exercise'>
              -{caloriesBurned ? caloriesBurned : 0}
            </span>
          </span>
        </span>
      )}
    </div>
  );
};

export default CaloriesOverview;
