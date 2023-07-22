import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Loading, Navbar } from "../../Components";
import img1 from "../../assets/1.jpg";

const JoinTeam = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [stadiums, setStadiums] = useState([]);
  const [stadiumsALl, setStadiumsAll] = useState([]);
  const [distance, setDistance] = useState("5000");
  const [userlat, setUserlat] = useState("");
  const [load, setLaod] = useState(false);
  const [disAllow, setDisAllow] = useState(false);
  const [userlng, setuserlng] = useState("");

  const getMyStadiums = async (val, latt, lngg) => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/FindTeam?id=${users.id}&latitude=${latt}&longitude=${lngg}&distance=${val}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setStadiums(data);
      setStadiumsAll(data);
      console.log(val, latt, lngg, "lkmm");
      if (data) {
        console.log(data, "lkmm");
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
    <div className="join_team">
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
                      to={`/join/${stadium.teamId}`}
                      className={"btn_book"}
                    >
                      Join Now
                    </NavLink>
                    <span className="metr">
                      {stadium.distance.toFixed(0)} K.m
                    </span>
                  </div>
                  <div className="book_detail">
                    <h2>{stadium.name}</h2>
                    <span className="text-center lead">
                      {stadium.stadiumName}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} className="icn" />
                      From{" "}
                      {stadium.date.split("T")[1].split(":")[0].indexOf("0") ==
                      "0"
                        ? stadium.date
                            .split("T")[1]
                            .split(":")[0]
                            .slice(
                              Number(
                                stadium.date
                                  .split("T")[1]
                                  .split(":")[0]
                                  .indexOf("0")
                              ) + 1
                            ) + " AM"
                        : Number(stadium.date.split("T")[1].split(":")[0]) <= 12
                        ? "  " +
                          Number(stadium.date.split("T")[1].split(":")[0]) +
                          " AM "
                        : "  " +
                          (Number(stadium.date.split("T")[1].split(":")[0]) -
                            12) +
                          " PM "}{" "}
                      To
                      {stadium.date.split("T")[1].split(":")[0].indexOf("0") ==
                      "0" ? (
                        <>
                          {Number(
                            stadium.date
                              .split("T")[1]
                              .split(":")[0]
                              .slice(
                                Number(
                                  stadium.date
                                    .split("T")[1]
                                    .split(":")[0]
                                    .indexOf("0")
                                ) + 1
                              )
                          ) + 1}
                        </>
                      ) : (
                        <>
                          {Number(stadium.date.split("T")[1].split(":")[0]) +
                            1 <=
                          12
                            ? "  " +
                              (Number(
                                stadium.date.split("T")[1].split(":")[0]
                              ) +
                                1) +
                              " AM "
                            : "  " +
                              (Number(
                                stadium.date.split("T")[1].split(":")[0]
                              ) +
                                1 -
                                12) +
                              " PM "}
                        </>
                      )}
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

export default JoinTeam;

{
  /* <Navbar login={"register"} homeplayr={"homeplayr"} stadiums={"stadium"} />
{load ? <Loading /> : null}
<div className="container reservations_r">
  <div className="filtration">
    <div className="reservations_i">
      <label className="filter">Select Date</label>
      <input
        className="dat"
        type="date"
        name=""
        id=""
        onChange={(e) => {
          handelchange(getDatefromAlll, e.target.value);
        }}
      />
    </div>
  </div>
  <div className="reservation_row">
    {getDatefromAll.length > 0 ? (
      getDatefromAll.map((item, index) => {
        return (
          <div className="stad" key={index}>
             <div className="detail">
          <NavLink to={"/"}>
            <span>Details</span>
          </NavLink>
        </div> 
            <div className="data">
              <div className="teamOne">
                <img src={playe} alt="" />
                <h2>Team 1</h2>
              </div>
              <div className="reservation">
                <span className="Reserved">Reserved</span>
                <span>hours</span>
                <span>{item.date.split("T")[1]}</span>
              </div>
              <div className="teamTwo">
                <h2>Team 2</h2>
                <img src={playe} alt="" />
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <h2 className="text-center">No Reservations</h2>
    )}
  </div>
</div>  */
}

// {listnums.map((item, index) => {
//   return item < 28 || item == 31 ? null : (
//     <div className="date_for">
//       <span className="d_day">
//         <span>{item}</span>
//         <span>{months[dmonths + 1]}</span>
//       </span>
//       <span className="day_of_week">sun</span>
//     </div>
//   );
// })}

// {day == 31 ? (
//   <div className="date_for">
//     <span className="d_day">
//       <span>{day}</span>
//       <span>{months[dmonths]}</span>
//     </span>
//     <span className="day_of_week">{dayofweek}</span>
//   </div>
// ) : null}

// {listnums.map((item, index) => {
//   return item < 4 ? (
//     <div className="date_for">
//       <span className="d_day">
//         <span>{item}</span>
//         <span>{months[dmonths + 1]}</span>
//       </span>
//       <span className="day_of_week">{dayNames[index]}</span>
//     </div>
//   ) : null;
// })}
