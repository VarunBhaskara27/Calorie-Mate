import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_GOALS_FAIL,
  USER_GOALS_SUCCESS,
  USER_GOALS_REQUEST,
  USER_UPDATE_GOALS_REQUEST,
  USER_UPDATE_GOALS_SUCCESS,
  USER_UPDATE_GOALS_FAIL,
  USER_EXERCISES_FAIL,
  USER_EXERCISES_REQUEST,
  USER_EXERCISES_SUCCESS,
  USER_EXERCISE_CREATE_FAIL,
  USER_EXERCISE_CREATE_REQUEST,
  USER_EXERCISE_CREATE_SUCCESS,
  USER_EXERCISE_DELETE_FAIL,
  USER_EXERCISE_DELETE_REQUEST,
  USER_EXERCISE_DELETE_SUCCESS,
  USER_EXERCISE_UPDATE_FAIL,
  USER_EXERCISE_UPDATE_REQUEST,
  USER_EXERCISE_UPDATE_SUCCESS,
  USER_EXERCISES_ID_REQUEST,
  USER_EXERCISES_ID_SUCCESS,
  USER_EXERCISES_ID_FAIL,
  USER_CONSUMPTION_SEARCH_FAIL,
  USER_CONSUMPTION_SEARCH_REQUEST,
  USER_CONSUMPTION_SEARCH_SUCCESS,
  USER_CONSUMPTION_ADD_FOOD_FAIL,
  USER_CONSUMPTION_ADD_FOOD_REQUEST,
  USER_CONSUMPTION_ADD_FOOD_SUCCESS,
  USER_GET_CONSUMPTION_REQUEST,
  USER_GET_CONSUMPTION_FAIL,
  USER_GET_CONSUMPTION_SUCCESS,
  USER_DELETE_CONSUMPTION_REQUEST,
  USER_DELETE_CONSUMPTION_SUCCESS,
  USER_DELETE_CONSUMPTION_FAIL,
  USER_GET_STATISTICS_REQUEST,
  USER_GET_STATISTICS_SUCCESS,
  USER_GET_STATISTICS_FAIL,
  USER_GET_STATISTICS_RESET,
} from "../Constants/userConstants";

//Idea from https://github.com/bradtraversy/proshop_mern/tree/master/frontend/src/actions

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8080/api/auth/signin",
      { username, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const register =
  (
    username,
    email,
    password,
    weightInPounds,
    heightInInches,
    age,
    gender,
    exCategory
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          username,
          email,
          password,
          weightInPounds,
          heightInInches,
          age,
          gender,
          exCategory,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserGoals = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GOALS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/profile/getGoals`,
      config
    );

    dispatch({
      type: USER_GOALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_GOALS_FAIL,
      payload: message,
    });
  }
};

export const updateUserGoals = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_GOALS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `http://localhost:8080/api/profile/updateGoals`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_GOALS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_GOALS_FAIL,
      payload: message,
    });
  }
};

export const getUserExercises = (date) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EXERCISES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/exercise/getExerciseByDate?date=${date}`,
      config
    );

    dispatch({
      type: USER_EXERCISES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_EXERCISES_FAIL,
      payload: message,
    });
  }
};

export const getUserExerciseById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EXERCISES_ID_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/exercise/getExercise/${id}`,
      config
    );

    dispatch({
      type: USER_EXERCISES_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_EXERCISES_ID_FAIL,
      payload: message,
    });
  }
};

export const deleteUserExercise = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EXERCISE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:8080/api/exercise/${id}`, config);

    dispatch({ type: USER_EXERCISE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_EXERCISE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createUserExercise =
  (body, date) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_EXERCISE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8080/api/exercise/addExercise?date=${date}`,
        body,
        config
      );

      dispatch({
        type: USER_EXERCISE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_EXERCISE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserExercise = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EXERCISE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8080/api/exercise/${id}`,
      body,
      config
    );

    dispatch({
      type: USER_EXERCISE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_EXERCISE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getUserConsumptionSearches =
  (food) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_CONSUMPTION_SEARCH_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const encoded = encodeURI(food);

      const { data } = await axios.get(
        `http://localhost:8080/api/consumption/search?foodName=${encoded}`,
        config
      );

      dispatch({
        type: USER_CONSUMPTION_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_CONSUMPTION_SEARCH_FAIL,
        payload: message,
      });
    }
  };

export const createUserConsumption =
  (body, date, mealType) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_CONSUMPTION_ADD_FOOD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8080/api/consumption/add?date=${date}&mealType=${mealType}`,
        body,
        config
      );

      dispatch({
        type: USER_CONSUMPTION_ADD_FOOD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CONSUMPTION_ADD_FOOD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserConsumptions = (date) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_CONSUMPTION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8080/api/consumption/getConsumptionsByDate?date=${date}`,
      config
    );

    dispatch({
      type: USER_GET_CONSUMPTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_GET_CONSUMPTION_FAIL,
      payload: message,
    });
  }
};

export const deleteUserConsumption = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_CONSUMPTION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://localhost:8080/api/consumption/${id}`, config);

    dispatch({ type: USER_DELETE_CONSUMPTION_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_CONSUMPTION_FAIL,
      payload: message,
    });
  }
};

export const getUserStatistics =
  (fDate, tDate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_GET_STATISTICS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8080/api/stats/getStats?fromDate=${fDate}&toDate=${tDate}`,
        config
      );

      dispatch({
        type: USER_GET_STATISTICS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_GET_STATISTICS_FAIL,
        payload: message,
      });
    }
  };
