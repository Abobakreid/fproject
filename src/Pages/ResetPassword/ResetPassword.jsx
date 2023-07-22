import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import img1 from "../../assets/back.jpg";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [load, setLaod] = useState(false);
  const [selectwho, setselectwho] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      email: email,
    };
    if (selectwho === "player") {
      try {
        setLaod(true);
        const res = await fetch(
          `https://a7gezlyapi.azurewebsites.net/api/Player/forgetpassword?email=${userdata.email}`,
          {
            method: "POST",
            body: JSON.stringify(userdata),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setLaod(false);
        toast.dismiss();
        toast.info("Check Your Email", {
          position: "bottom-right",
        });
      } catch (error) {
        setLaod(false);
        toast.dismiss();
        toast.info("Check Your Email", {
          position: "bottom-right",
        });
      }
    } else if (selectwho === "owner") {
      try {
        setLaod(true);
        const res = await fetch(
          `https://a7gezlyapi.azurewebsites.net/api/Owner/forgetpassword?email=${userdata.email}`,
          {
            method: "POST",
            body: JSON.stringify(userdata),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        setLaod(false);
        toast.dismiss();
        toast.info("Check Your Email", {
          position: "bottom-right",
        });
      } catch (error) {
        setLaod(false);
        toast.dismiss();
        toast.info("Check Your Email", {
          position: "bottom-right",
        });
      }
    } else {
      toast.dismiss();
      toast.info("You should select Player or Owner", {
        position: "bottom-right",
      });
    }
  };

  const handlselectPlayer = (val) => {
    setselectwho(val);
  };

  return (
    <div className="resetpassword">
      <Navbar login={"register"} home={"home"} stadiums={"stadium"} />
      {load ? <Loading /> : null}
      <img className="change_img" src={img1} alt="" />
      <div className="r_form">
        <div className="container">
          <form onSubmit={onSubmit} className="lo_form">
            <div className="l_title">
              <h2>Reset Password</h2>
            </div>
            <div className="form_in">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                id="confirmPassword"
                value={email}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="radio_btn">
              <div>
                <input
                  onChange={(e) => {
                    handlselectPlayer(e.target.value);
                  }}
                  type="radio"
                  name="rad"
                  value={"player"}
                  id="player"
                />
                <label htmlFor="player">Player</label>
              </div>
              <div>
                <input
                  onChange={(e) => {
                    handlselectPlayer(e.target.value);
                  }}
                  type="radio"
                  name="rad"
                  value={"owner"}
                  id="owner"
                />
                <label htmlFor="owner">Owner</label>
              </div>
            </div>
            <div className="form_btn">
              <button className="r_btn" type="submit">
                Save
              </button>
            </div>
            <NavLink to={"/"} className={"change_back"}>
              Back
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
