import React from "react";

//Code from https://github.com/mileshenrichs/easycal/blob/master/src/Components/MacroTotals.js

const NetCalories = (props) => {
  let goalDifference = props.netCalories - props.caloriesGoal;

  let calsDifference;
  if (goalDifference > 0) {
    calsDifference = (
      <span className='NetCalories__goaldifference over'>
        (+{new Intl.NumberFormat().format(goalDifference)})
      </span>
    );
  } else {
    calsDifference = (
      <span className='NetCalories__goaldifference under'>
        ({new Intl.NumberFormat().format(goalDifference)})
      </span>
    );
  }

  return (
    <div className='NetCalories'>
      <span className='NetCalories__equation'>
        <span className='NetCalories__number food'>
          {new Intl.NumberFormat().format(props.caloriesEaten)}
        </span>
        <span className='NetCalories__label'>calories from food</span>
        <span className='NetCalories__minussign'>-</span>
        <span className='NetCalories__number exercise'>
          {props.caloriesBurned
            ? new Intl.NumberFormat().format(props.caloriesBurned)
            : "0"}
        </span>
        <span className='NetCalories__label'>calories from exercise</span>
        <span className='NetCalories__equals'>=</span>
        <span className='NetCalories__number net'>
          {new Intl.NumberFormat().format(props.netCalories)}
        </span>
      </span>
      <div className='clearfix'></div>

      {props.caloriesGoal > -1 && calsDifference}
      <div className='clearfix'></div>
    </div>
  );
};

export default NetCalories;
