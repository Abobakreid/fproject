import { useFormik } from "formik";
import L from "leaflet";
import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import LeafletRoutingMachine from "../../Components/Map/LeafletRoutingMachine";
import { schemaAddStadium } from "../../Components/schemas/Schema";
import { AddStadiumData } from "../../Redux/authSlice/authSLice";
import img1 from "../../assets/back.jpg";
import img3 from "../../assets/clock.png";
import img4 from "../../assets/danger.png";
import img6 from "../../assets/folder.png";
import img5 from "../../assets/location.png";
import img2 from "../../assets/profile.png";

const AddStadium = () => {
  const position = [30.0561, 31.2394];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [load, setLaod] = useState(false);
  const users = JSON.parse(localStorage.getItem("userItem"));
  const lasname = users.name.split("?");
  const numlist = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  const GoBackPage = () => {
    navigate("/ownerhome");
  };
  const onSubmit = async (values) => {
    const stadiumData = {
      name: values.name,
      start: `${values.start}`,
      end: `${values.end}`,
      hourPrice: Number(values.pricing),
      longitude: lng,
      latitude: lat,
      capacity: 0,
      vestiary: true,
      cafeteria: values.cafeteria,
      parkingArea: values.changingRoom,
      stadiumOwnerId: users.id,
    };
    if (stadiumData.start && Number(stadiumData.start) < stadiumData.end) {
      if (lng) {
        setLaod(true);
        await dispatch(AddStadiumData(stadiumData));
        setLaod(false);
        navigate("/ownerhome");
        toast.dismiss();
        toast.info("Stadium Added", {
          position: "bottom-right",
        });
      } else {
        toast.info("You Must select a place from map", {
          position: "bottom-right",
        });
      }
    } else {
      toast.info("End Should be Greater than Start", {
        position: "bottom-right",
      });
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        end: "",
        start: "",
        pricing: "",
        cafeteria: false,
        changingRoom: false,
        parking: false,
        location: "",
      },
      validationSchema: schemaAddStadium,
      onSubmit,
    });
  return (
    <div className="addstadium">
      <Navbar
        login={"register"}
        registered={"registered"}
        OwnerHHome={"OwnerHome"}
        homeowner={"homeowner"}
      />
      {load ? <Loading /> : null}

      <img src={img1} alt="" className="addstadium_img" />
      <div className="l_form">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row content">
              <div className="one addstadium_data">
                <div className="text-center">
                  <img src={img2} alt="" className="addstadium_h_img" />
                  <h3>{lasname[0]}</h3>
                </div>
                <div className="input input_dat">
                  <span className="input_dat_icon">
                    <img src={img3} alt="" />
                  </span>
                  <input
                    className="r_input"
                    type="text"
                    placeholder="Name of stadium"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    id="name"
                  />
                  {errors.name && touched.name && (
                    <span className="error">{errors.name}</span>
                  )}
                </div>
                <div className="stad_time content">
                  <div className="input">
                    <span className="input_dat_icon">
                      <img src={img3} alt="" />
                    </span>
                    <select
                      className="s_input"
                      onChange={handleChange}
                      value={values.start}
                      onBlur={handleBlur}
                      id="start"
                    >
                      <option>From</option>
                      {numlist.map((num, i) => {
                        return (
                          <option value={num} key={num}>
                            {num}
                          </option>
                        );
                      })}
                    </select>
                    {errors.start && touched.start && (
                      <span className="error">{errors.start}</span>
                    )}
                  </div>
                  {/* start */}
                  <div className="input">
                    <span className="input_dat_icon">
                      <img src={img3} alt="" />
                    </span>
                    <select
                      className="s_input"
                      type="text"
                      onChange={handleChange}
                      value={values.end}
                      onBlur={handleBlur}
                      id="end"
                    >
                      <option>To</option>
                      {numlist.map((num, i) => {
                        return (
                          <option value={num} key={num}>
                            {num}
                          </option>
                        );
                      })}
                    </select>
                    {errors.end && touched.end && (
                      <span className="error">{errors.end}</span>
                    )}
                  </div>
                  <div className="time_sys">
                    <span>24h</span>
                  </div>
                </div>
                <div className="input input_dat input_dat_last">
                  <span className="input_dat_icon">
                    <img src={img5} alt="" />
                  </span>
                  <input
                    className="r_input"
                    type="text"
                    placeholder="Location"
                    onChange={handleChange}
                    value={values.location}
                    onBlur={handleBlur}
                    id="location"
                  />
                  {errors.location && touched.location && (
                    <span className="error">{errors.location}</span>
                  )}
                </div>
                <div className="input input_dat input_dat_last">
                  <span className="input_dat_icon">
                    <img src={img6} alt="" />
                  </span>
                  <input
                    className="r_input"
                    type="text"
                    onChange={handleChange}
                    value={values.pricing}
                    placeholder="Pricing"
                    onBlur={handleBlur}
                    id="pricing"
                  />
                  {errors.pricing && touched.pricing && (
                    <span className="error">{errors.pricing}</span>
                  )}
                </div>
                <div className="addstadium_back">
                  <NavLink to={"/ownerhome"}>Back</NavLink>
                </div>
              </div>
              <div className="one addstadium_map">
                <div className="mapContainer">
                  <MapContainer
                    center={position}
                    zoom={10}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LeafletRoutingMachine setLat={setLat} setLng={setLng} />
                  </MapContainer>
                </div>
                <div className="addstadium_radio">
                  <div className="input input_check">
                    <label>Cafeteria</label>
                    <div>
                      <input
                        className="r_input r_check"
                        type="checkbox"
                        onChange={handleChange}
                        value={values.cafeteria}
                        onBlur={handleBlur}
                        id="cafeteria"
                      />
                    </div>
                  </div>
                  <div className="input input_check input_check_two">
                    <label>Changing Room</label>
                    <div>
                      <input
                        className="r_input r_check"
                        type="checkbox"
                        onChange={handleChange}
                        value={values.changingRoom}
                        onBlur={handleBlur}
                        id="changingRoom"
                      />
                    </div>
                  </div>
                  <div className="input input_check">
                    <label>Parking</label>
                    <div>
                      <input
                        className="r_input r_check"
                        type="checkbox"
                        onChange={handleChange}
                        value={values.parking}
                        onBlur={handleBlur}
                        id="parking"
                      />
                    </div>
                  </div>
                </div>
                <div className="addstad_danger">
                  <img src={img4} alt="" />
                  <p>
                    The area of the shed and the garage must be more than 50
                    meters
                  </p>
                </div>
                <div className="form_btn">
                  <button
                    className="cancel"
                    onClick={() => {
                      GoBackPage();
                    }}
                  >
                    Cancel
                  </button>
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

let DefaultIcon = L.icon({
  iconUrl: "map-marker-icon.png",
  iconSize: [33, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default AddStadium;
