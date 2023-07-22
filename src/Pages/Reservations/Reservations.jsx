import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "../../Components";
import playe from "../../assets/player.png";
const Reservations = () => {
  const [day, setDay] = useState("");
  const [dayofweek, setdayofweek] = useState("");
  const [dmonths, setdmonths] = useState("");
  let listnums = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  document.querySelectorAll(".d_day").forEach((ele) => {
    ele.addEventListener("click", () => {
      document.querySelectorAll(".d_day").forEach((eleo) => {
        eleo.classList.remove("active");
      });
      ele.classList.add("active");
    });
  });
  useEffect(() => {
    let dataDate = new Date();
    let splitDate = dataDate.toString().split(" ");
    setdayofweek(splitDate[0]);
    setDay(splitDate[2]);
    setdmonths(dataDate.getMonth());
  }, []);
  return (
    <div className="reservations">
      <Navbar login={"register"} home={"home"} />
      <div className="container reservations_r">
        <div className="filtration">
          <div className="filter">Select Date</div>

          <div className="reservations_i content">
            <div className="date_for">
              <span className="d_day">
                <span>28</span>
                <span>{months[dmonths]}</span>
              </span>
              <span className="day_of_week">Sat</span>
            </div>
            <div className="date_for">
              <span className="d_day">
                <span>29</span>
                <span>{months[dmonths]}</span>
              </span>
              <span className="day_of_week">Sun</span>
            </div>
            <div className="date_for">
              <span className="d_day">
                <span>30</span>
                <span>{months[dmonths]}</span>
              </span>
              <span className="day_of_week">Mon</span>
            </div>
            <div className="date_for">
              <span className="d_day active">
                <span>31</span>
                <span>{months[dmonths]}</span>
              </span>
              <span className="day_of_week">Tue</span>
            </div>
            <div className="date_for">
              <span className="d_day">
                <span>1</span>
                <span>{months[dmonths + 1]}</span>
              </span>
              <span className="day_of_week">Wed</span>
            </div>
            <div className="date_for">
              <span className="d_day">
                <span>2</span>
                <span>{months[dmonths + 1]}</span>
              </span>
              <span className="day_of_week">Thu</span>
            </div>
            <div className="date_for">
              <span className="d_day">
                <span>3</span>
                <span>{months[dmonths + 1]}</span>
              </span>
              <span className="day_of_week">Fri</span>
            </div>
          </div>
        </div>
        <div className="reservation_row">
          <div className="stad">
            <div className="detail">
              <NavLink to={"/"}>
                <span>Details</span>
              </NavLink>
            </div>
            <div className="data">
              <div className="teamOne">
                <img src={playe} alt="" />
                <h2>Team 11</h2>
              </div>
              <div className="reservation">
                <span className="Reserved" f>
                  Reserved
                </span>
                <span>hours</span>
                <span>Time</span>
              </div>
              <div className="teamTwo">
                <h2>Team 12</h2>
                <img src={playe} alt="" />
              </div>
            </div>
          </div>
          <div className="stad">
            <div className="detail">
              <NavLink to={"/"}>
                <span>Details</span>
              </NavLink>
            </div>
            <div className="data">
              <div className="teamOne">
                <img src={playe} alt="" />
                <span className="dash"></span>
              </div>
              <div className="reservation">
                <span className="Reserved">Not Reserved</span>
                <span>Time</span>
              </div>
              <div className="teamTwo">
                <span className="dash"></span>
                <img src={playe} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
