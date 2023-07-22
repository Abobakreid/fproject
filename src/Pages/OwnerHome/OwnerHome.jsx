import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "../../Components";
import analysis from "../../assets/analytics.png";
import back from "../../assets/back.jpg";
import his from "../../assets/stadium.png";
const OwnerHome = () => {
  return (
    <div className="ownerhome">
      <Navbar
        login={"register"}
        registered={"registered"}
        OwnerHHome={"OwnerHome"}
        homeowner={"homeowner"}
      />
      <img src={back} alt="" className="playerhome_img" />
      <div className="create_join">
        <div className="container content">
          <NavLink to={"/addstadium"}>
            <FontAwesomeIcon icon={faPlus} size={"5x"} />
            <span>Add Stadium</span>
          </NavLink>
          <NavLink to={"/stadiums"}>
            <img src={his} alt="" />
            <span>My Stadium</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default OwnerHome;
