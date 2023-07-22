import React, { useEffect } from "react";
import img8 from "../../assets/1.mp4";
import img1 from "../../assets/back.jpg";
import img7 from "../../assets/greenloc.jpg";
import img4 from "../../assets/gym.jpg";
import img0 from "../../assets/pitch.png";
import img6 from "../../assets/ply.jpg";
import img3 from "../../assets/spid.jpg";
import img2 from "../../assets/stadium.png";
import img5 from "../../assets/stm.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { motion } from "framer-motion";

// import required modules
import { NavLink, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../../Components";

const Home = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("userItem"));

  useEffect(() => {
    console.log(img8, "oio");
    if (users) {
      if (users.status) {
        console.log("none");
      } else {
        if (users.playerPosition == undefined) {
          navigate("/ownerhome");
        } else {
          navigate("/playerhome");
        }
      }
    } else {
      console.log(users);
    }
  }, []);

  return (
    <div className="home">
      <Navbar home={"home"} stadiums={"stadium"} />
      <div className="about">
        <div className="about_back"></div>
        <div className="container">
          <div className="row content">
            <div className="a_details">
              <h3 className="head">
                Join The 1.5 Million Athletes Who Play And Learn At A7gezly.
              </h3>
              <p className="a_detail lead">
                A7gezly Is The Platform For Athletes, Allowing You To Book
                Stadiums, Join Academies, And Join Exercises Whether You Are The
                Coordinator Of Your Team To Book The Stadiums, Or You Are An
                Amateur Looking For Someone To Play With, Or Even You Want To
                Train And Learn The Basics And Arts Of Any Sport A7gezly Is An
                Integrated Platform For Sports Fans, From Which You Can View The
                Stadiums In Your City, And You Can Browse On The Map, And Choose
                The Closest And Most Suitable Location To You With Just
                <NavLink to={"#"} className={"a_butn"}>
                  One Click!
                </NavLink>
              </p>
            </div>
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: "0.8" }}
              className="a_img"
            >
              <img src={img0} alt="" />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="services">
        <div className="ser_img">
          <img src={img1} alt="" />
        </div>
        <div className="container">
          <div className="row content">
            <div className="ser_details">
              <div className="rect"></div>
              <div className="detail">
                <h3 className="head">About A7gezly and Services</h3>
                <p className="ser_detail lead">
                  A7gezly Offers Stadiums And Academies Owners Many
                  Distinguished Services, Such As Marketing Them To Hundreds Of
                  Thousands Of Players, And Facilitating All Operational And
                  Administrative Work For Them. Colato Also Contributes To
                  Improving Customer Experience And Providing Them With The
                  Right Options With Ease.
                </p>
              </div>
            </div>
            <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ delay: 0.1, duration: "0.8" }}
              viewport={{ once: true }}
              className="ser_video"
            >
              <video controls>
                <source type="video/mp4" src={img8}></source>
                <source type="video/MIME" src={img8}></source>
              </video>
            </motion.div>
          </div>
        </div>
      </div>
      {/* why */}
      <div className="why">
        <div className="container">
          <div className="row content">
            <div className="why_details">
              <div className="detail">
                <h3 className="head">Why book your stadium from A7gezly?</h3>
                <p className="why_detail lead">
                  A7gezly More Than 400 Stadiums That You Can Choose From,
                  Including The Gospel, The Turabi, The Natural, And The Halls,
                  And Imagine We Have Stadiums With Air Conditioners!
                  Reservation Is Very Flexible And If Any Circumstance Happens
                  To You Or Even You Change Your Mind, You Can Easily Amend Your
                  Reservation.
                </p>
              </div>
            </div>
            <div className="why_features">
              <motion.div
                initial={{ x: -400 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: "0.8" }}
                className="w_feature one"
              >
                <img src={img3} alt="" />
                <h4 className="feature_head">Play with others</h4>
                <p className="feature_paragraph">
                  What Do You Have A Team? You Can Join Matches And Complete
                  Them
                </p>
              </motion.div>
              <motion.div
                initial={{ x: -200 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: "0.8" }}
                className="w_feature two"
              >
                <img src={img4} alt="" />
                <h4 className="feature_head">Build your profile</h4>
                <p className="feature_paragraph">
                  You Sure Are A Great Player A7gezly Helps You Impress People
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 400 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: "0.8" }}
                className="w_feature one"
              >
                <img src={img5} alt="" className="stm_stm" />
                <h4 className="feature_head">Organize your matches easily</h4>
                <p className="feature_paragraph">
                  Set The Time And Place, And Easily Complete The Organization
                  Of Your Matches
                </p>
              </motion.div>
              <motion.div
                initial={{ x: -300 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: "0.8" }}
                className="w_feature two"
              >
                <img src={img2} alt="" />
                <h4 className="feature_head">Add your stadium</h4>
                <p className="feature_paragraph">
                  Add Your Own Stadium For All Players To Join You
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* statistics */}
      <div className="statistics">
        <div className="container">
          <h3 className="statistic_head">Featured Stats</h3>
          <h2 className="state_head">Statistics from A7gezly</h2>
          <div className="row">
            <motion.div
              initial={{ x: 400 }}
              whileInView={{ x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="s_feature"
            >
              <img src={img5} alt="" />
              <h4 className="feature_num">500</h4>
              <p className="feature_title lead">Stadium</p>
            </motion.div>
            <motion.div
              initial={{ x: 200 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: "0.8" }}
              className="s_feature"
            >
              <img src={img7} alt="" />
              <h4 className="feature_num">13</h4>
              <p className="feature_title lead">City ​​In Egypt</p>
            </motion.div>
            <motion.div
              initial={{ x: -300 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: "0.8" }}
              className="s_feature"
            >
              <img src={img6} alt="" />
              <h4 className="feature_num">1500</h4>
              <p className="feature_title lead">Player</p>
            </motion.div>
            <motion.div
              initial={{ x: -400 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: "0.8" }}
              className="s_feature"
            >
              <img src={img2} alt="" />
              <h4 className="feature_num">750</h4>
              <p className="feature_title lead">Owner</p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* have account */}
      <div className="have_account">
        <div className="container">
          <div className="row content">
            <div className="h_account">
              <h2 className="h_head">Do you have a stadium or want to play?</h2>
              <p>
                A7gezly Is Your Best And Easiest Option To Fully Manage Your
                Project, Try Collato For Free!
              </p>
            </div>
            <div className="h_sign">
              <div className="s_btn">
                <NavLink to={"/registerowner"} className={"a_btn one"}>
                  Sign as Owner
                </NavLink>
                <NavLink to={"/register"} className={"a_btn two"}>
                  Sign as Player
                </NavLink>
              </div>
              <div className="h_log">
                <span>OR</span>
                <NavLink to={"/login"} className={"Log_btn"}>
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Home;
