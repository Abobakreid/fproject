import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Loading, Navbar } from "../../Components";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/dis.png";
import img0 from "../../assets/rating.png";
//import grass from "../../assets/grass.jpg";

const Stadiums = () => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const imge_list = [img0, img2, img1];
  const [stadiums, setStadiums] = useState([]);
  const [load, setLaod] = useState(false);
  const getMyStadiums = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Owner/getStadiums?id=${users.id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setStadiums(data);
      if (data) {
        setLaod(false);
      }
      console.log(data, "jjjjjj");
      return data;
    } catch (error) {
      setLaod(false);
      console.log(error, "jjjjjj");
      return console.log(error);
    }
  };
  useEffect(() => {
    getMyStadiums();
    // Math.floor(Math.random() * imge_list.length)
  }, []);

  return (
    <div className="stadiums">
      <Navbar
        login={"/ownerprofile"}
        stadiums={"stadium"}
        registered={"registered"}
        homeowner={"homeowner"}
      />
      {load ? <Loading /> : null}
      <div className="container stadium_row">
        <div className="row">
          {stadiums
            ? stadiums.map((stadium, index) => {
                return (
                  <div className="stadium" key={index}>
                    <NavLink to={`/ownerstadiumdetail/${stadium.id}`}>
                      <img src={img1} alt="" />
                    </NavLink>

                    <div className="edit">
                      <NavLink to={`/editstadium/${stadium.id}`}>Edit</NavLink>
                    </div>
                    <div className="stars">
                      {stadium.status ? (
                        <span className="active">Active</span>
                      ) : (
                        <span className="pending ">Pending</span>
                      )}
                    </div>
                    <div className="detail">
                      <div className="rate">
                        <h3>{stadium.name}</h3>
                      </div>
                      <div className="position">
                        <div className="location">
                          <span className="icon">
                            <FontAwesomeIcon icon={faLocationDot} />
                          </span>
                          {stadium.location}
                        </div>
                        <div className="time">
                          <span className="icon">
                            <FontAwesomeIcon icon={faClock} />
                          </span>
                          From
                          {"  " + Number(stadium.start) <= 12
                            ? "  " + Number(stadium.start) + " AM "
                            : "  " + Number(stadium.start) + " PM "}
                          To Stadium
                          {"  " + Number(stadium.end) <= 12
                            ? "  " + Number(stadium.end) + " AM "
                            : "  " + Number(stadium.end) + " PM "}
                        </div>
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

export default Stadiums;
