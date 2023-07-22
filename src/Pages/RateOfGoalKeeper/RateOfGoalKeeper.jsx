import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar, StarRate } from "../../Components";
import back from "../../assets/back.jpg";
import userdi from "../../assets/diving.png";
import userh from "../../assets/handling.png";
import userpo from "../../assets/positioning.png";
import userre from "../../assets/reflexes.png";
import userds from "../../assets/shooting.png";
import usersp from "../../assets/speed.png";
import userImg from "../../assets/usera.png";

const RateOfGoalKeeper = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const { stad_Id } = useParams();
  const navigate = useNavigate();
  const [rateVal, setrateVal] = useState(0);
  const [handling, setHandling] = useState(0);
  const [kicking, setKicking] = useState(0);
  const [reflexes, setReflexes] = useState(0);
  const [speedgoal, setSpeedgoal] = useState(0);
  const [diving, setDiving] = useState(0);
  const [temId, setTemId] = useState(0);
  const [positioning, setPositioning] = useState(0);
  const [playerRatelink, setplayerRatelink] = useState({});
  const [registerPlayer, setregisterPlayer] = useState([]);
  const [load, setLaod] = useState(false);
  console.log(handling, "handling");
  console.log(kicking, "kicking");
  console.log(reflexes, "reflexes");
  console.log(speedgoal, "speedgoal");
  console.log(diving, "diving");
  console.log(positioning, "positioning");

  const handelFinish = async () => {
    const userdata = {
      gk_handling: handling * 20,
      gk_kicking: kicking * 20,
      gk_reflexes: reflexes * 20,
      gk_speed: speedgoal * 20,
      gk_diving: diving * 20,
      gk_positioning: positioning * 20,
    };
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/AddGKRate?teamId=${
          window.location.href.split("?")[1]
        }&whoRateId=${users.id}&playerId=${stad_Id}`,
        {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then(() => {
        setLaod(false);
        navigate(-1);
        toast.dismiss();
        toast.info("Welcome Back", {
          position: "bottom-right",
        });
      });
    } catch (error) {
      setLaod(false);
      toast.dismiss();
      toast.info("there is problem", {
        position: "bottom-right",
      });
    }
  };

  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/MatchDetails?id=${stad_Id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setLaod(false);
        console.log(data);
        let filtTeamMembers = data[0].matchDetails[0].teamMembers;
        let filtByemail = filtTeamMembers.filter((mem) => {
          return mem.id == stad_Id;
        });
        setTemId(data[0].matchDetails[0].teamId);
        setregisterPlayer(filtByemail);
        console.log(filtByemail, "abo");
      }
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
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
        `https://a7gezlyapi.azurewebsites.net/api/Player/GetPlayerData?id=${stad_Id}`,
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

  useEffect(() => {
    getMyReservations();
    getMyReservations2();
  }, []);
  return (
    <div className="rate_of_goalkeeper">
      <Navbar
        login={"register"}
        homeplayr={"homeplayr"}
        stadiums={"stadium"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      <img src={back} alt="" className="playerhome_img" />
      <div className="container res_container">
        <div className="row content">
          <div className="rate_cont">
            <div className="players">
              <div className="card">
                <h3>handling</h3>
                <img src={userh} alt="" />
                <div>
                  <StarRate setHandling={setHandling} />
                </div>
              </div>
              <div className="card">
                <h3>kicking</h3>
                <img src={userds} alt="" />
                <div>
                  <StarRate setKicking={setKicking} />
                </div>
              </div>
              <div className="card">
                <h3>reflexes</h3>
                <img src={userre} alt="" />
                <div>
                  <StarRate setReflexes={setReflexes} />
                </div>
              </div>
              <div className="card">
                <h3>speed</h3>
                <img src={usersp} alt="" />
                <div>
                  <StarRate setSpeedgoal={setSpeedgoal} />
                </div>
              </div>
              <div className="card">
                <h3>diving</h3>
                <img src={userdi} alt="" />
                <div>
                  <StarRate setDiving={setDiving} />
                </div>
              </div>
              <div className="card">
                <h3>positioning</h3>
                <img src={userpo} alt="" />
                <div>
                  <StarRate setPositioning={setPositioning} />
                </div>
              </div>
            </div>
            <div className="finish">
              <span
                onClick={() => {
                  handelFinish();
                }}
              >
                Finish
              </span>
            </div>
          </div>
          <div className="total_rate">
            {registerPlayer
              ? registerPlayer.map((item, index) => {
                  return (
                    <div className="p_data" key={index}>
                      <span className="p_po">
                        {item.position == 3 ? (
                          <div className="user_data">GoalKeeper</div>
                        ) : null}
                        {item.position == 0 ? (
                          <div className="user_data">Defender</div>
                        ) : null}
                        {item.position == 2 ? (
                          <div className="user_data">Center</div>
                        ) : null}
                        {item.position == -1 ? (
                          <div className="user_data">Striker</div>
                        ) : null}
                      </span>
                      <div className="p_dat content">
                        <div className="p_info">
                          <h3>
                            {item.name.split("?")[0] +
                              " " +
                              item.name.split("?")[1]}
                          </h3>
                          <div className="p_em">{item.playerEmail}</div>
                        </div>
                        <div className="p_img">
                          <img src={userImg} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}

            <div className="t_rate">
              <h2> Total Rate:</h2>
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
                    gk_diving
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.gk_diving}
                    </span>
                  </div>
                  <div className="r_p">
                    gk_handling
                    <span>
                      {playerRatelink.rank == 0
                        ? 0
                        : playerRatelink.gk_handling}
                    </span>
                  </div>
                  <div className="r_p">
                    gk_reflexes
                    <span>
                      {playerRatelink.rank == 0
                        ? 0
                        : playerRatelink.gk_reflexes}
                    </span>
                  </div>
                  <div className="r_p">
                    gk_speed
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.gk_speed}
                    </span>
                  </div>
                  <div className="r_p">
                    gk_kicking
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.gk_kicking}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rate_footer content">
              <NavLink to={"/"} className={"link"}>
                Edit Profile
              </NavLink>
              <NavLink to={"/s"} className={"link"}>
                Back
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateOfGoalKeeper;
