import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { Loading, Navbar } from "../../Components";
import PlayerRate from "../../Components/PlayerRate/PlayerRate";
import userone from "../../assets/userone.jpg";

const DetailTeam = () => {
  const [load, setLaod] = useState(false);
  const { stad_Id } = useParams();
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [tteamMembersone, settteamMembersone] = useState([]);
  const [tteamMembersTwo, settteamMembersTwo] = useState([]);
  const [chosseTeam, setchosseTeam] = useState("one");
  const [tteamId, setteamId] = useState(0);

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

  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/GetTeams?id=${stad_Id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLaod(false);
        settteamMembersone(data[0]);
        settteamMembersTwo(data[1]);
        console.log(data, "uio");
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

  console.log(chosseTeam);
  return (
    <div className="detail_team">
      <Navbar
        login={"register"}
        homeplayr={"homeplayr"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      <div className="container c_reserve">
        <span>Select Team</span>:
        <select
          name="oneTwo"
          id="slect"
          value={chosseTeam}
          onChange={(e) => {
            setchosseTeam(e.target.value);
          }}
        >
          <option value="one">Team One</option>
          <option value="Two">Team Two</option>
        </select>
        <div className="players content">
          {chosseTeam == "one"
            ? tteamMembersone.map((item, index) => {
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
                          {item.playerPosition == 3 ? (
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
                                    item.playerPosition == 3
                                      ? "GoalKeeper"
                                      : item.playerPosition == 0
                                      ? "Defender"
                                      : item.playerPosition == 2
                                      ? "Center"
                                      : item.playerPosition == -1
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
                      ) : item.playerPosition == 3 ? (
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
                                item.playerPosition == 3
                                  ? "GoalKeeper"
                                  : item.playerPosition == 0
                                  ? "Defender"
                                  : item.playerPosition == 2
                                  ? "Center"
                                  : item.playerPosition == -1
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
            : tteamMembersTwo.map((item, index) => {
                return (
                  <div className="p_team" key={index}>
                    <div className="up">
                      {item.playerPosition == 3 ? (
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
                      ) : (
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
                          {item.playerPosition == 3 ? (
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
                                    item.playerPosition == 3
                                      ? "GoalKeeper"
                                      : item.playerPosition == 0
                                      ? "Defender"
                                      : item.playerPosition == 2
                                      ? "Center"
                                      : item.playerPosition == -1
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
                      ) : item.playerPosition == 3 ? (
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
                                item.playerPosition == 3
                                  ? "GoalKeeper"
                                  : item.playerPosition == 0
                                  ? "Defender"
                                  : item.playerPosition == 2
                                  ? "Center"
                                  : item.playerPosition == -1
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
              })}
        </div>
      </div>
    </div>
  );
};

export default DetailTeam;
