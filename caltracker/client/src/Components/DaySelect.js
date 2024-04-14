import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

//Component that let's you pick one day at a time

const DaySelect = ({ day, changeDay, currentDate }) => {
  const [picker, setPicker] = useState(false);

  const handleDayChange = (day) => {
    setPicker(false);
    changeDay(day);
  };

  const getPrevDay = () => {
    const prevDay = new Date(day);
    prevDay.setDate(prevDay.getDate() - 1);
    handleDayChange(prevDay);
  };

  const getNextDay = () => {
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);
    handleDayChange(nextDay);
  };

  const checkIfDayIsToday = () => {
    return (
      day.toISOString().split("T")[0] ===
      currentDate().toISOString().split("T")[0]
    );
  };

  const formatDateText = () => {
    if (checkIfDayIsToday()) {
      return "Today";
    }
    return `${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`;
  };

  const goToToday = () => {
    const url = new URL(window.location.href);
    url.searchParams.append(
      "date",
      currentDate().toISOString().split("T")[0].toString()
    );
    // window.location.reload(false);
    console.log(url);
  };

  return (
    <div>
      {!checkIfDayIsToday() && <span onClick={goToToday}>Today</span>}
      <span>
        <FaAngleLeft onClick={getPrevDay} />
      </span>
      <span>{formatDateText()}</span>
      <span>
        {!checkIfDayIsToday() && <FaAngleRight onClick={getNextDay} />}
      </span>
    </div>
  );
};

export default DaySelect;
