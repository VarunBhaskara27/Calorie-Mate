import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserGoals, getUserStatistics } from "../Actions/userActions";
import { addDays, format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { Button, Row, Col } from "react-bootstrap";
import "react-day-picker/dist/style.css";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import StatsTable from "../Components/StatsTable";
import WeeklyAverage from "../Components/WeeklyAverage";
import ExerciseGraph from "../Components/ExerciseGraph";

const StatisticsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTodaysDateUTC = () => {
    const now = new Date();
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  };

  const [toDate, setToDate] = useState(getTodaysDateUTC());
  const [fromDate, setFromDate] = useState(() => {
    const from = getTodaysDateUTC();
    from.setDate(from.getDate() - 7);
    return from;
  });

  const defaultSelected = {
    from: fromDate,
    to: toDate,
  };

  const [range, setRange] = useState(defaultSelected);

  const handleSelect = (range) => {
    setRange(range);
    setFromDate(range.from);
    setToDate(range.to);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userGoals = useSelector((state) => state.userGoals);
  const { goals } = userGoals;

  const userStatistics = useSelector((state) => state.userStatistics);
  const { statistics, loading, error } = userStatistics;

  const handleClick = () => {
    console.log(fromDate, toDate);
    dispatch(
      getUserStatistics(
        fromDate.toISOString().split("T")[0].toString(),
        toDate.toISOString().split("T")[0].toString()
      )
    );
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getUserGoals());
    }
  }, [dispatch, navigate, userInfo]);

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }

  return (
    <Row>
      <Col md={3}>
        <DayPicker
          id='test'
          mode='range'
          selected={range}
          footer={footer}
          disabledDays={(day) => day > new Date()}
          onSelect={handleSelect}
        />
        <div className='text-center'>
          <Button onClick={handleClick}>Get Stats!</Button>
        </div>
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Col md={9}>
          {Object.values(statistics).some((x) => x.length > 0) && (
            <div>
              <StatsTable
                totals={statistics.DayTotals}
                overall={statistics.OverallTotals}
              />
              <Row>
                <Col md={5}>
                  <WeeklyAverage
                    average={statistics.OverallAverages}
                    goals={goals}
                  />
                </Col>
                <Col md={5}>
                  <ExerciseGraph
                    toDate={toDate}
                    fromDate={fromDate}
                    totals={statistics.DayTotals}
                    exercises={statistics.exerciseDayTotals}
                  />
                </Col>
              </Row>
            </div>
          )}
        </Col>
      )}
    </Row>
  );
};

export default StatisticsScreen;
