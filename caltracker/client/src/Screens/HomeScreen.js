import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { Table, Button } from "react-bootstrap";
import {
  getUserExercises,
  createUserExercise,
  deleteUserExercise,
  getUserExerciseById,
  updateUserExercise,
  getUserConsumptions,
  deleteUserConsumption,
  createUserConsumption,
  getUserGoals,
} from "../Actions/userActions";
import DaySelect from "../Components/DaySelect";
import {
  USER_EXERCISE_CREATE_RESET,
  USER_EXERCISE_UPDATE_RESET,
  USER_EXERCISES_ID_RESET,
  USER_CONSUMPTION_SEARCH_RESET,
  USER_CONSUMPTION_ADD_FOOD_RESET,
} from "../Constants/userConstants";
import ExerciseView from "../Components/ExerciseView";
import FoodModal from "../Components/FoodModal";
import ConsumptiondDailyView from "../Components/ConsumptiondDailyView";
import CaloriesOverview from "../Components/CaloriesOverview";
import NetCalories from "../Components/NetCalories";
import MacroTotals from "../Components/MacroTotals";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  //For FoodModal
  const [show, setShow] = useState(false);
  const handleFoodModalClose = () => {
    setShow(false);
    dispatch({ type: USER_CONSUMPTION_SEARCH_RESET });
  };
  const handleFoodModalShow = () => setShow(true);

  const getTodaysDateUTC = () => {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  };

  const [day, setDay] = useState(getTodaysDateUTC());

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userExercises = useSelector((state) => state.userExercises);
  const { loading, error, exercise } = userExercises;

  const userExerciseById = useSelector((state) => state.userExerciseById);
  const { exercise: exerciseById } = userExerciseById;

  const deleteExercise = useSelector((state) => state.deleteUserExercise);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteExercise;

  const createExercise = useSelector((state) => state.createUserExercise);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createExercise;

  const updateExercise = useSelector((state) => state.updateUserExercise);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updateExercise;

  const userConsumptions = useSelector((state) => state.userConsumptions);
  const {
    loading: consumptionLoading,
    error: consumptionError,
    consumptions,
  } = userConsumptions;

  const deleteConsumption = useSelector((state) => state.userConsumptionDelete);
  const {
    loading: loadingConsumptionDelete,
    error: errorConsumptionDelete,
    success: successConsumptionDelete,
  } = deleteConsumption;

  const userConsumptionCreate = useSelector(
    (state) => state.userConsumptionCreate
  );
  const {
    loading: consumptionCreateLoading,
    error: consumptionCreateError,
    success: consumptionCreateSuccess,
  } = userConsumptionCreate;

  const userGoals = useSelector((state) => state.userGoals);
  const { goals } = userGoals;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_EXERCISE_UPDATE_RESET });
      dispatch({ type: USER_EXERCISES_ID_RESET });
    }
    // dispatch({ type: USER_EXERCISE_CREATE_RESET });
    dispatch({ type: USER_CONSUMPTION_ADD_FOOD_RESET });
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getUserGoals());
      dispatch(getUserExercises(day.toISOString().split("T")[0].toString()));
      dispatch(getUserConsumptions(day.toISOString().split("T")[0].toString()));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    day,
    successConsumptionDelete,
    successDelete,
    successCreate,
    successUpdate,
    consumptionCreateSuccess,
  ]);

  const changeDay = (day) => {
    setDay(day);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUserExercise(id));
    }
  };

  const deleteConsumptionHandler = (id) => {
    dispatch(deleteUserConsumption(id));
  };

  const updateHandler = (id) => {
    dispatch(getUserExerciseById(id));
    setShowModal(true);
  };

  const updateExerciseHandler = (id, exerciseType, minutes) => {
    dispatch(updateUserExercise(id, { exerciseType, minutes }));
    setShowModal(false);
  };

  const createExerciseHandler = (exerciseType, minutes) => {
    dispatch(
      createUserExercise(
        { exerciseType, minutes },
        day.toISOString().split("T")[0].toString()
      )
    );
    setShowModal(false);
  };

  const creatConsumptionHandler = (macros, date, mealType) => {
    dispatch(
      createUserConsumption(
        macros,
        date.toISOString().split("T")[0].toString(),
        mealType
      )
    );
    handleFoodModalClose();
  };

  const handleClose = () => setShowModal(false);

  const dayTotals = (consumptions, exercise) => {
    const result = [
      ...consumptions.Breakfast,
      ...consumptions.Lunch,
      ...consumptions.Dinner,
    ];
    const burnedCalories = exercise.reduce(
      (acc, ex) => {
        acc.caloriesBurned += ex.caloriesBurned;
        return acc;
      },
      { caloriesBurned: 0 }
    );
    const whole = result.reduce(
      (acc, item) => {
        acc.fat += item.fat;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.caloriesEaten += item.calories;
        return acc;
      },
      { fat: 0, protein: 0, carbs: 0, caloriesEaten: 0 }
    );
    const netCalories = whole.caloriesEaten - burnedCalories.caloriesBurned;
    return { ...whole, netCalories, ...burnedCalories };
  };

  const metrics = dayTotals(consumptions, exercise);

  //First displays a date picker to choose a particular day, render's calories consumed per day, render's all the consumptions
  //and exercises along with buttons to add new foods and new exercises

  return (
    <div>
      <DaySelect
        day={day}
        changeDay={changeDay}
        currentDate={getTodaysDateUTC}
      />
      <CaloriesOverview
        netCalories={metrics.netCalories}
        caloriesEaten={metrics.caloriesEaten}
        caloriesBurned={metrics.caloriesBurned}
        loading={consumptionLoading}
      />
      <h2>Consumptions</h2>
      {loadingConsumptionDelete && <Loader />}
      {errorConsumptionDelete && (
        <Message variant='danger'>{errorConsumptionDelete}</Message>
      )}
      {Object.values(consumptions).some((x) => x.length > 0) && (
        <ConsumptiondDailyView
          consumption={consumptions}
          deleteConsumption={deleteConsumptionHandler}
        />
      )}
      <div className='text-center'>
        <Button variant='primary' onClick={handleFoodModalShow}>
          <i className='fas fa-plus'></i> Add Food
        </Button>
      </div>
      <FoodModal
        show={show}
        date={day}
        handleFoodModalClose={handleFoodModalClose}
        createConsumption={creatConsumptionHandler}
      />
      <h2>Exercise</h2>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Exerice Name</th>
                <th>Minutes</th>
                <th>Calories</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {exercise &&
                exercise.map((ex) => (
                  <tr key={ex.exerciseId}>
                    <td>{ex.type}</td>
                    <td>{ex.minutes}</td>
                    <td>{ex.caloriesBurned}</td>
                    <td>
                      <Button
                        variant='light'
                        className='btn-sm'
                        onClick={() => updateHandler(ex.exerciseId)}
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(ex.exerciseId)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className='text-center'>
            <Button className='my-3' onClick={() => setShowModal(true)}>
              <i className='fas fa-plus'></i> Create Exercise
            </Button>
          </div>

          <ExerciseView
            showModal={showModal}
            handleClose={handleClose}
            onSubmit={createExerciseHandler}
            onUpdate={updateExerciseHandler}
            exercise={exerciseById}
          />
        </React.Fragment>
      )}
      )
      {goals && (
        <React.Fragment>
          <NetCalories
            caloriesEaten={metrics.caloriesEaten}
            caloriesBurned={metrics.caloriesBurned}
            netCalories={metrics.netCalories}
            caloriesGoal={goals.Calories}
          />
          <MacroTotals
            totalCarbs={metrics.carbs}
            totalFat={metrics.fat}
            totalProtein={metrics.protein}
            goals={goals}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default HomeScreen;
