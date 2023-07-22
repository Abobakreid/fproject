import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar } from "../../Components";
import PlayerRate from "../../Components/PlayerRate/PlayerRate";
import userone from "../../assets/userone.jpg";
const Join = () => {
  const [load, setLaod] = useState(false);
  const { stad_Id } = useParams();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [tteamMembers, settteamMembers] = useState([]);
  const [tteamId, setteamId] = useState(0);
  const [join, setjoin] = useState(false);
  const navigate = useNavigate();

  const handelCancel = () => {
    navigate("/jointeam", { replace: true });
  };

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
        text: "Rates Radar",
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

  const handelJoin = async () => {
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
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/JoinTeam?playerId=${users.id}&teamId=${tteamId}`,
        {
          method: "POST",
        }
      );
      setLaod(false);
      toast.info("join Done", {
        position: "bottom-right",
      });
      navigate(-1);
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("email exist", {
        position: "bottom-right",
      });
    }
  };

  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Reservation/FindTeam?id=${
          users.id
        }&latitude=${27.1815}&longitude=${31.1867}&distance=${20000}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLaod(false);
        console.log(data);
        let filt = data.filter((item) => {
          return item.teamId == stad_Id;
        });

        console.log(filt, "etyy");

        let filtTeamMembers = filt[0].teamMembers;
        settteamMembers(filt[0].teamMembers);
        console.log(filt[0].teamMembers, "sl");
        setteamId(stad_Id);
      }
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  let showNum = (val) => {
    val.style.display = "none";
    val.previousElementSibling.style.display = "inline-block";
  };

  let hideNum = (val) => {
    val.style.display = "none";
    val.nextElementSibling.style.display = "inline-block";
  };

  useEffect(() => {
    getMyReservations();
  }, []);

  return (
    <div className="join">
      <Navbar
        login={"register"}
        homeplayr={"homeplayr"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      {join ? (
        <div className="qus">
          <div className="qus_con">
            <p>Do you want to Join Team ?</p>
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
      <div className="container c_reserve">
        <div className="players content">
          {tteamMembers
            ? tteamMembers.map((item, index) => {
                return (
                  <div className="p_team" key={index}>
                    <div className="up">
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
                                  data: [0, 0, 0, 0, 0],
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
      </div>
      <div className="join_pl">
        <span
          onClick={() => {
            handelJoin();
          }}
        >
          Join
        </span>
        <span
          onClick={() => {
            handelCancel();
          }}
        >
          cancel
        </span>
      </div>
    </div>
  );
};

export default Join;
