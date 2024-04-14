import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { USER_UPDATE_GOALS_RESET } from "../Constants/userConstants";
import { getUserGoals, updateUserGoals } from "../Actions/userActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userGoals = useSelector((state) => state.userGoals);
  const { loading, error, goals } = userGoals;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateGoals = useSelector((state) => state.updateUserGoals);
  const { success } = userUpdateGoals;

  const [Calories, setCalories] = useState();
  const [Protein, setProtein] = useState();
  const [Carbs, setCarbs] = useState();
  const [Fat, setFat] = useState();
  const [Sodium, setSodium] = useState();
  const [Fiber, setFiber] = useState();
  const [Sugars, setSugars] = useState();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!goals || !goals.Calories || success) {
        dispatch({ type: USER_UPDATE_GOALS_RESET });
        dispatch(getUserGoals());
      } else {
        setCalories(goals.Calories);
        setProtein(goals.Protein);
        setCarbs(goals.Carbs);
        setFat(goals.Fat);
        setFiber(goals.Fiber);
        setSodium(goals.Sodium);
        setSugars(goals.Sugars);
      }
    }
  }, [dispatch, navigate, userInfo, goals, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserGoals({ Calories, Protein, Carbs, Fat, Fiber, Sodium, Sugars })
    );
    navigate("/home");
  };

  return (
    <FormContainer>
      <div className='MyGoals'>
        <h2>User Goals</h2>
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className='MyGoals__form'>
            <Form.Group controlId='Calories'>
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Calories you wish to consume per day'
                value={Calories}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setCalories(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Proteins'>
              <Form.Label>Proteins</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Proteins you wish to consume per day'
                value={Protein}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setProtein(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Carbs'>
              <Form.Label>Carbs</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Carbs you wish to consume per day'
                value={Carbs}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setCarbs(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Fat'>
              <Form.Label>Fat</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Fat you wish to consume per day'
                value={Fat}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setFat(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Fiber'>
              <Form.Label>Fiber</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Fiber you wish to consume per day'
                value={Fiber}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setFiber(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Sodium'>
              <Form.Label>Sodium</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Sodium you wish to consume per day'
                value={Sodium}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setSodium(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='Sugars'>
              <Form.Label>Sugars</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Sugars you wish to consume per day'
                value={Sugars}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (parseInt(inputValue) > 0) {
                    setSugars(parseInt(inputValue));
                  }
                }}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </div>
    </FormContainer>
  );
};

export default ProfileScreen;
