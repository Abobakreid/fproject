import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import playe from "../../assets/player.png";
const OwnerStadiumDetail = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [getDatefromAll, setgetDatefromAll] = useState([]);
  const [getDatefromAlll, setgetDatefromAlll] = useState([]);
  const [NotgetDate, setNotgetDate] = useState([]);
  const { stad_Id } = useParams();
  const [stadius, setStadiums] = useState([]);
  const [stdsStart, setStdsStart] = useState(0);
  const [stdsend, setStdsEnd] = useState(0);
  const [hourId, setHourId] = useState(0);
  const [load, setLaod] = useState(false);
  const [hour, setHour] = useState("");
  const [sDate, setsDate] = useState("");

  const [reserv, setreserv] = useState(false);

  const [overlay, setoverlay] = useState(false);

  let avhours = [];

  const handelchange = (kl, datt, st, en) => {
    setsDate(datt);
    let stdStart = Number(st);
    let stdEnd = Number(en);
    for (; stdStart <= stdEnd - 1; stdStart++) {
      avhours.push({
        valuee: `${stdStart < 9 ? "0" + stdStart : stdStart}:00:00`,
      });
    }

    let getDatefromele = kl.filter((elei) => {
      return new Date(elei.date.split("T")[0]).getDate() ==
        new Date(datt).getDate() &&
        new Date(elei.date.split("T")[0]).getMonth() ==
          new Date(datt).getMonth()
        ? elei
        : null;
    });

    let getDatefromeleTime = getDatefromele.map((elei) => {
      return new Date(elei.date.split("T")[0]).getDate() ==
        new Date(datt).getDate() &&
        new Date(elei.date.split("T")[0]).getMonth() ==
          new Date(datt).getMonth()
        ? elei.date.split("T")[1]
        : null;
    });

    let iu = avhours.filter((ele) => {
      return getDatefromeleTime.includes(ele.valuee) ? null : ele;
    });

    setNotgetDate(iu);
    setgetDatefromAll(getDatefromele);
  };

  const handelchangeava = (onee, stds) => {
    let dateet = `${new Date().getFullYear()}-${
      Number(new Date().getMonth() + 1) < 10
        ? "0" + Number(new Date().getMonth() + 1)
        : Number(new Date().getMonth() + 1)
    }-${
      Number(new Date().getDate()) < 10
        ? "0" + Number(new Date().getDate())
        : Number(new Date().getDate())
    }`;

    let stdStarts = stds.start;
    let stdEnds = stds.end;

    stds.forEach((element) => {
      if (element.id == stad_Id) {
        stdStarts = element.start;
        stdEnds = element.end;
      } else {
        console.log("true");
      }
    });
    setStdsStart(stdStarts);
    setStdsEnd(stdEnds);
    handelchange(onee, dateet, stdStarts, stdEnds);
  };

  const getdateOfStad = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/GetReservedHours?id=${stad_Id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLaod(false);
        setgetDatefromAlll(data);
        console.log(data, "nononononoo");
      }

      return data;
    } catch (error) {
      setLaod(false);
      return null;
    }
  };

  const handelreserv = (val) => {
    console.log(val, "ghy");
    setoverlay(true);
    setHour(val);
  };

  const getMyStadiums = async () => {
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/FindStadium?latitude=${"23"}&longitude=${"22"}&distance=${"-1"}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        console.log(data, "love");
        data.forEach((element) => {
          if (element.id == stad_Id) {
            setStadiums(element);
          } else {
            console.log("true truetruetruetruetrue");
          }
        });
      }
      return data;
    } catch (error) {
      return null;
    }
  };

  const handelYes = async () => {
    let datel = new Date();
    setoverlay(false);
    const userdata = {
      stadiumId: stad_Id,
      reservedHour: `${
        sDate == "" ? datel.toISOString().split("T")[0] : sDate
      }T${hour}`,
      reserverId: users.id,
      reserverType: true,
    };
    console.log(userdata, "sjjsk");
    try {
      setLaod(true);
      await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/Reservation/ReserveStadiumOwner",
        {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      setLaod(false);
      toast.dismiss();
      toast.info("Hour Reserved", {
        position: "bottom-right",
      });
      window.location.reload();
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("email exist", {
        position: "bottom-right",
      });
    }
  };
  const handelCancelYes = async () => {
    setreserv(false);
    try {
      setLaod(true);
      await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/CancelReservation?hourId=${hourId}`,
        {
          method: "Delete",
        }
      );
      window.location.reload();
      setLaod(false);
    } catch (error) {
      return console.log(error);
    }
  };
  const handelCancelNo = () => {
    setreserv(false);
  };

  const handedelreserv = () => {
    setreserv(true);
  };
  const handelNo = () => {
    setoverlay(false);
  };

  useEffect(() => {
    getMyStadiums().then((myStadiums) => {
      getdateOfStad().then((date) => {
        handelchangeava(date, myStadiums);
      });
    });
  }, []);

  return (
    <div className="owner_stadium_detail">
      <Navbar
        login={"register"}
        stadiums={"stadium"}
        homeowner={"homeowner"}
        registered={"registered"}
      />
      {overlay ? (
        <div className="qus">
          <div className="qus_con">
            <p>Do you want to reserve this hour?</p>
            <span
              onClick={() => {
                handelYes();
              }}
            >
              Yes
            </span>
            <span
              onClick={() => {
                handelNo();
              }}
            >
              No
            </span>
          </div>
        </div>
      ) : null}

      {reserv ? (
        <div className="qus">
          <div className="qus_con">
            <p>Do you want to cancel reserve ?</p>
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

      {load ? <Loading /> : null}
      <div className="container reservations_r">
        <div className="filtration">
          <div className="reservations_i content">
            <div>
              {" "}
              <label className="filter">Select Date</label>
              <input
                className="dat"
                type="date"
                name=""
                onChange={(e) => {
                  handelchange(
                    getDatefromAlll,
                    e.target.value,
                    stdsStart,
                    stdsend
                  );
                }}
              />
            </div>
            <div className="oone">
              <NavLink to={`/stadiumfeedback/${stad_Id}`} className="analysis">
                Studium Comments
              </NavLink>
              <NavLink to={`/analysisstadium/${stad_Id}`} className="analysis">
                View Analysis
              </NavLink>
            </div>
          </div>
        </div>
        <div className="reservation_row">
          {getDatefromAll.length > 0
            ? getDatefromAll.map((item, index) => {
                return (
                  <div className="stad" key={index}>
                    {/* <div className="detail">
                <NavLink to={"/"}>
                  <span>Details</span>
                </NavLink>
              </div> */}
                    <div className="data">
                      {item.reserverType ? (
                        <span className="teamOne">
                          <h2>Team 1</h2>
                          <img src={playe} alt="" />
                        </span>
                      ) : (
                        <NavLink
                          to={`/detailsteam/${item.id}`}
                          className="teamOne"
                        >
                          <h2>Team 1</h2>
                          <img src={playe} alt="" />
                        </NavLink>
                      )}

                      {item.reserverType ? (
                        <div className="reservation">
                          <span
                            onClick={() => {
                              setHourId(item.id);
                              handedelreserv();
                            }}
                            className="Reserved"
                            style={{ cursor: "pointer" }}
                          >
                            Reserved
                          </span>
                          <span>hours</span>
                          <span>{item.date.split("T")[1]}</span>
                        </div>
                      ) : (
                        <div className="reservation">
                          <span className="Reserved">Reserved</span>
                          <span>hours</span>
                          <span>{item.date.split("T")[1]}</span>
                        </div>
                      )}

                      {item.reserverType ? (
                        <span className="teamTwo">
                          <h2>Team 2</h2>
                          <img src={playe} alt="" />
                        </span>
                      ) : (
                        <NavLink
                          to={`/detailsteam/${item.id}`}
                          className="teamTwo"
                        >
                          <h2>Team 2</h2>
                          <img src={playe} alt="" />
                        </NavLink>
                      )}
                    </div>
                  </div>
                );
              })
            : null}

          {NotgetDate.length > 0
            ? NotgetDate.map((item, index) => {
                return (
                  <div className="stad" key={index}>
                    {/* <div className="detail">
                      <NavLink to={"/"}>
                        <span>Details</span>
                      </NavLink>
                    </div> */}
                    <div className="data">
                      <div className="teamOne">
                        <img src={playe} alt="" />
                        <span className="dash"></span>
                      </div>
                      <div className="reservation">
                        <span
                          className="Reserved Reserved_owner"
                          onClick={() => {
                            handelreserv(item.valuee);
                          }}
                        >
                          Not Reserved
                        </span>
                        <span>{item.valuee}</span>
                      </div>
                      <div className="teamTwo">
                        <span className="dash"></span>
                        <img src={playe} alt="" />
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default OwnerStadiumDetail;
