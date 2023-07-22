import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate, useParams } from "react-router-dom";
import { Loading, Navbar } from "../../Components";
import PlayerRate from "../../Components/PlayerRate/PlayerRate";
import back from "../../assets/back.jpg";
import userone from "../../assets/userone.jpg";

const PlayerReservationn = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const { stad_Id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [tteamMembers, settteamMembers] = useState([]);
  const [rateVal, setrateVal] = useState(0);
  const [playerRatelink, setplayerRatelink] = useState({});
  const [playerRatel, setplayerRatel] = useState(36);
  const [playerId, setplayerId] = useState(0);
  const [teamsId, setteamsId] = useState(0);
  const [reservedHourId, setreservedHourId] = useState(0);
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState(0);
  const [registerPlayer, setregisterPlayer] = useState([]);
  const [playerRatem, setplayerRatem] = useState([]);
  const [load, setLaod] = useState(false);
  const [join, setjoin] = useState(false);

  const [joinwith, setjoinwith] = useState(false);
  let pos =
    users.playerPosition == 3
      ? "GoalKeeper"
      : users.playerPosition == 2
      ? "Center"
      : users.playerPosition == -1
      ? "Striker"
      : users.playerPosition == 0
      ? "Defending"
      : null;

  const [radar, setRadar] = useState({
    series: [],
    noData: {
      text: "loading...",
    },
    options: {
      chart: {
        height: 350,
        type: "radar",
        id: "radar",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      title: {
        text: pos,
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: ["Speed", "Dribbling", "Passing", "defending", "Shooting"],
      },
      yaxis: {
        max: 100,
        tickAmount: 7,
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return Math.round(val);
            } else {
              return "";
            }
          },
        },
      },
    },
  });

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
      if (data) {
        setLaod(false);
        console.log(data, "ssspo");
        let filt = data[0].matchDetails.filter((item) => {
          return item.teamId == stad_Id;
        });
        console.log(filt, "bahb");
        console.log(filt[0].date, "ssspuolk");
        console.log(filt[0].reservedHourId, "ssspuo");
        setteamsId(filt[0].teamId);
        setplayerId(filt[0].reserverId);
        setreservedHourId(filt[0].reservedHourId);
        let filtTeamMembers = filt[0].teamMembers;

        setReservations(filt);
        let filtWithOutemail = filtTeamMembers.filter((mem) => {
          return mem.playerEmail != users.email;
        });
        console.log(filtWithOutemail, "kio");
        settteamMembers(filtWithOutemail);

        let showRatel = filtWithOutemail.map((item) => {
          getstaddata(item.id);
        });

        console.log(playerRatem, "uil");
        let filtByemail = filtTeamMembers.filter((mem) => {
          return mem.playerEmail == users.email;
        });
        setregisterPlayer(filtByemail);
        console.log(filtByemail, "abo");

        const dateOfStd = new Date();
        let datenow = new Date(filt[0].date);
        console.log(datenow.getTime(), "hju");
        if (datenow.getTime() >= dateOfStd.getTime()) {
          setUpcoming(1);
        }
      }
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  const WithdrawTeam = () => {
    setjoinwith(true);
  };

  const handelCancelYeswith = async () => {
    setjoinwith(false);
    try {
      setLaod(true);
      await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/WithdrawTeam?playerId=${users.id}&teamId=${teamsId}`,
        {
          method: "Delete",
        }
      );
      setLaod(false);
      navigate("/playerhome", { replace: true });
    } catch (error) {
      return console.log(error);
    }
  };

  const handelCancelNowith = () => {
    setjoinwith(false);
  };

  const CancelReservation = () => {
    setjoin(true);
  };

  const handelCancelYes = async () => {
    setjoin(false);
    try {
      setLaod(true);
      await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/CancelReservation?hourId=${reservedHourId}`,
        {
          method: "Delete",
        }
      );
      setLaod(false);
      navigate("/playerhome", { replace: true });
    } catch (error) {
      return console.log(error);
    }
  };

  const handelCancelNo = () => {
    setjoin(false);
  };

  let showNum = (val) => {
    val.style.display = "none";
    val.previousElementSibling.style.display = "inline-block";
  };

  let hideNum = (val) => {
    val.style.display = "none";
    val.nextElementSibling.style.display = "inline-block";
  };

  let showRate = (val) => {
    let circularProgress = document.getElementById("progress");
    let progressStartValue = 0;
    let progressEndValue = Math.floor(val);
    let speed = 2;
    let progress = setInterval(() => {
      if (val !== 0) {
        progressStartValue++;
        if (progressStartValue == progressEndValue) {
          clearInterval(progress);
          setrateVal(val);
        } else {
          setrateVal(progressStartValue);
          circularProgress.style.background = `conic-gradient(#78feb5 ${
            progressStartValue * 3.6
          }deg, white 0deg)`;
        }
      } else {
        clearInterval(progress);
      }
    }, speed);
  };

  const getMyReservations2 = async () => {
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/GetPlayerData?id=${users.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setplayerRatelink(data.playerData);
        showRate(data.playerData.rank);
        console.log(data, "hhhhhhhhh");
      }
      return data;
    } catch (error) {
      return console.log(error);
    }
  };

  const getstaddata = async (d) => {
    try {
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/IsRated?teamId=${stad_Id}&whoRateId=${users.id}&playerId=${d}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        if (playerRatem.includes(d)) {
          console.log("done");
        } else {
          playerRatem.push(d);
        }
      }
      console.log(data, "hhhhhhhhh156");
      return data;
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    getMyReservations();
    getMyReservations2();
  }, []);
  return (
    <div className="player_reservationn">
      <Navbar
        login={"register"}
        registered={"registered"}
        stadiums={"stadium"}
        homeplayr={"homeplayr"}
      />
      {load ? <Loading /> : null}
      {join ? (
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
      {joinwith ? (
        <div className="qus">
          <div className="qus_con">
            <p>Do you want to WithdrawTeam ?</p>
            <span
              onClick={() => {
                handelCancelYeswith();
              }}
            >
              Yes
            </span>
            <span
              onClick={() => {
                handelCancelNowith();
              }}
            >
              No
            </span>
          </div>
        </div>
      ) : null}
      <img src={back} alt="" className="playerhome_img" />
      <div className="container res_container">
        <div className="row content">
          <div className="players content">
            {tteamMembers
              ? tteamMembers.map((item, index) => {
                  return (
                    <div className="p_team" key={index}>
                      <div className="up">
                        {item.position == 3 ? (
                          <div>
                            <div style={{ padding: "20px" }}>
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
                              <h3>
                                {item.name.split("?")[0]}
                                {item.name.split("?")[1] == undefined
                                  ? null
                                  : item.name.split("?")[1]}
                              </h3>
                              <div> {item.playerEmail}</div>
                              <PlayerRate
                                plrRate={
                                  item.playerData.rank == undefined
                                    ? 0
                                    : item.playerData.rank
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div style={{ padding: "20px" }}>
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
                              <h3>
                                {item.name.split("?")[0]}
                                {item.name.split("?")[1] == undefined
                                  ? null
                                  : item.name.split("?")[1]}
                              </h3>
                              <div> {item.playerEmail}</div>
                              <PlayerRate
                                plrRate={
                                  item.playerData.rank == undefined
                                    ? 0
                                    : item.playerData.rank
                                }
                              />
                            </div>
                          </div>
                        )}

                        <div className="Show_num">
                          <span
                            className="num"
                            onClick={(e) => {
                              hideNum(e.target);
                            }}
                          >
                            {item.phoneNumber}
                          </span>
                          <span
                            onClick={(e) => {
                              showNum(e.target);
                            }}
                          >
                            Show Number
                          </span>
                        </div>
                      </div>
                      <div className="upto">
                        {item.playerData.rank == 0 ? (
                          <>
                            {item.position == 3 ? (
                              <Chart
                                options={{
                                  ...radar.options,
                                  title: {
                                    text: "GoalKeeper",
                                  },
                                  xaxis: {
                                    categories: [
                                      "gk_diving",
                                      "gk_handling",
                                      "gk_reflexes",
                                      "gk_speed",
                                      "gk_positioning",
                                      "gk_kicking",
                                    ],
                                  },
                                }}
                                series={[
                                  {
                                    name: "Rates",
                                    data: [0, 0, 0, 0, 0, 0],
                                  },
                                ]}
                                type="radar"
                                height={350}
                              />
                            ) : (
                              <Chart
                                options={{
                                  ...radar.options,
                                  title: {
                                    text: `${
                                      item.position == 3
                                        ? "GoalKeeper"
                                        : item.position == 0
                                        ? "Defender"
                                        : item.position == 2
                                        ? "Center"
                                        : item.position == -1
                                        ? "Striker"
                                        : null
                                    }`,
                                  },
                                }}
                                series={[
                                  {
                                    name: "Rates",
                                    data: [0, 0, 0, 0, 0],
                                  },
                                ]}
                                type="radar"
                                height={350}
                              />
                            )}
                          </>
                        ) : item.position == 3 ? (
                          <Chart
                            options={{
                              ...radar.options,
                              title: {
                                text: "GoalKeeper",
                              },
                              xaxis: {
                                categories: [
                                  "gk_diving",
                                  "gk_handling",
                                  "gk_reflexes",
                                  "gk_speed",
                                  "gk_positioning",
                                  "gk_kicking",
                                ],
                              },
                            }}
                            series={[
                              {
                                name: "Rates",
                                data: [
                                  item.playerData.gk_diving,
                                  item.playerData.gk_handling,
                                  item.playerData.gk_reflexes,
                                  item.playerData.gk_speed,
                                  item.playerData.gk_positioning,
                                  item.playerData.gk_kicking,
                                ],
                              },
                            ]}
                            type="radar"
                            height={350}
                          />
                        ) : (
                          <Chart
                            options={{
                              ...radar.options,
                              title: {
                                text: `${
                                  item.position == 3
                                    ? "GoalKeeper"
                                    : item.position == 0
                                    ? "Defender"
                                    : item.position == 2
                                    ? "Center"
                                    : item.position == -1
                                    ? "Striker"
                                    : null
                                }`,
                              },
                            }}
                            series={[
                              {
                                name: "Rates",
                                data: [
                                  item.playerData.pace,
                                  item.playerData.dribbling,
                                  item.playerData.passing,
                                  item.playerData.defending,
                                  item.playerData.shooting,
                                ],
                              },
                            ]}
                            type="radar"
                            height={350}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="total_rate">
            {registerPlayer
              ? registerPlayer.map((item, index) => {
                  return (
                    <div className="p_data" key={index}>
                      <span className="p_po">
                        {users.playerPosition == 3 ? (
                          <div className="user_data">GoalKeeper</div>
                        ) : null}
                        {users.playerPosition == 0 ? (
                          <div className="user_data">Defender</div>
                        ) : null}
                        {users.playerPosition == 2 ? (
                          <div className="user_data">Center</div>
                        ) : null}
                        {users.playerPosition == -1 ? (
                          <div className="user_data">Striker</div>
                        ) : null}
                      </span>
                      <div className="p_dat content">
                        <div className="p_info">
                          <h3>
                            {item.name.split("?")[0]}
                            {item.name.split("?")[1] == undefined
                              ? null
                              : item.name.split("?")[1]}
                          </h3>
                          <div className="p_em">{item.playerEmail}</div>
                        </div>
                        <div className="p_img">
                          <img
                            src={
                              users.profilePicture
                                ? `data:image/${
                                    "jpeg" || "png" || "jpg"
                                  };base64,${users.profilePicture}`
                                : userone
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
            {/* <div className="p_data">
              <span className="p_po">{registerPlayer.position}</span>
              <div className="p_dat content">
                <div className="p_info">
                  <div>{registerPlayer.name}</div>
                  <div>{registerPlayer.playerEmail}</div>
                </div>
                <div className="p_img">
                  <img src={userImg} alt="" />
                </div>
              </div>
            </div> */}
            <div className="t_rate">
              <h2> Total Rate: </h2>
              <div className="c_rate">
                <div className="circular_container">
                  <div className="circular-progress" id="progress">
                    <span className="progress-value">{rateVal}%</span>
                  </div>
                </div>
              </div>
              <div className="s_rate">
                <h2> Statistics:</h2>
                <div className="rates content">
                  <div className="r_p">
                    {pos != "GoalKeeper" ? "Defending" : "gk_diving"}
                    <span>
                      {playerRatelink.rank == 0
                        ? 0
                        : pos == "GoalKeeper"
                        ? playerRatelink.gk_diving
                        : playerRatelink.defending}
                    </span>
                  </div>
                  <div className="r_p">
                    {pos != "GoalKeeper" ? "Dribbling" : "gk_handling"}
                    <span>
                      {playerRatelink.rank == 0
                        ? 0
                        : pos == "GoalKeeper"
                        ? playerRatelink.gk_handling
                        : playerRatelink.dribbling}
                    </span>
                  </div>
                  <div className="r_p">
                    {pos != "GoalKeeper" ? "Shooting" : "gk_reflexes"}
                    <span>
                      {playerRatelink.rank == 0
                        ? 0
                        : pos == "GoalKeeper"
                        ? playerRatelink.gk_reflexes
                        : playerRatelink.shooting}
                    </span>
                  </div>
                  <div className="r_p">
                    {pos != "GoalKeeper" ? "Speed" : "gk_speed"}
                    <span>
                      {playerRatelink.rank == 0
                        ? 0
                        : pos == "GoalKeeper"
                        ? playerRatelink.gk_speed
                        : playerRatelink.pace}
                    </span>
                  </div>
                  {pos == "GoalKeeper" ? (
                    <div className="r_p">
                      gk_kicking
                      <span>
                        {playerRatelink.rank == 0
                          ? 0
                          : pos == "GoalKeeper"
                          ? playerRatelink.gk_kicking
                          : 0}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="rate_footer content">
              <span
                className={"link"}
                onClick={() => {
                  navigate("/playeredit");
                }}
              >
                Edit Profile
              </span>
              <span
                className={"link"}
                onClick={() => {
                  navigate("/history");
                }}
              >
                Back
              </span>
            </div>
            <div className="withdraw">
              {upcoming == 0 ? null : playerId == users.id ? (
                <span
                  className="link"
                  onClick={() => {
                    CancelReservation();
                  }}
                >
                  Cancel Reservation
                </span>
              ) : (
                <span
                  className="link"
                  onClick={() => {
                    WithdrawTeam();
                  }}
                >
                  Withdraw Team
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerReservationn;
