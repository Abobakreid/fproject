import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar, StarRate } from "../../Components";
import back from "../../assets/back.jpg";
import userd from "../../assets/defending.png";
import userdr from "../../assets/dribbling.png";
import userp from "../../assets/passing.png";
import usersh from "../../assets/shooting.png";
import usersp from "../../assets/speed.png";
import userone from "../../assets/userone.jpg";

const RateOfPlayer = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const { stad_Id } = useParams();
  const navigate = useNavigate();
  const [rateVal, setrateVal] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [defending, setDefending] = useState(0);
  const [passing, setPassing] = useState(0);
  const [shooting, setShooting] = useState(0);
  const [dribbling, setDribbling] = useState(0);
  const [temId, setTemId] = useState(0);
  const [playerRatelink, setplayerRatelink] = useState({});
  const [registerPlayer, setregisterPlayer] = useState([]);
  const [load, setLaod] = useState(false);
  console.log(speed, "speedafter");
  console.log(defending, "defendingafter");
  console.log(passing, "passingafter");
  console.log(shooting, "shootingafter");
  console.log(dribbling, "dribblingafter");
  console.log(window.location.href.split("?")[1], "kor");
  console.log(stad_Id, "kor");
  const handelFinish = async () => {
    const userdata = {
      pace: speed * 20,
      defending: defending * 20,
      passing: passing * 20,
      shooting: shooting * 20,
      dribbling: dribbling * 20,
    };
    console.log(userdata, "ssll");
    console.log(temId, users.id, stad_Id, "stad_Id");
    try {
      setLaod(true);
      console.log(
        `https://a7gezlyapi.azurewebsites.net/api/Player/AddPlayerRate?teamId=${
          window.location.href.split("?")[1]
        }&whoRateId=${users.id}&playerId=${stad_Id}`
      );
      await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Player/AddPlayerRate?teamId=${
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
        toast.info("Rate Added", {
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
        console.log(data, "abop");
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
    <div className="rate_of_player">
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
                <h3>Speed</h3>
                <img src={usersp} alt="" />
                <div>
                  <StarRate setSpeed={setSpeed} />
                </div>
              </div>
              <div className="card">
                <h3>defending</h3>
                <img src={userd} alt="" />
                <div>
                  <StarRate setDefending={setDefending} />
                </div>
              </div>
              <div className="card">
                <h3>passing</h3>
                <img src={userp} alt="" />
                <div>
                  <StarRate setPassing={setPassing} />
                </div>
              </div>
              <div className="card">
                <h3>shooting</h3>
                <img src={usersh} alt="" />
                <div>
                  <StarRate setShooting={setShooting} />
                </div>
              </div>
              <div className="card">
                <h3>dribbling</h3>
                <img src={userdr} alt="" />
                <div>
                  <StarRate setDribbling={setDribbling} />
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
                    Defending
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.defending}
                    </span>
                  </div>
                  <div className="r_p">
                    Dribbling
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.dribbling}
                    </span>
                  </div>
                  <div className="r_p">
                    Shooting
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.shooting}
                    </span>
                  </div>
                  <div className="r_p">
                    Speed
                    <span>
                      {playerRatelink.rank == 0 ? 0 : playerRatelink.pace}
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

export default RateOfPlayer;
