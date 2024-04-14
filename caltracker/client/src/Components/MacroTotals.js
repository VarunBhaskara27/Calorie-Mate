import React from "react";

//Code from https://github.com/mileshenrichs/easycal/blob/master/src/Components/MacroTotals.js

const MacroTotals = (props) => {
  const goalDifferences = {
    carbs: props.totalCarbs - props.goals.Carbs,
    fat: props.totalFat - props.goals.Fat,
    protein: props.totalProtein - props.goals.Protein,
  };

  let carbsDifference;
  if (goalDifferences.carbs > 0) {
    carbsDifference = (
      <span className='MacroTotals__macro--goaldifference over'>
        Carbs (+{goalDifferences.carbs})
      </span>
    );
  } else {
    carbsDifference = (
      <span className='MacroTotals__macro--goaldifference under'>
        Carbs ({goalDifferences.carbs})
      </span>
    );
  }

  let fatDifference;
  if (goalDifferences.fat > 0) {
    fatDifference = (
      <span className='MacroTotals__macro--goaldifference over'>
        Fat (+{goalDifferences.fat})
      </span>
    );
  } else {
    fatDifference = (
      <span className='MacroTotals__macro--goaldifference under'>
        Fat ({goalDifferences.fat})
      </span>
    );
  }

  let proteinDifference;
  if (goalDifferences.protein > 0) {
    proteinDifference = (
      <span className='MacroTotals__macro--goaldifference over'>
        Protein (+{goalDifferences.protein})
      </span>
    );
  } else {
    proteinDifference = (
      <span className='MacroTotals__macro--goaldifference under'>
        Protein ({goalDifferences.protein})
      </span>
    );
  }

  let caloriesGoalText;
  if (props.goals.calories > -1) {
    caloriesGoalText = (
      <span className='MacroTotals__caloriesgoal'>
        GOAL: {props.goals.calories}
      </span>
    );
  }

  return (
    <div className='MacroTotals'>
      <span className='MacroTotals__label'>Macros:</span>
      <span className='MacroTotals__macro'>
        <span className='MacroTotals__macro--value'>{props.totalCarbs} g</span>
        {props.goals.Carbs > -1 && carbsDifference}
      </span>
      <span className='MacroTotals__macro'>
        <span className='MacroTotals__macro--value'>{props.totalFat} g</span>
        {props.goals.Fat > -1 && fatDifference}
      </span>
      <span className='MacroTotals__macro protein'>
        <span className='MacroTotals__macro--value'>
          {props.totalProtein} g
        </span>
        {props.goals.Protein > -1 && proteinDifference}
      </span>

      {caloriesGoalText}
    </div>
  );
};

export default MacroTotals;
