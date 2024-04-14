import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import "./App.css";
import HomeScreen from "./Screens/HomeScreen";
import Header from "./Components/Header";
import StatisticsScreen from "./Screens/StatisticsScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/' element={<ProfileScreen />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/stats' element={<StatisticsScreen />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
