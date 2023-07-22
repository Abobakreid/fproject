import React from "react";
import { NavLink } from "react-router-dom";
import { Footer, Navbar } from "../../Components";

const CreateOrSign = () => {
  return (
    <div className="c_or_sign">
      <Navbar login={"Login"} />
      <div className="sign_re">
        <div className="container">
          <div className="c_row content">
            <div className="h_account">
              <h2 className="h_head">Do you have a stadium or want to play?</h2>
              <p>
                A7gezly Is Your Best And Easiest Option To Fully Manage Your
                Project, Try Collato For Free!
              </p>
            </div>
            <div className="h_sign">
              <div className="s_btn">
                <NavLink to={"/registerowner"} className={"a_btn one"}>
                  Sign as Owner
                </NavLink>
                <NavLink to={"/register"} className={"a_btn two"}>
                  Sign as Player
                </NavLink>
              </div>
              <div className="h_log">
                <span>OR</span>
                <NavLink to={"/login"} className={"Log_btn"}>
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateOrSign;
