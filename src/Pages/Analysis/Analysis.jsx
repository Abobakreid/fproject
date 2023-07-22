import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Loading, Navbar } from "../../Components";

const Analysis = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [load, setLaod] = useState(false);
  const [playerRatelink, setplayerRatelink] = useState({});
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
  const [statelo, setstatelo] = useState({
    series: [76, 67, 61, 90, 0],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Speed", "Dribbling", "Passing", "Defending", "Shooting"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  });

  const [radar, setRadar] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    series: [],
  });

  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/GetPlayerData?id=${users.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setplayerRatelink(data);
        console.log(data, "hhhhhhhhh");
        if (data.playerData.rank == 0) {
          if (data.playerPosition == 3) {
            setstatelo({
              series: [0, 0, 0, 0, 0, 0],
              options: {
                chart: {
                  height: 390,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                      margin: 5,
                      size: "30%",
                      background: "transparent",
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      },
                    },
                  },
                },
                colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
                labels: [
                  "gk_diving",
                  "gk_handling",
                  "gk_kicking",
                  "gk_positioning",
                  "gk_reflexes",
                  "gk_speed",
                ],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: "16px",
                  position: "left",
                  offsetX: 160,
                  offsetY: 15,
                  labels: {
                    useSeriesColors: true,
                  },
                  markers: {
                    size: 0,
                  },
                  formatter: function (seriesName, opts) {
                    return (
                      seriesName +
                      ":  " +
                      opts.w.globals.series[opts.seriesIndex]
                    );
                  },
                  itemMargin: {
                    vertical: 3,
                  },
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        show: false,
                      },
                    },
                  },
                ],
              },
            });
          } else {
            setstatelo({
              series: [0, 0, 0, 0, 0],
              options: {
                chart: {
                  height: 390,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                      margin: 5,
                      size: "30%",
                      background: "transparent",
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      },
                    },
                  },
                },
                colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
                labels: [
                  "Speed",
                  "Dribbling",
                  "Passing",
                  "Defending",
                  "Shooting",
                ],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: "16px",
                  position: "left",
                  offsetX: 160,
                  offsetY: 15,
                  labels: {
                    useSeriesColors: true,
                  },
                  markers: {
                    size: 0,
                  },
                  formatter: function (seriesName, opts) {
                    return (
                      seriesName +
                      ":  " +
                      opts.w.globals.series[opts.seriesIndex]
                    );
                  },
                  itemMargin: {
                    vertical: 3,
                  },
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        show: false,
                      },
                    },
                  },
                ],
              },
            });
          }
        } else {
          if (data.playerPosition == 3) {
            setstatelo({
              series: [
                data.playerData.gk_diving,
                data.playerData.gk_handling,
                data.playerData.gk_kicking,
                data.playerData.gk_positioning,
                data.playerData.gk_reflexes,
                data.playerData.gk_speed,
              ],
              options: {
                chart: {
                  height: 390,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                      margin: 5,
                      size: "30%",
                      background: "transparent",
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      },
                    },
                  },
                },
                colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
                labels: [
                  "gk_diving",
                  "gk_handling",
                  "gk_kicking",
                  "gk_positioning",
                  "gk_reflexes",
                  "gk_speed",
                ],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: "16px",
                  position: "left",
                  offsetX: 160,
                  offsetY: 15,
                  labels: {
                    useSeriesColors: true,
                  },
                  markers: {
                    size: 0,
                  },
                  formatter: function (seriesName, opts) {
                    return (
                      seriesName +
                      ":  " +
                      opts.w.globals.series[opts.seriesIndex]
                    );
                  },
                  itemMargin: {
                    vertical: 3,
                  },
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        show: false,
                      },
                    },
                  },
                ],
              },
            });
          } else {
            setstatelo({
              series: [
                data.playerData.pace,
                data.playerData.dribbling,
                data.playerData.passing,
                data.playerData.defending,
                data.playerData.shooting,
              ],
              options: {
                chart: {
                  height: 390,
                  type: "radialBar",
                },
                plotOptions: {
                  radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                      margin: 5,
                      size: "30%",
                      background: "transparent",
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      },
                    },
                  },
                },
                colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
                labels: [
                  "Speed",
                  "Dribbling",
                  "Passing",
                  "Defending",
                  "Shooting",
                ],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: "16px",
                  position: "left",
                  offsetX: 160,
                  offsetY: 15,
                  labels: {
                    useSeriesColors: true,
                  },
                  markers: {
                    size: 0,
                  },
                  formatter: function (seriesName, opts) {
                    return (
                      seriesName +
                      ":  " +
                      opts.w.globals.series[opts.seriesIndex]
                    );
                  },
                  itemMargin: {
                    vertical: 3,
                  },
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        show: false,
                      },
                    },
                  },
                ],
              },
            });
          }
        }
      }
      setLaod(false);
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  const getMyReservations2 = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/GetPlayerAnalysis?id=${users.id}`,
        {
          method: "GET",
        }
      );
      const datal = await res.json();
      if (datal) {
        setplayerRatelink(datal);
        console.log(datal, "hhhhhhhhh2");
        if (pos == "GoalKeeper") {
          setRadar({
            options: {
              chart: {
                id: "basic-bar",
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm",
                },
              },
            },
            series: [
              {
                name: "rank",
                data: datal.rank,
              },
              {
                name: "handling",
                data: datal.handling,
              },
              {
                name: "kicking",
                data: datal.kicking,
              },
              {
                name: "diving",
                data: datal.diving,
              },
              {
                name: "reflexes",
                data: datal.reflexes,
              },
              {
                name: "positioning",
                data: datal.positioning,
              },
              {
                name: "speed",
                data: datal.speed,
              },
            ],
          });
        } else {
          setRadar({
            options: {
              chart: {
                id: "basic-bar",
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "smooth",
              },
              tooltip: {
                x: {
                  format: "dd/MM/yy HH:mm",
                },
              },
            },
            series: [
              {
                name: "Rank",
                data: datal.rank,
              },
              {
                name: "passing",
                data: datal.passing,
              },
              {
                name: "dribbling",
                data: datal.dribbling,
              },
              {
                name: "shooting",
                data: datal.shooting,
              },
              {
                name: "speed",
                data: datal.speed,
              },
              {
                name: "defending",
                data: datal.defending,
              },
            ],
          });
        }
      }
      setLaod(false);
      return datal;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  useEffect(() => {
    getMyReservations();
    getMyReservations2();
  }, []);
  return (
    <div className="analysis">
      <Navbar
        login={"register"}
        registered={"registered"}
        stadiums={"stadium"}
        homeplayr={"homeplayr"}
      />
      {load ? <Loading /> : null}
      <div className="container analysis_cont">
        <Chart
          options={statelo.options}
          series={statelo.series}
          height="400"
          type="radialBar"
          width="50%"
        />
        <h1>Analysis oF Player Data</h1>
        <Chart
          options={radar.options}
          series={radar.series}
          height={350}
          type="area"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Analysis;
