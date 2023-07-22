import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import Showmap from "../../Components/Map/Showmap";
import img5 from "../../assets/back.jpg";
import img1 from "../../assets/clock.png";
import { default as img4, default as stars } from "../../assets/danger.png";
import img3 from "../../assets/folder.png";
import img7 from "../../assets/grass.jpg";
import img2 from "../../assets/location.png";
import img0 from "../../assets/stadium.png";
import img6 from "../../assets/usera.png";
import userone from "../../assets/userone.jpg";

const ReservationDetails = () => {
  const All = useSelector((state) => state.authSlice.latlng);
  console.log(All, "done");
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const { detail_id } = useParams();
  const [playerPosition, setplayerPosition] = useState("Forward");
  const [selectTeam, setSelectTeam] = useState("Team1");
  const [load, setLaod] = useState(false);
  const [stadiums, setStadiums] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [teamOne, setTeamOne] = useState([users]);
  const [teamOneId, setTeamOneId] = useState([users.id]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [teamTwoId, setTeamTwoId] = useState([]);
  const [Allplayerss, setAllplayerss] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [fullMap, setFullMap] = useState(false);
  const [join, setjoin] = useState(false);
  const [hourss, sethourss] = useState("");
  const [position, setposition] = useState([30.0561, 31.2394]);
  const [getDatefromm, setgetDatefromm] = useState([]);
  const [getDatefromT, setgetDatefromT] = useState([]);
  const [getDatefromAll, setgetDatefromAll] = useState([]);
  const [getDatefromElee, setgetDatefromElee] = useState([]);
  const [day, setDay] = useState("");
  const SelectTeams = (val) => {
    setSelectTeam(val);
  };

  var avHours = [];

  const handelchangeava = (onee, twoo) => {
    console.log("twice twice twice twice ");
    let io = onee.filter((element) => {
      return element.id == detail_id ? element : null;
    });

    let dateet = `${new Date().getFullYear()}-${
      Number(new Date().getMonth() + 1) < 10
        ? "0" + Number(new Date().getMonth() + 1)
        : Number(new Date().getMonth() + 1)
    }-${
      Number(new Date().getDate()) < 10
        ? "0" + Number(new Date().getDate())
        : Number(new Date().getDate())
    }`;
    let stdStart = Number(io[0].start);
    let stdEnd = Number(io[0].end);

    for (; stdStart <= stdEnd - 1; stdStart++) {
      avHours.push({
        op: `${stdStart} to ${stdStart + 1}`,
        valuee: `${stdStart < 9 ? "0" + stdStart : stdStart}:00:00`,
      });
    }

    let getDatefromele = twoo.filter((elei) => {
      return new Date(elei.date.split("T")[0]).getDate() ==
        new Date(dateet).getDate() &&
        new Date(elei.date.split("T")[0]).getMonth() ==
          new Date(dateet).getMonth()
        ? elei
        : null;
    });
    console.log(getDatefromele, "happy");
    setgetDatefromElee(getDatefromele);

    let getDatefrom = getDatefromele.map((elei) => {
      return elei ? elei.date.split("T")[1] : null;
    });

    setgetDatefromT(getDatefrom);

    let getDfrom = getDatefromele.map((elei) => {
      return elei ? elei.date.split("T")[0] : null;
    });
    setgetDatefromm(getDfrom);

    let allHoursStad = avHours.filter((ele) => {
      return getDatefrom.includes(ele.valuee) ? null : ele;
    });

    setAvailableHours(allHoursStad);
  };

  const handelchange = (val) => {
    let stdStart = Number(stadiums.start);
    let stdEnd = Number(stadiums.end);

    for (; stdStart <= stdEnd - 1; stdStart++) {
      avHours.push({
        op: `${stdStart} to ${stdStart + 1}`,
        valuee: `${stdStart < 9 ? "0" + stdStart : stdStart}:00:00`,
      });
    }

    let getDatefromele = getDatefromAll.filter((elei) => {
      return new Date(elei.date.split("T")[0]).getDate() ==
        new Date(val).getDate() &&
        new Date(elei.date.split("T")[0]).getMonth() == new Date(val).getMonth()
        ? elei
        : null;
    });

    setgetDatefromElee(getDatefromele);
    console.log(getDatefromele, "happy");
    let getDatefrom = getDatefromele.map((elei) => {
      return elei ? elei.date.split("T")[1] : null;
    });

    setgetDatefromT(getDatefrom);

    let getDfrom = getDatefromele.map((elei) => {
      return elei ? elei.date.split("T")[0] : null;
    });

    setgetDatefromm(getDfrom);

    let allHoursStad = avHours.filter((ele) => {
      return getDatefrom.includes(ele.valuee) ? null : ele;
    });

    setAvailableHours(allHoursStad);
  };

  const addPlayerTeam = (val, elActive) => {
    if (selectTeam == "Team1") {
      if (!teamOneId.includes(val.id) && !teamTwoId.includes(val.id)) {
        console.log(teamOne, "setTeamOne");
        let getGoalkeeper = teamOne.filter((iyy) => {
          return iyy.playerPosition == 3 ? iyy : null;
        });

        let getDefender = teamOne.filter((iyy) => {
          return iyy.playerPosition == 0;
        });

        let getCenter = teamOne.filter((iyy) => {
          return iyy.playerPosition == 2 ? iyy : null;
        });

        let getStriker = teamOne.filter((iyy) => {
          return iyy.playerPosition == -1 ? iyy : null;
        });

        if (val.playerPosition == 3) {
          console.log(getGoalkeeper.length, "getGoalkeeper.length");
          if (getGoalkeeper.length > 0) {
            toast.dismiss();
            toast.info("You can't add 2 GoalKeeper to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamOne([...teamOne, val]);
            teamOneId.push(val.id);
          }
        }

        if (val.playerPosition == 0) {
          if (getDefender.length > 1) {
            toast.dismiss();
            toast.info("You can't add 3 Defender to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamOne([...teamOne, val]);
            teamOneId.push(val.id);
          }
        }

        if (val.playerPosition == 2) {
          if (getCenter.length > 0) {
            toast.dismiss();
            toast.info("You can't add 2 Center to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamOne([...teamOne, val]);
            teamOneId.push(val.id);
          }
        }

        if (val.playerPosition == -1) {
          if (getStriker.length > 0) {
            toast.dismiss();
            toast.info("You can't add 2 Striker to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamOne([...teamOne, val]);
            teamOneId.push(val.id);
          }
        }
      } else {
        toast.dismiss();
        toast.info(
          "You Shouldn't select the same player in the another team1",
          {
            position: "bottom-right",
          }
        );
      }
    } else if (selectTeam == "Team2") {
      if (!teamTwoId.includes(val.id) && !teamOneId.includes(val.id)) {
        let getGoalkeeper = teamTwo.filter((iyy) => {
          return iyy.playerPosition == 3 ? iyy : null;
        });

        let getDefender = teamTwo.filter((iyy) => {
          return iyy.playerPosition == 0 ? iyy : null;
        });

        let getCenter = teamTwo.filter((iyy) => {
          return iyy.playerPosition == 2 ? iyy : null;
        });

        let getStriker = teamTwo.filter((iyy) => {
          return iyy.playerPosition == -1 ? iyy : null;
        });

        if (val.playerPosition == 3) {
          if (getGoalkeeper.length > 0) {
            toast.dismiss();
            toast.info("You can't add 2 GoalKeeper to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamTwo([...teamTwo, val]);
            teamTwoId.push(val.id);
          }
        }

        if (val.playerPosition == 0) {
          if (getDefender.length > 1) {
            toast.dismiss();
            toast.info("You can't add 2 GoalKeeper to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamTwo([...teamTwo, val]);
            teamTwoId.push(val.id);
          }
        }

        if (val.playerPosition == 2) {
          if (getCenter.length > 0) {
            toast.dismiss();
            toast.info("You can't add 2 GoalKeeper to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamTwo([...teamTwo, val]);
            teamTwoId.push(val.id);
          }
        }

        if (val.playerPosition == -1) {
          if (getStriker.length > 0) {
            toast.dismiss();
            toast.info("You can't add 2 GoalKeeper to the same team", {
              position: "bottom-right",
            });
          } else {
            setTeamTwo([...teamTwo, val]);
            teamTwoId.push(val.id);
          }
        }
      } else {
        toast.dismiss();
        toast.info("You Shouldn't select the same player in the another team", {
          position: "bottom-right",
        });
      }
    } else {
      toast.dismiss();
      toast.info("You Shouldn't select the same player in the another team", {
        position: "bottom-right",
      });
    }
  };

  const deleteFromTeamOne = (val) => {
    let elplayer = teamOne.filter((el) => {
      return el.id !== val.id ? el : null;
    });
    let elplayerid = teamOneId.filter((el) => {
      return el !== val.id ? el : null;
    });
    console.log(elplayer);
    setTeamOne(elplayer);
    setTeamOneId(elplayerid);
  };
  const deleteFromTeamTwo = (val) => {
    let elplayer = teamTwo.filter((el) => {
      return el.id !== val.id ? el : null;
    });
    let elplayerid = teamTwoId.filter((el) => {
      return el !== val.id ? el : null;
    });
    setTeamTwo(elplayer);
    setTeamTwoId(elplayerid);
  };

  const reservStad = async (reversStad) => {
    console.log(reversStad, "hdhdhdhhd");
    try {
      setLaod(true);
      const res = await fetch(
        "https://a7gezlyapi.azurewebsites.net/api/Reservation/ReserveStadium",
        {
          method: "POST",
          body: JSON.stringify(reversStad),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();
      if (data) {
        setgetDatefromAll(data);
        setLaod(false);
        navigate("/playerhome", { replace: true });
        toast.dismiss();
        toast.info("Hour reserved", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("email exist", {
        position: "bottom-right",
      });
    }
  };

  const handleSubmit = (e) => {
    setjoin(false);
    e.preventDefault();
    const reservStadDetail = {
      stadiumId: detail_id,
      reservedHour: `${day}T${hourss}`,
      reserverId: users.id,
      reserverType: false,
      teamMembers1: teamOneId,
      teamMembers2: teamTwoId,
    };
    console.log(reservStadDetail, "hhh");

    if (day) {
      let date = new Date();
      let userDate = new Date(day);
      let dayDate = date.getDate() < 9 ? "0" + date.getDate() : date.getDate();
      let monthDate =
        date.getMonth() + 1 < 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let yeatdate = date.getFullYear();
      let newnewdate = new Date(`${yeatdate}-${monthDate}-${dayDate}`);
      console.log(userDate, "upupup");
      if (userDate.getTime() >= newnewdate.getTime()) {
        if (hourss) {
          if (teamOne.length > 0) {
            if (teamTwo.length > 0) {
              reservStad(reservStadDetail);
            } else {
              toast.dismiss();
              toast.info("You Should select At least one player Team1", {
                position: "bottom-right",
              });
            }
          } else {
            toast.dismiss();
            toast.info("You Should select At least one player Team2", {
              position: "bottom-right",
            });
          }
        } else {
          toast.dismiss();
          toast.info("You Should select Hour", {
            position: "bottom-right",
          });
        }
      } else {
        toast.dismiss();
        toast.info("You Should select correct Date", {
          position: "bottom-right",
        });
      }
    } else {
      toast.dismiss();
      toast.info("You Should select Date", {
        position: "bottom-right",
      });
    }
  };

  const getPlayerAs = async (po, dth) => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/PlayersByPosition?position=${po}&time=${dth}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLaod(false);
        console.log(data, "sjy");
        await setAllplayerss(data);
      }
      return data;
    } catch (error) {
      setLaod(false);
      return null;
    }
  };

  const getPlayers = (val) => {
    if (day && hourss) {
      let date_hours = `${day}T${hourss}`;
      if (val == "Defender") {
        getPlayerAs(0, date_hours);
      } else if (val == "GoalKeeper") {
        getPlayerAs(3, date_hours);
      } else if (val == "MidDefender") {
        getPlayerAs(2, date_hours);
      } else if (val == "Forward") {
        getPlayerAs(-1, date_hours);
      }
    } else {
      toast.info("You Should select Date And Hour", {
        position: "bottom-right",
      });
    }
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
        await data.forEach((element) => {
          if (element.id == detail_id) {
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

  const getdateOfStad = async () => {
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/GetReservedHours?id=${detail_id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data.length > 0) {
        if (data) {
          await setgetDatefromAll(data);
          console.log(data, "treuetreuetreuetreuetreuetreuetreuetreue");
        }
      }

      return data;
    } catch (error) {
      return null;
    }
  };
  const getdateOfStadkl = async () => {
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/GetSatdiums?id=${detail_id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLat(data.latitude);
        setLng(data.longitude);
        setposition([data.latitude, data.longitude]);
        console.log(Number(data.latitude.toFixed(3)), "nkl");
        console.log(Number(data.longitude.toFixed(3)), "nkl");
      }

      return data;
    } catch (error) {
      return null;
    }
  };
  const handelCancelNo = async () => {
    setjoin(false);
  };

  useEffect(() => {
    let userstes = users.playerPosition == undefined ? true : false;
    getdateOfStadkl();
    console.log(userstes, "abobakr");
    getMyStadiums().then((res) => {
      getdateOfStad().then((x) => {
        handelchangeava(res, x);
      });
    });
  }, []);

  return (
    <div className="reserv_details">
      <img src={img5} alt="" className="rev_back" />
      <Navbar
        login={"register"}
        homeplayr={"plyer"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      {join ? (
        <div className="qus">
          <div className="qus_con">
            <p>Do you want to reserve ?</p>
            <button type="submit" form="form1">
              Yes
            </button>
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
      {fullMap ? (
        <div className="fullMap">
          <div className="closeMapUp">
            {" "}
            <span
              className="closeMap"
              onClick={() => {
                setFullMap(false);
              }}
            >
              X
            </span>
          </div>
          {lat == 0 && lng == 0 ? null : (
            <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Showmap lng={lng} lat={lat} alldir={All} />
            </MapContainer>
          )}
        </div>
      ) : null}

      {load ? <Loading /> : null}
      <div className="revv">
        <div className="container">
          <div className="row">
            <div className="reserv res_detail">
              <div className="r_data rev_one">
                <img src={img0} alt="" />
                <h2 className="rev_title">{stadiums.name}</h2>
              </div>

              <div className="mapContainer">
                <span
                  className="right"
                  onClick={() => {
                    setFullMap(true);
                  }}
                >
                  View Full Map
                </span>
                {lat == 0 && lng == 0 ? null : (
                  <MapContainer
                    center={[lat, lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Showmap lng={lng} lat={lat} alldir={All} />
                  </MapContainer>
                )}
              </div>
              <div className="r_data">
                <img src={img1} alt="" />
                <h2>
                  From {stadiums.start} To {stadiums.end}{" "}
                  <span className="timsys">24h</span>
                </h2>
              </div>
              <div className="r_data">
                <img src={img2} alt="" />
                <h2>Halls Street next to Al-Azhar</h2>
              </div>
              <div className="r_data">
                <img src={img3} alt="" />
                <h2>{stadiums.hourPrice} EGY</h2>
              </div>
            </div>
            <div className="reserv res_hour">
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                id="form1"
              >
                <div className="select_day">
                  <div className="sel_day">
                    <label>Determine Date: </label>
                    <input
                      className="selc_team"
                      type="date"
                      onChange={(e) => {
                        setDay(e.target.value);
                        handelchange(e.target.value);
                      }}
                      value={day}
                    />
                  </div>
                  <div className="available_hours">
                    <label>Available hours: </label>
                    <select
                      className="selc_team"
                      onChange={(e) => {
                        sethourss(e.target.value);
                      }}
                      value={hourss}
                    >
                      <option>Select Hour</option>
                      {availableHours.length > 0
                        ? availableHours.map((item, index) => {
                            return (
                              <option value={item.valuee} key={index}>
                                {item.op}
                              </option>
                            );
                          })
                        : availableHours.length <= 0
                        ? "Available Hours"
                        : avHours.map((item, index) => {
                            return (
                              <option value={item.valuee} key={index}>
                                {item.op}
                              </option>
                            );
                          })}
                    </select>
                  </div>
                </div>
                <div className="select_data">
                  <div className="s_team">
                    <label>Select Team: </label>
                    <select
                      className="selc_team"
                      onChange={(e) => {
                        SelectTeams(e.target.value);
                      }}
                      value={selectTeam}
                    >
                      <option value="Team1">Team1</option>
                      <option value="Team2">Team2</option>
                    </select>
                  </div>
                </div>
                <div className="position">
                  <div className="select_position">
                    <label>Select Team:</label>
                    <div className="pl_position">
                      <img src={img7} alt="" />
                      <div className="lb content">
                        <span
                          className="lb_team_one team_one"
                          onClick={() => {
                            setplayerPosition("Defender");
                            getPlayers("Defender");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="rb_team_two team_two"
                          onClick={() => {
                            setplayerPosition("Defender");
                            getPlayers("Defender");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                      </div>
                      <div className="md content">
                        <span
                          className="gk_team_one team_one"
                          onClick={() => {
                            setplayerPosition("GoalKeeper");
                            getPlayers("GoalKeeper");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="md_team_one team_one"
                          onClick={() => {
                            setplayerPosition("MidDefender");
                            getPlayers("MidDefender");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="f_team_one team_one"
                          onClick={() => {
                            setplayerPosition("Forward");
                            getPlayers("Forward");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="f_team_two team_two"
                          onClick={() => {
                            setplayerPosition("Forward");
                            getPlayers("Forward");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="md_team_two team_two"
                          onClick={() => {
                            setplayerPosition("MidDefender");
                            getPlayers("MidDefender");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="gk_team_two team_two"
                          onClick={() => {
                            setplayerPosition("GoalKeeper");
                            getPlayers("GoalKeeper");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                      </div>
                      <div className="rb content">
                        <span
                          className="rb_team_one team_one"
                          onClick={() => {
                            setplayerPosition("Defender");
                            getPlayers("Defender");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                        <span
                          className="lb_team_two team_two"
                          onClick={() => {
                            setplayerPosition("Defender");
                            getPlayers("Defender");
                          }}
                        >
                          <img src={img6} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="player__info">
                    <div className="player__info_head">
                      <span className="ply_positon">{playerPosition}</span>
                      <span>
                        <img src={stars} alt="" />
                      </span>
                    </div>
                    <div className="all_plyerr">
                      {Allplayerss.length > 0
                        ? Allplayerss.map((item, index) => {
                            return (
                              <div className="plr__info" key={index}>
                                <span
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    addPlayerTeam(item, e.target);
                                  }}
                                >
                                  <img
                                    src={
                                      item.profilePicture
                                        ? `data:image/${
                                            "jpeg" || "png" || "jpg"
                                          };base64,${item.profilePicture}`
                                        : userone
                                    }
                                    alt=""
                                  />
                                </span>
                                <span>
                                  {item.name.split("?")[0] + " "}
                                  {!item.name.split("?")[1] ||
                                  item.name.split("?")[1] == "undefined"
                                    ? null
                                    : item.name.split("?")[1]}
                                </span>
                                <span>
                                  {item.playerPosition == 3
                                    ? "GK"
                                    : item.playerPosition == 2
                                    ? "MD"
                                    : item.playerPosition == -1
                                    ? "FD"
                                    : item.playerPosition == 0
                                    ? "DF"
                                    : null}
                                </span>
                                <span className="plr__last">5</span>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  <div className="player__teams content">
                    <div className="all_teamss">
                      <div className="player__info_head">
                        <span className="ply_positon">TeamTwo</span>
                      </div>
                      <div className="all_plyerr">
                        {teamTwo.length > 0
                          ? teamTwo.map((item, index) => {
                              return (
                                <div className="plr__info" key={index}>
                                  <span>
                                    <img
                                      src={
                                        item.profilePicture
                                          ? `data:image/${
                                              "jpeg" || "png" || "jpg"
                                            };base64,${item.profilePicture}`
                                          : userone
                                      }
                                      alt=""
                                    />
                                  </span>
                                  <span>
                                    {item.name.split("?")[0] + " "}
                                    {!item.name.split("?")[1] ||
                                    item.name.split("?")[1] == "undefined"
                                      ? null
                                      : item.name.split("?")[1]}
                                  </span>
                                  <span>
                                    {item.playerPosition == 3
                                      ? "GK"
                                      : item.playerPosition == 2
                                      ? "MD"
                                      : item.playerPosition == -1
                                      ? "FD"
                                      : item.playerPosition == 0
                                      ? "DF"
                                      : null}
                                  </span>
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      deleteFromTeamTwo(item);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faXmark} size="lg" />
                                  </span>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                    <div className="all_teamss">
                      <div className="player__info_head">
                        <span className="ply_positon">TeamOne</span>
                      </div>
                      <div className="all_plyerr">
                        {teamOne.length > 0
                          ? teamOne.map((item, index) => {
                              return (
                                <div className="plr__info" key={index}>
                                  <span>
                                    <img
                                      src={
                                        item.profilePicture
                                          ? `data:image/${
                                              "jpeg" || "png" || "jpg"
                                            };base64,${item.profilePicture}`
                                          : userone
                                      }
                                      alt=""
                                    />
                                  </span>
                                  <span>
                                    {item.name.split("?")[0] + " "}
                                    {!item.name.split("?")[1] ||
                                    item.name.split("?")[1] == "undefined"
                                      ? null
                                      : item.name.split("?")[1]}
                                  </span>
                                  <span>
                                    {item.playerPosition == 3
                                      ? "GK"
                                      : item.playerPosition == 2
                                      ? "MD"
                                      : item.playerPosition == -1
                                      ? "FD"
                                      : item.playerPosition == 0
                                      ? "DF"
                                      : null}
                                  </span>
                                  <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      deleteFromTeamOne(item);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faXmark} size="lg" />
                                  </span>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="plr__in_back">
                  <span
                    className="reverse_btn"
                    onClick={() => {
                      setjoin(true);
                    }}
                  >
                    Book Now
                  </span>
                  <NavLink to={"/playerhome"}>Back</NavLink>
                </div>
              </form>
            </div>
          </div>
          <div className="rev_danger">
            <img src={img4} alt="" />
            <p className="lead">
              Reservations cannot be withdrawn until 6 hours before the start of
              the match
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

let DefaultIcon = L.icon({
  iconUrl: "/map-marker-icon.png",
  iconSize: [33, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default ReservationDetails;
