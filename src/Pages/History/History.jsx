import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Loading, Navbar } from "../../Components";
import img0 from "../../assets/grass.jpg";

const History = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [AllOrLast, setAllOrLast] = useState(true);
  const [allReservations, setALlReservations] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [load, setLaod] = useState(false);
  let datenooww = new Date();
  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/MatchDetails?id=${users.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setALlReservations(data);
      if (data) {
        const dateOfStd = new Date();
        let upconimg = data[0].matchDetails.filter((item, index) => {
          let datenow = new Date(item.date);
          if (datenow.getTime() >= dateOfStd.getTime()) {
            return item;
          }
        });
        console.log(data, "bh");
        setLaod(false);
        console.log(upconimg, "upconimg");
        setUpcoming(upconimg);
      }
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  useEffect(() => {
    getMyReservations();
  }, []);

  return (
    <div className="history">
      <Navbar
        login={"register"}
        homeplayr={"homeplayr"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      <div className="container history_c">
        <div className="h_card">
          <div className="h_card_nav">
            <span
              className={AllOrLast ? "active" : ""}
              onClick={() => {
                setAllOrLast(true);
              }}
            >
              All Matches
            </span>
            <span
              className={AllOrLast ? "" : "active"}
              onClick={() => {
                setAllOrLast(false);
              }}
            >
              Up Coming
            </span>
          </div>
          <div className="all_cards">
            {AllOrLast && allReservations.length > 0
              ? allReservations[0].matchDetails.map((item, index) => {
                  return (
                    <div className="h_p_details" key={index}>
                      <div className="s_img">
                        <img src={img0} alt="" />
                      </div>
                      <div className="stm_name">
                        <h3>{item.stadiumName}</h3>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span>Sayed Factory Street</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faClock} />
                          <span>
                            From{" "}
                            {item.date
                              .split("T")[1]
                              .split(":")[0]
                              .indexOf("0") == "0"
                              ? item.date
                                  .split("T")[1]
                                  .split(":")[0]
                                  .slice(
                                    Number(
                                      item.date
                                        .split("T")[1]
                                        .split(":")[0]
                                        .indexOf("0")
                                    ) + 1
                                  ) + " AM"
                              : Number(item.date.split("T")[1].split(":")[0]) <=
                                12
                              ? "  " +
                                Number(item.date.split("T")[1].split(":")[0]) +
                                " AM "
                              : "  " +
                                (Number(item.date.split("T")[1].split(":")[0]) -
                                  12) +
                                " PM "}{" "}
                            To{" "}
                            {item.date
                              .split("T")[1]
                              .split(":")[0]
                              .indexOf("0") == "0" ? (
                              <>
                                {Number(
                                  item.date
                                    .split("T")[1]
                                    .split(":")[0]
                                    .slice(
                                      Number(
                                        item.date
                                          .split("T")[1]
                                          .split(":")[0]
                                          .indexOf("0")
                                      ) + 1
                                    )
                                ) +
                                  1 +
                                  " AM"}
                              </>
                            ) : (
                              <>
                                {Number(item.date.split("T")[1].split(":")[0]) +
                                  1 <=
                                12
                                  ? "  " +
                                    (Number(
                                      item.date.split("T")[1].split(":")[0]
                                    ) +
                                      1) +
                                    " AM "
                                  : "  " +
                                    (Number(
                                      item.date.split("T")[1].split(":")[0]
                                    ) +
                                      1 -
                                      12) +
                                    " PM "}
                              </>
                            )}
                          </span>
                        </div>
                        <div className="ar_stm">
                          {/* <span>Mediator </span>
                          <img className="aro" src={arrow} alt="" />
                          <span>Friends</span> */}
                          <span>{item.date.split("T")[0]}</span>
                        </div>
                        {datenooww.getTime() >=
                        new Date(item.date).getTime() ? (
                          <div className="sho_mor">
                            <NavLink to={`/playerreservation/${item.teamId}`}>
                              Show Details
                            </NavLink>
                          </div>
                        ) : (
                          <div className="sho_mor">
                            <NavLink to={`/playerreservationn/${item.teamId}`}>
                              Show Details
                            </NavLink>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              : upcoming.map((item, index) => {
                  return (
                    <div className="h_p_details" key={index}>
                      <div className="s_img">
                        <img src={img0} alt="" />
                      </div>
                      <div className="stm_name">
                        <h3>{item.stadiumName}</h3>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span>Sayed Factory Street</span>
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faClock} />
                          <span>
                            From{" "}
                            {item.date
                              .split("T")[1]
                              .split(":")[0]
                              .indexOf("0") == "0"
                              ? item.date
                                  .split("T")[1]
                                  .split(":")[0]
                                  .slice(
                                    Number(
                                      item.date
                                        .split("T")[1]
                                        .split(":")[0]
                                        .indexOf("0")
                                    ) + 1
                                  ) + " AM"
                              : Number(item.date.split("T")[1].split(":")[0]) <=
                                12
                              ? "  " +
                                Number(item.date.split("T")[1].split(":")[0]) +
                                " AM "
                              : "  " +
                                (Number(item.date.split("T")[1].split(":")[0]) -
                                  12) +
                                " PM "}{" "}
                            To
                            {item.date
                              .split("T")[1]
                              .split(":")[0]
                              .indexOf("0") == "0" ? (
                              <>
                                {Number(
                                  item.date
                                    .split("T")[1]
                                    .split(":")[0]
                                    .slice(
                                      Number(
                                        item.date
                                          .split("T")[1]
                                          .split(":")[0]
                                          .indexOf("0")
                                      ) + 1
                                    )
                                ) + 1}
                              </>
                            ) : (
                              <>
                                {Number(item.date.split("T")[1].split(":")[0]) +
                                  1 <=
                                12
                                  ? "  " +
                                    (Number(
                                      item.date.split("T")[1].split(":")[0]
                                    ) +
                                      1) +
                                    " AM "
                                  : "  " +
                                    (Number(
                                      item.date.split("T")[1].split(":")[0]
                                    ) +
                                      1 -
                                      12) +
                                    " PM "}
                              </>
                            )}
                          </span>
                        </div>
                        <div className="ar_stm">
                          <span>{item.date.split("T")[0]}</span>
                          {/* <span>Mediator </span>
                          <img className="aro" src={arrow} alt="" />
                          <span>Friends</span> */}
                        </div>
                        <div className="sho_mor">
                          <NavLink to={`/playerreservationn/${item.teamId}`}>
                            Show Details
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
