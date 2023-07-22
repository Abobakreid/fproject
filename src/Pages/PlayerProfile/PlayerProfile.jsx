import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "../../Components";
import { updateUserPlayer } from "../../Redux/authSlice/authSLice";
import back from "../../assets/back.jpg";
const PlayerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [DateofBirth, setDateofBirth] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
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
    setPassword(users.password);
    setDateofBirth(users.birthdate);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      id: users.id,
      name: name + "?" + lname,
      country: country,
      city: city,
      street: street,
      phoneNumber: phone,
      email: email,
      position: position,
      password: password,
      birthdate: DateofBirth,
    };
    await dispatch(updateUserPlayer(userdata));
    window.location.reload();
  };

  const canceledit = () => {
    navigate("/profile");
  };

  return (
    <div className="playerprofile">
      <Navbar login={"register"} homeplayr={"homeplayr"} stadiums={"stadium"}/>
      <img src={back} alt="" className="playerprofile_img" />
      <div className="l_form">
        <div className="container">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className="all_input">
              <div className="form_in">
                <div className="all_input_e">
                  <h2>Edit:</h2>
                </div>
                <div className="input">
                  <label>First Name</label>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    id="name"
                    type="text"
                  />
                </div>
                <div className="input">
                  <label>Last Name</label>
                  <input
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                    value={lname}
                    id="lastname"
                    type="text"
                  />
                </div>
                <div className="input">
                  <label>Phone</label>
                  <input
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    id="phoneNumber"
                    value={phone}
                    className={"r_input"}
                    type="text"
                  />
                </div>
                <div className="input">
                  <label>Date of Birth :</label>
                  <input
                    onChange={(e) => {
                      setDateofBirth(e.target.value);
                      console.log(e.target.value);
                    }}
                    id="DateofBirth"
                    value={DateofBirth}
                    className={"r_input"}
                    type="date"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
                <div className="input">
                  <label>Country</label>
                  <input
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    id="country"
                    value={country}
                    className={"r_input"}
                    type="text"
                  />
                </div>
                <div className="form_link">
                  <NavLink to={"/profile"}>Back</NavLink>
                </div>
              </div>
              <div className="form_in">
                <div className="input">
                  <label>Email</label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    id="email"
                    type="email"
                  />
                </div>
                <div className="input">
                  <label>City</label>
                  <input
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    id="city"
                    value={city}
                    className={"r_input"}
                    type="text"
                  />
                </div>
                <div className="input">
                  <label>Street</label>
                  <input
                    onChange={(e) => {
                      setStreet(e.target.value);
                    }}
                    id="street"
                    value={street}
                    className={"r_input"}
                    type="text"
                  />
                </div>

                <div className="input">
                  <label>Position</label>
                  <select
                    onChange={(e) => {
                      setPosition(e.target.value);
                    }}
                    value={position}
                    id="position"
                    className={"r_input"}
                    type="text"
                    placeholder="Position"
                  >
                    <option>Position</option>
                    <option value={"GoalKeeper"}>GoalKeeper</option>
                    <option value={"Defender"}>Defender</option>
                    <option value={"Center"}>Center</option>
                    <option value={"Striker"}>Striker</option>
                  </select>
                </div>
                <div className="form_btn">
                  <span
                    className="cancel"
                    onClick={() => {
                      canceledit();
                    }}
                  >
                    Cancel
                  </span>
                  <button type="submit" className="sub">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
