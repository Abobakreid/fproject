import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "../../Components";
import analysis from "../../assets/analytics.png";
import back from "../../assets/back.jpg";
import his from "../../assets/history.png";
const PlayerHome = () => {
  return (
    <div className="playerhome">
      <Navbar
        login={"register"}
        homeplayr={"homeplayr"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      <img src={back} alt="" className="playerhome_img" />
      <div className="create_join">
        <div className="container content">
          <NavLink to={"/analysis"}>
            <img src={analysis} alt="" />
            <span>Analysis</span>
          </NavLink>
          <NavLink to={"/jointeam"}>
            <FontAwesomeIcon icon={faPlus} size={"5x"} />
            <span>Join Team</span>
          </NavLink>
          <NavLink to={"/reservehour"}>
            <FontAwesomeIcon icon={faCalendarCheck} size={"5x"} />
            <span>Reserve hour</span>
          </NavLink>
          <NavLink to={"/history"}>
            <img src={his} alt="" />
            <span>History</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PlayerHome;
