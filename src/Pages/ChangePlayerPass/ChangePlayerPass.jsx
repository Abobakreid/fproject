import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import { changePasswordPlayer } from "../../Components/schemas/Schema";
import { updateUserPlayer } from "../../Redux/authSlice/authSLice";
import img1 from "../../assets/back.jpg";
const ChangePlayerPass = () => {
  const dispatch = useDispatch();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [load, setLaod] = useState(false);
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const lasname = users.name.split("?");

  useEffect(() => {
    setName(lasname[0]);
    setLName(lasname[1]);
    setEmail(users.email);
    setCountry(users.country);
    setCity(users.city);
    setStreet(users.street);
    setPhone(users.phoneNumber);
    setPosition(users.position);
  }, []);

  const onSubmit = async (values) => {
    const userdata = {
      id: users.id,
      name: name + "?" + lname,
      country: country,
      city: city,
      street: street,
      phoneNumber: phone,
      email: email,
      playerPosition: Number(position),
      password: values.newPassword,
    };
    if (values.oldPassword === values.newPassword) {
      toast.info("You Should write new Password", {
        position: "bottom-right",
      });
      values.oldPassword = "";
      values.newPassword = "";
      values.confirmPassword = "";
    } else {
      setLaod(true);
      await dispatch(updateUserPlayer(userdata));
      setLaod(false);
      navigate("/", { replace: true });
      await localStorage.removeItem("userItem");
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordPlayer,
      onSubmit,
    });
  return (
    <div className="changeplayerpass">
      <Navbar login={"register"} homeplayr={"homeplayr"} stadiums={"stadium"} />
      {load ? <Loading /> : null}
      <img className="change_img" src={img1} alt="" />
      <div className="r_form">
        <div className="container">
          <form onSubmit={handleSubmit} className="lo_form">
            <div className="l_title">
              <h2>Change Password</h2>
            </div>
            <div className="form_in">
              <label>Old Password</label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="oldPassword"
                value={values.password}
                type="password"
                placeholder="Old Password"
              />
              {errors.oldPassword && touched.oldPassword && (
                <span className="error">{errors.oldPassword}</span>
              )}
            </div>
            <div className="form_in">
              <label>New Password</label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="newPassword"
                value={values.newPassword}
                type="password"
                placeholder="New Password"
              />
              {errors.newPassword && touched.newPassword && (
                <span className="error">{errors.newPassword}</span>
              )}
            </div>
            <div className="form_in">
              <label>Confirm Password</label>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword"
                value={values.confirmPassword}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
            <div className="form_btn">
              <button className="r_btn" type="submit">
                Save
              </button>
            </div>
            <NavLink to={"/profile"} className={"change_back"}>
              Back
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePlayerPass;
