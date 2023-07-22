import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import { addusersss } from "../../Redux/authSlice/authSLice";
import img1 from "../../assets/back.jpg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectwho, setselectwho] = useState("");
  const [load, setLaod] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelEmail = (val) => {
    setEmail(val);
  };

  // handel Password
  const handelPassword = (val) => {
    setPassword(val);
  };
  const handellogin = async (e) => {
    const userdata = {
      email: email,
      password: password,
    };
    e.preventDefault();

    if (selectwho === "player") {
      try {
        setLaod(true);
        const res = await fetch(
          "https://a7gezlyapi.azurewebsites.net/api/player/login",
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
        if (data) {
          setLaod(false);
          dispatch(addusersss(data));
          navigate("/playerhome", { replace: true });
          toast.dismiss();
          toast.info("Welcome Back", {
            position: "bottom-right",
          });
          localStorage.setItem("userItem", JSON.stringify(data));
        }
      } catch (error) {
        setLaod(false);
        toast.dismiss();
        toast.info("Password or Email incorrect player", {
          position: "bottom-right",
        });
      }
    } else if (selectwho === "owner") {
      try {
        setLaod(true);
        const res = await fetch(
          "https://a7gezlyapi.azurewebsites.net/api/owner/login",
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
        if (data) {
          setLaod(false);
          dispatch(addusersss(data));
          navigate("/ownerhome", { replace: true });
          toast.dismiss();
          toast.info("Done", {
            position: "bottom-right",
          });
          localStorage.setItem("userItem", JSON.stringify(data));
        }
      } catch (error) {
        setLaod(false);
        toast.dismiss();
        toast.info("Password or Email incorrect owner", {
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
    <div className="login">
      <Navbar login={"Register"} home={"home"} stadiums={"stadium"} />
      {load ? <Loading /> : null}
      <img className="login_img" src={img1} alt="" />
      <div className="l_form">
        <div className="container">
          <form
            onSubmit={(e) => {
              handellogin(e);
            }}
            className="lo_form"
          >
            <div className="l_title">
              <h2>Log in</h2>
            </div>
            <label>E-mail</label>
            <input
              className="l_input"
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => {
                handelEmail(e.target.value);
              }}
              required
            />
            <label>Password</label>
            <input
              className="l_input"
              placeholder="Password"
              type="Password"
              value={password}
              onChange={(e) => {
                handelPassword(e.target.value);
              }}
              required
            />
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
            <div className="c_btn">
              <button className="l_btn" type="submit">
                Login
              </button>
            </div>
            <div className="log_back">
              <NavLink to={"/"}>Back</NavLink>
              <div>
                To recover your password,
                <NavLink to={"/resetpassword"}>Click here</NavLink>
              </div>
              <div>
                Don't have an account?
                <NavLink to={"/register"}>Register now</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
