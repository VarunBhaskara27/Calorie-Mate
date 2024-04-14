import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

//Code idea from https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/store.js

import {
  userLoginReducer,
  userRegisterReducer,
  userGoalsReducer,
  userUpdateGoalsReducer,
  userExericseReducer,
  userExerciseCreateReducer,
  userExerciseDeleteReducer,
  userExerciseUpdateReducer,
  userExericseByIdReducer,
  userConsumptionSearchReducer,
  userConsumptionCreateReducer,
  userConsumptionReducer,
  userConsumptionDeleteReducer,
  userStatisticsReducer,
} from "./Reducers/userReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userGoals: userGoalsReducer,
  updateUserGoals: userUpdateGoalsReducer,
  userExercises: userExericseReducer,
  createUserExercise: userExerciseCreateReducer,
  deleteUserExercise: userExerciseDeleteReducer,
  updateUserExercise: userExerciseUpdateReducer,
  userExerciseById: userExericseByIdReducer,
  userConsumptionSearch: userConsumptionSearchReducer,
  userConsumptionCreate: userConsumptionCreateReducer,
  userConsumptions: userConsumptionReducer,
  userConsumptionDelete: userConsumptionDeleteReducer,
  userStatistics: userStatisticsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
