import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import brandImg from "./../../../assets/logo.png";

const NavComponent = ({ lin }) => {
  const [dropRegister, setdropRegister] = useState(false);
  return (
    <div className="navComponent">
      <div className="container content">
        <div className="n_brand">
          <NavLink to={"/"} end>
            <img src={brandImg} alt="brand" />
          </NavLink>
        </div>
        <div className={"n_user"}>
          <div
            className="userIcon"
            onClick={() => {
              setdropRegister(!dropRegister);
            }}
          >
            <FontAwesomeIcon icon={faUser} size={"2x"} />
          </div>
          <div
            className="sum_nav"
            style={{ display: dropRegister ? "block" : null }}
          >
            <NavLink to={lin}>Profile</NavLink>
            <NavLink to={lin}>Setting</NavLink>
            <NavLink to={lin}>Logout</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavComponent;
