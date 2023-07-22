import React from "react";
import { NavLink } from "react-router-dom";
import img1 from "../../assets/1.jpg";
import { Navbar } from "../../Components";
const OwnerPlayer = () => {
  return (
    <div className="ownerplayer">
      <Navbar sign={"Register"} />
      <img className="img" src={img1} alt="" />
      <div className="over"></div>
      <div className="l_form">
        <div className="c_btn">
          <NavLink to={"/registerowner"}>Owner</NavLink>
          <NavLink to={"/register"}>Player</NavLink>
        </div>
      </div>
    </div>
  );
};

export default OwnerPlayer;
