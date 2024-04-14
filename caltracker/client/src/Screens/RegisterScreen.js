import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { register } from "../Actions/userActions";

//Idea from https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/screens/RegisterScreen.js

const RegisterScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [weightInPounds, setWeightInPounds] = useState();
  const [heightInInches, setHeightInInches] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("Male");
  const [exerciseCategory, setExerciseCategory] = useState("SEDENTARY");
  const [message, setMessage] = useState(null);
  //   const [registered, setRegistered] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          userName,
          email,
          password,
          weightInPounds,
          heightInInches,
          age,
          gender,
          exerciseCategory
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='username'>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter User Name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='weight'>
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter weight in pounds'
            value={weightInPounds}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (parseFloat(inputValue) > 0) {
                setWeightInPounds(parseFloat(e.target.value));
              }
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='height'>
          <Form.Label>Height</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter height in inches'
            value={heightInInches}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (parseInt(inputValue) > 0) {
                setHeightInInches(parseFloat(e.target.value));
              }
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='age'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter your age'
            value={age}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (parseInt(inputValue) > 0) {
                setAge(parseInt(inputValue));
              }
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='gender'>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as='select'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='Exercise category'>
          <Form.Label>Select your exercise category</Form.Label>
          <Form.Control
            as='select'
            value={exerciseCategory}
            onChange={(e) => {
              setExerciseCategory(e.target.value);
            }}
          >
            <option value='SEDENTARY'>Sedentary</option>
            <option value='ONE_TO_THREE_TIMES_A_WEEK'>
              One to three times a week
            </option>
            <option value='FOUR_TO_FIVE_TIMES_A_WEEK'>
              Four to five times a week
            </option>
            <option value='DAILY_EXERCISE_OR_INTENSE_EXERCISE_THREE_FOUR_TIMES_A_WEEK'>
              Daily Exercise or intense exerise 3-4 times a week
            </option>
            <option value='INTENSE_EXERCISE_SIX_TIMES_A_WEEK'>
              Intense exercise six times a week
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
