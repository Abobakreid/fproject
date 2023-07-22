import { useFormik } from "formik";
import React, { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import { BaseSchema } from "../../Components/schemas/Schema";
import { addusersss } from "../../Redux/authSlice/authSLice";
import back from "../../assets/back.jpg";
const Register = () => {
  const [load, setLaod] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const userdata = {
      name: values.name + "?" + values.lastname,
      country: values.country,
      city: values.city,
      street: values.street,
      birthdate: values.birthdate,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      playerPosition: Number(values.position),
    };
    
    try {
      setLaod(true);
      const res = await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/player",
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
        toast.info("done", {
          position: "bottom-right",
        });
        localStorage.setItem("userItem", JSON.stringify(data));
      }
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("email exist", {
        position: "bottom-right",
      });
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        lastname: "",
        country: "",
        city: "",
        street: "",
        birthdate: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        position: "",
      },
      validationSchema: BaseSchema,
      onSubmit,
    });

  return (
    <div className="register">
      <Navbar login={"login"} home={"home"} stadiums={"stadium"} />
      {load ? <Loading /> : null}
      <img src={back} alt="" className="register_img" />
      <div className="r_form">
        <div className="container">
          <form onSubmit={handleSubmit} className="re_form content">
            <div className="f_one">
              <div className="r_tags content">
                <span>Register As: </span>
                <span className="register_as active">
                  <NavLink to={"/register"}>Player</NavLink>
                </span>
                <span className="register_as">
                  <NavLink to={"/registerowner"}>Owner</NavLink>
                </span>
              </div>
              <label>First Name: </label>
              <input
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                id="name"
                className={
                  errors.name && touched.name ? "input-error" : "r_input"
                }
                type="text"
                placeholder="First Name"
              />
              {errors.name && touched.name && (
                <span className="error">{errors.name}</span>
              )}
              <label>Last Name: </label>
              <input
                onChange={handleChange}
                value={values.lastname}
                onBlur={handleBlur}
                id="lastname"
                className={
                  errors.lastname && touched.lastname
                    ? "input-error"
                    : "r_input"
                }
                type="text"
                placeholder="Last Name"
              />
              {errors.lastname && touched.lastname && (
                <span className="error">{errors.lastname}</span>
              )}
              <label>Phone Number: </label>
              <input
                onChange={handleChange}
                value={values.phoneNumber}
                onBlur={handleBlur}
                id="phoneNumber"
                className={
                  errors.phoneNumber && touched.phoneNumber
                    ? "input-error"
                    : "r_input"
                }
                type="text"
                placeholder="+20 | Phone Number"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <span className="error">{errors.phoneNumber}</span>
              )}
              <label>Date of Birth: </label>
              <input
                onChange={handleChange}
                value={values.birthdate}
                onBlur={handleBlur}
                id="birthdate"
                className={
                  errors.birthdate && touched.birthdate
                    ? "input-error"
                    : "r_input"
                }
                type="date"
                placeholder="dd/mm/yyyy"
              />
              {errors.birthdate && touched.birthdate && (
                <span className="error">{errors.birthdate}</span>
              )}
              <label>Country: </label>
              <input
                onChange={handleChange}
                value={values.country}
                onBlur={handleBlur}
                id="country"
                className={
                  errors.country && touched.country ? "input-error" : "r_input"
                }
                type="text"
                placeholder="Country"
              />
              {errors.country && touched.country && (
                <span className="error">{errors.country}</span>
              )}
              <div className="r_back">
                <NavLink to={"/login"}>Back</NavLink>
              </div>
            </div>
            <div className="f_one f_two">
              <label>E-mail: </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                value={values.email}
                className={
                  errors.email && touched.email ? "input-error" : "r_input"
                }
                type="email"
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
              <label>City: </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="city"
                value={values.city}
                className={
                  errors.city && touched.city ? "input-error" : "r_input"
                }
                type="text"
                placeholder="City"
              />
              {errors.city && touched.city && (
                <span className="error">{errors.city}</span>
              )}
              <label>Street: </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="street"
                value={values.street}
                className={
                  errors.street && touched.street ? "input-error" : "r_input"
                }
                type="text"
                placeholder="Street"
              />
              {errors.street && touched.street && (
                <span className="error">{errors.street}</span>
              )}
              <label>Position: </label>
              <select
                onChange={handleChange}
                value={values.position}
                id="position"
                className={
                  errors.position && touched.position
                    ? "input-error"
                    : "r_input"
                }
                type="text"
                placeholder="Position"
                onBlur={handleBlur}
              >
                <option>Position</option>
                <option value={3}>GoalKeeper</option>
                <option value={0}>Defender</option>
                <option value={2}>Center</option>
                <option value={-1}>Striker</option>
              </select>
              {errors.position && touched.position && (
                <span className="error">{errors.position}</span>
              )}
              <label>Password: </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                value={values.password}
                className={
                  errors.password && touched.password
                    ? "input-error"
                    : "r_input"
                }
                type="password"
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}
              <label>Confirm Password: </label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword"
                value={values.confirmPassword}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "input-error"
                    : "r_input"
                }
                type="Password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
              <div className="s_or_log content">
                <div className="r_log">
                  <span>You have an account, </span>
                  <NavLink to={"/login"}>log in Now</NavLink>
                </div>
                <button className="r_btn" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
