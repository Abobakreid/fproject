import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import LeafletRoutingMachinem from "../../Components/Map/LeafletRoutingMachinem.jsx";
import img1 from "../../assets/back.jpg";
import img3 from "../../assets/clock.png";
import img4 from "../../assets/danger.png";
import img6 from "../../assets/folder.png";
import img5 from "../../assets/location.png";
import img7 from "../../assets/mark.png";
import img2 from "../../assets/profile.png";

const EditStadium = () => {
  const { stad_Id } = useParams();
  const position = [30.0561, 31.2394];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const lasname = users.name.split("?");

  //111111
  const [StadName, setStadName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [cafeteria, setCafeteria] = useState(false);
  const [changingRoom, setChangingRoom] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [parking, setParking] = useState(false);
  const [load, setLaod] = useState(false);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [join, setjoin] = useState(false);
  const numlist = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  const GoBackPage = () => {
    navigate("/ownerhome");
  };

  const DeleteStadium = () => {
    setjoin(true);
  };

  const handelCancelNo = async () => {
    setjoin(false);
  };

  const handelCancelYes = async () => {
    setjoin(false);
    try {
      setLaod(true);
      await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/${stad_Id}`,
        {
          method: "DELETE",
        }
      );
      setLaod(false);
      toast.info("Stadium Deleted", {
        position: "bottom-right",
      });
      navigate("stadiums", { replace: true });
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("error", {
        position: "bottom-right",
      });
    }
  };

  const getMyStadiums = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Owner/getStadiums?id=${users.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLaod(false);
      }
      data.forEach((element) => {
        if (element.id == stad_Id) {
          console.log(element);
          setStadName(element.name);
          setStart(element.start);
          setEnd(element.end);
          setLocation("Halls Street next to Al-Azhar");
          setPrice(element.hourPrice);
          setCafeteria(element.cafeteria);
          setChangingRoom(false);
          setParking(element.parkingArea);
          setLat(element.latitude);
          setLng(element.longitude);
        } else {
          console.log("true truetruetruetruetrue");
        }
      });

      console.log(data);
      setStadiums(data[stad_Id]);

      document.querySelector(".leaflet-marker-icon").src = `${img7}`;
      return data;
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getMyStadiums();
  }, []);

  let EditStadiumData = async (stadimData, stdi) => {
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/id?id=${stdi}`,
        {
          method: "PUT",
          body: JSON.stringify(stadimData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      console.log(data, "after");
      toast.info("Stadium Updated", {
        position: "bottom-right",
      });
      return data;
    } catch (error) {
      return console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const stadiumData = {
      name: StadName,
      start: start,
      end: end,
      hourPrice: price,
      longitude: lng,
      latitude: lat,
      capacity: 0,
      vestiary: true,
      cafeteria: cafeteria,
      parkingArea: parking,
      stadiumOwnerId: users.id,
    };
    setLaod(true);
    await EditStadiumData(stadiumData, stad_Id);
    setLaod(false);
    navigate("/ownerhome");
  };

  return (
    <div className="editstadium">
      <Navbar
        login={"register"}
        registered={"registered"}
        OwnerHHome={"OwnerHome"}
        homeowner={"homeowner"}
      />
      {load ? <Loading /> : null}
      {join ? (
        <div className="qus">
          <div className="qus_con">
            <p>Are You Sure ?</p>
            <span
              onClick={() => {
                handelCancelYes();
              }}
            >
              Yes
            </span>
            <span
              onClick={() => {
                handelCancelNo();
              }}
            >
              No
            </span>
          </div>
        </div>
      ) : null}
      <img src={img1} alt="" className="addstadium_img" />
      <div className="l_form">
        <div className="container">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
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
                    onChange={(e) => {
                      setStadName(e.target.value);
                    }}
                    value={StadName}
                    id="name"
                  />
                </div>
                <div className="stad_time content">
                  <div className="input">
                    <span className="input_dat_icon">
                      <img src={img3} alt="" />
                    </span>
                    <select
                      className="s_input"
                      onChange={(e) => {
                        setStart(e.target.value);
                      }}
                      value={start}
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
                  </div>
                  {/* start */}
                  <div className="input">
                    <span className="input_dat_icon">
                      <img src={img3} alt="" />
                    </span>
                    <select
                      className="s_input"
                      type="text"
                      onChange={(e) => {
                        setEnd(e.target.value);
                      }}
                      value={end}
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
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    value={location}
                    id="location"
                  />
                </div>
                <div className="input input_dat input_dat_last">
                  <span className="input_dat_icon">
                    <img src={img6} alt="" />
                  </span>
                  <input
                    className="r_input"
                    type="text"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    value={price}
                    placeholder="Pricing"
                    id="pricing"
                  />
                </div>
                <div className="addstadium_back">
                  <NavLink to={"/ownerhome"}>Back</NavLink>
                  <span
                    className="delete_stad"
                    onClick={() => {
                      DeleteStadium();
                    }}
                  >
                    Delete Stadium
                  </span>
                </div>
              </div>
              <div className="one addstadium_map">
                <div className="mapContainer">
                  {lat ? (
                    <MapContainer
                      center={[lat, lng]}
                      zoom={14}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LeafletRoutingMachinem
                        setLat={setLat}
                        setLng={setLng}
                        lat={lat}
                        lng={lng}
                      />
                      <Marker position={[lat, lng]}></Marker>
                    </MapContainer>
                  ) : null}
                </div>
                <div className="addstadium_radio">
                  <div className="input input_check">
                    <label>Cafeteria</label>
                    <div>
                      <input
                        className="r_input r_check"
                        type="checkbox"
                        onChange={() => {
                          setCafeteria(!cafeteria);
                        }}
                        checked={cafeteria ? cafeteria : cafeteria}
                        value={cafeteria}
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
                        onChange={() => {
                          setChangingRoom(!changingRoom);
                        }}
                        checked={changingRoom ? changingRoom : changingRoom}
                        value={changingRoom}
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
                        onChange={() => {
                          setParking(!parking);
                        }}
                        checked={parking ? parking : changingRoom}
                        value={parking}
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

export default EditStadium;
