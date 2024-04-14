import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_GOALS_REQUEST,
  USER_GOALS_FAIL,
  USER_GOALS_SUCCESS,
  USER_UPDATE_GOALS_REQUEST,
  USER_UPDATE_GOALS_SUCCESS,
  USER_UPDATE_GOALS_FAIL,
  USER_UPDATE_GOALS_RESET,
  USER_EXERCISES_FAIL,
  USER_EXERCISES_REQUEST,
  USER_EXERCISES_SUCCESS,
  USER_EXERCISE_CREATE_FAIL,
  USER_EXERCISE_CREATE_REQUEST,
  USER_EXERCISE_CREATE_SUCCESS,
  USER_EXERCISE_CREATE_RESET,
  USER_EXERCISE_DELETE_FAIL,
  USER_EXERCISE_DELETE_REQUEST,
  USER_EXERCISE_DELETE_SUCCESS,
  USER_EXERCISE_UPDATE_FAIL,
  USER_EXERCISE_UPDATE_REQUEST,
  USER_EXERCISE_UPDATE_SUCCESS,
  USER_EXERCISE_UPDATE_RESET,
  USER_EXERCISES_ID_REQUEST,
  USER_EXERCISES_ID_SUCCESS,
  USER_EXERCISES_ID_FAIL,
  USER_EXERCISES_ID_RESET,
  USER_CONSUMPTION_SEARCH_FAIL,
  USER_CONSUMPTION_SEARCH_REQUEST,
  USER_CONSUMPTION_SEARCH_RESET,
  USER_CONSUMPTION_SEARCH_SUCCESS,
  USER_CONSUMPTION_ADD_FOOD_FAIL,
  USER_CONSUMPTION_ADD_FOOD_REQUEST,
  USER_CONSUMPTION_ADD_FOOD_RESET,
  USER_CONSUMPTION_ADD_FOOD_SUCCESS,
  USER_GET_CONSUMPTION_REQUEST,
  USER_GET_CONSUMPTION_FAIL,
  USER_GET_CONSUMPTION_RESET,
  USER_GET_CONSUMPTION_SUCCESS,
  USER_DELETE_CONSUMPTION_REQUEST,
  USER_DELETE_CONSUMPTION_SUCCESS,
  USER_DELETE_CONSUMPTION_FAIL,
  USER_GET_STATISTICS_REQUEST,
  USER_GET_STATISTICS_SUCCESS,
  USER_GET_STATISTICS_FAIL,
  USER_GET_STATISTICS_RESET,
} from "../Constants/userConstants";

//Idea from https://github.com/bradtraversy/proshop_mern/tree/master/frontend/src/reducers

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userGoalsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_GOALS_REQUEST:
      return { ...state, loading: true };
    case USER_GOALS_SUCCESS:
      return { loading: false, goals: action.payload };
    case USER_GOALS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateGoalsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_GOALS_REQUEST:
      return { loading: true };
    case USER_UPDATE_GOALS_SUCCESS:
      return { loading: false, success: true, goals: action.payload };
    case USER_UPDATE_GOALS_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_GOALS_RESET:
      return {};
    default:
      return state;
  }
};

export const userExericseReducer = (state = { exercise: [] }, action) => {
  switch (action.type) {
    case USER_EXERCISES_REQUEST:
      return { ...state, loading: true };
    case USER_EXERCISES_SUCCESS:
      return { loading: false, exercise: action.payload };
    case USER_EXERCISES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userExericseByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EXERCISES_ID_REQUEST:
      return { ...state, loading: true };
    case USER_EXERCISES_ID_SUCCESS:
      return { loading: false, exercise: action.payload };
    case USER_EXERCISES_ID_FAIL:
      return { loading: false, error: action.payload };
    case USER_EXERCISES_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const userExerciseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EXERCISE_DELETE_REQUEST:
      return { loading: true };
    case USER_EXERCISE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_EXERCISE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userExerciseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EXERCISE_CREATE_REQUEST:
      return { loading: true };
    case USER_EXERCISE_CREATE_SUCCESS:
      return { loading: false, success: true, exercise: action.payload };
    case USER_EXERCISE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_EXERCISE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userExerciseUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_EXERCISE_UPDATE_REQUEST:
      return { loading: true };
    case USER_EXERCISE_UPDATE_SUCCESS:
      return { loading: false, success: true, exercise: action.payload };
    case USER_EXERCISE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_EXERCISE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userConsumptionSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONSUMPTION_SEARCH_REQUEST:
      return { loading: true };
    case USER_CONSUMPTION_SEARCH_SUCCESS:
      return { loading: false, success: true, recommendations: action.payload };
    case USER_CONSUMPTION_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case USER_CONSUMPTION_SEARCH_RESET:
      return {};
    default:
      return state;
  }
};

export const userConsumptionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CONSUMPTION_ADD_FOOD_REQUEST:
      return { loading: true };
    case USER_CONSUMPTION_ADD_FOOD_SUCCESS:
      return { loading: false, success: true, consumption: action.payload };
    case USER_CONSUMPTION_ADD_FOOD_FAIL:
      return { loading: false, error: action.payload };
    case USER_CONSUMPTION_ADD_FOOD_RESET:
      return {};
    default:
      return state;
  }
};

export const userConsumptionReducer = (
  state = { consumptions: { Breakfast: [], Dinner: [], Lunch: [] } },
  action
) => {
  switch (action.type) {
    case USER_GET_CONSUMPTION_REQUEST:
      return { ...state, loading: true };
    case USER_GET_CONSUMPTION_SUCCESS:
      return { loading: false, consumptions: action.payload };
    case USER_GET_CONSUMPTION_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_CONSUMPTION_RESET:
      return {};
    default:
      return state;
  }
};

export const userConsumptionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_CONSUMPTION_REQUEST:
      return { loading: true };
    case USER_DELETE_CONSUMPTION_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_CONSUMPTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userStatisticsReducer = (
  state = {
    statistics: {
      DayTotals: [],
      exerciseDayTotals: [],
      OverallAverages: [],
      OverallTotals: [],
    },
  },
  action
) => {
  switch (action.type) {
    case USER_GET_STATISTICS_REQUEST:
      return { ...state, loading: true };
    case USER_GET_STATISTICS_SUCCESS:
      return { loading: false, statistics: action.payload };
    case USER_GET_STATISTICS_FAIL:
      return { loading: false, error: action.payload };
    case USER_GET_STATISTICS_RESET:
      return {};
    default:
      return state;
  }
};
