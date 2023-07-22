import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Loading, Navbar } from "../../Components";
import { adduserlng } from "../../Redux/authSlice/authSLice";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/dis.png";
import img0 from "../../assets/rating.png";
const ReserveHour = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const imge_list = [img0, img2, img1];
  const [stadiums, setStadiums] = useState([]);
  const [stadiumsALl, setStadiumsAll] = useState([]);
  const [distance, setDistance] = useState("5000");
  const [userlat, setUserlat] = useState("");
  const [load, setLaod] = useState(false);
  const [disAllow, setDisAllow] = useState(false);
  const [userlng, setuserlng] = useState("");
  const dispatch = useDispatch();

  const getMyStadiums = async (val, latt, lngg) => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/FindStadium?latitude=${latt}&longitude=${lngg}&distance=${val}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setStadiums(data);
      setStadiumsAll(data);
      if (data) {
        console.log(data);
        setLaod(false);
      }
      console.log(data);
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  const getstadDistance = async (val) => {
    setDistance(val);
    if (val != "Distance") {
      getMyStadiums(val, userlat, userlng);
    } else {
      console.log(val);
    }
  };

  const getFilterStad = async (val) => {
    if (val) {
      console.log(val);
      let filterStad = stadiumsALl.filter((itm, index) => {
        return itm.name.includes(val);
      });
      console.log(filterStad);
      setStadiums(filterStad);
    } else {
      setStadiums(stadiumsALl);
    }
  };

  const successfulLookup = async (position) => {
    const { latitude, longitude } = position.coords;
    await setUserlat(latitude);
    await setuserlng(longitude);
    dispatch(adduserlng([latitude, longitude]));
    getMyStadiums("5000", latitude, longitude);
  };

  const getMyLocation = async () => {
    await window.navigator.geolocation.getCurrentPosition(
      successfulLookup,
      () => {
        console.log("data");
        setLaod(false);
        setDisAllow(true);
      }
    );
  };

  useEffect(() => {
    setLaod(true);
    getMyLocation();
    // Math.floor(Math.random() * imge_list.length)
  }, []);

  return (
    <div className="reserve_hour">
      <Navbar
        login={"/ownerprofile"}
        homeplayr={"homeplayr"}
        registered={"registered"}
        stadiums={"stadium"}
      />
      {load ? <Loading /> : null}
      <div className="playerhome_img content">
        <h2>You Can Reserve between </h2>
        <h2 className="h2">200 Matches</h2>
      </div>
      <div className="container stadium_row">
        <div className="join_filter">
          <div className="join_f_dropdown">
            <select
              onChange={(e) => {
                getstadDistance(e.target.value);
              }}
              value={distance}
            >
              <option>Distance</option>
              <option value="5000">5 kilometer</option>
              <option value="10000">10 kilometer</option>
              <option value="15000">15 kilometer</option>
              <option value="20000">20 kilometer</option>
              <option value="-1">All Distances</option>
            </select>
          </div>
          <div className="join_f_in">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                getFilterStad(e.target.value);
              }}
            />
            <div className="join_search">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
        <div className="row">
          {stadiums ? (
            stadiums.map((stadium, index) => {
              return (
                <div className="reserveb_stad content" key={index}>
                  <div className="r_book">
                    <h3>Starting From</h3>
                    <span className="pound">{stadium.hourPrice} EGY</span>
                    <NavLink
                      to={`/reservationdetails/${stadium.id}`}
                      className={"btn_book"}
                    >
                      Book Now
                    </NavLink>
                    <span className="metr">
                      {stadium.distance.toFixed(0)} K.m
                    </span>
                  </div>
                  <div className="book_detail">
                    <h2>{stadium.name}</h2>
                    <span>
                      <FontAwesomeIcon icon={faLocationDot} className="icn" />{" "}
                      location
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} className="icn" /> From{" "}
                      From
                      {"  " + Number(stadium.start) <= 12
                        ? "  " + Number(stadium.start) + " AM "
                        : "  " + (Number(stadium.start) - 12) + " PM "}
                      To 
                      {"  " + Number(stadium.end) <= 12
                        ? "  " + Number(stadium.end) + " AM "
                        : "  " + (Number(stadium.end) - 12) + " PM "}
                    </span>
                  </div>
                  <div className="book_img">
                    <img src={img1} alt="" />
                  </div>
                </div>
              );
            })
          ) : (
            <div>NO stadium</div>
          )}
          {disAllow ? (
            <div className="text-center">
              <h2>You Should Make Refresh and ALlow Location</h2>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ReserveHour;

{
  /* <NavLink
to={`/reservationdetails/${stadium.id}`}
className="stadium"
key={index}
>
<img src={img1} alt="" />
<div className="st_pl_icon">
  <img src={img2} alt="" />
  <span className="st_pl_num">
    {(stadium.distance / 1000).toFixed(1)}
  </span>
  <span>K.m</span>
</div>
<div className="detail">
  <div className="rate">
    <h3>{stadium.name}</h3>
    <div className="stars">
      <img className="stars_img" src={img0} alt="" />
    </div>
  </div>
  <div className="position">
    <div className="location">
      <span className="icon">
        <FontAwesomeIcon icon={faLocationDot} />
      </span>
      {stadium.location}
    </div>
    <div className="time">
      <span className="icon">
        <FontAwesomeIcon icon={faClock} />
      </span>
      From
      {"  " + Number(stadium.start) <= 12
        ? "  " + Number(stadium.start) + " AM "
        : "  " + Number(stadium.start) + " PM "}
      To Stadium
      {"  " + Number(stadium.end) <= 12
        ? "  " + Number(stadium.end) + " AM "
        : "  " + Number(stadium.end) + " PM "}
    </div>
  </div>
</div>
</NavLink> */
}
