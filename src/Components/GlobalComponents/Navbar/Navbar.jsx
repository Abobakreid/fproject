import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowCircleRight,
  faBars,
  faGear,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import brandImg from "./../../../assets/logo.png";
import userone from "./../../../assets/userone.jpg";
const Navbar = ({
  login,
  registered,
  stadiums,
  OwnerHHome,
  home,
  homeplayr,
  homeowner,
}) => {
  const users = JSON.parse(localStorage.getItem("userItem"));
  const [dropDown, setDropDown] = useState(false);
  const [imgsource, setimgsource] = useState("");
  const navigate = useNavigate();
  const [simDropDown, setSimDropDown] = useState(false);
  var lasname;

  if (users) {
    if (users.status) {
      lasname = "none";
    } else {
      lasname = users.name.split("?");
    }
  } else {
    console.log("hello");
  }

  // {
  //   userItem: {
  //     id: 5,
  //     name: "none",
  //     country: "none",
  //     city: "none",
  //     street: "none",
  //     birthdate: "none",
  //     phoneNumber: "none",
  //     email: "none",
  //     password: "none",
  //     stadiums: [],
  //   }
  // }
  useEffect(() => {
    let pl = users ? users.profilePicture : "ss";
    setimgsource(pl);
  }, []);

  const toggleSimDropDown = () => {
    setSimDropDown(!simDropDown);
  };
  // const preventBack = () => {
  //   window.history.forward();
  // };
  // setTimeout("preventBack()", 0);

  const handleLogOut = async () => {
    navigate("/", { replace: true });
    localStorage.removeItem("userItem");
  };
  const handelScroll = () => {
    window.scroll({
      top: window.innerHeight + 2000,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="navbar">
      <div className="container content">
        <div
          className="n_bars"
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          <FontAwesomeIcon icon={faBars} size={"lg"} />
        </div>
        <div className="n_brand">
          <NavLink to={"/"} end>
            <img src={brandImg} alt="brand" />
          </NavLink>
        </div>
        <div className="dropDown" style={{ display: dropDown ? "flex" : "" }}>
          <nav className="n_links">
            {home ? (
              <NavLink to={"/"} end className={"link"}>
                Home
              </NavLink>
            ) : null}
            {homeplayr ? (
              <NavLink to={"/playerhome"} end className={"link"}>
                Home
              </NavLink>
            ) : null}
            {homeowner ? (
              <NavLink to={"/ownerhome"} end className={"link"}>
                Home
              </NavLink>
            ) : null}
            {stadiums ? null : (
              <NavLink to={"/stadiums"} end className={"link"}>
                Stadiums
              </NavLink>
            )}
            <NavLink to={"/about"} end className={"link"}>
              About us
            </NavLink>
            {login ? null : (
              <span
                className={"cra_acc link"}
                onClick={() => {
                  handelScroll();
                }}
              >
                Create account or Sign in
              </span>
            )}
            {registered ? (
              <div className="userProfile">
                {registered ? (
                  <span
                    className="p_icon"
                    onClick={() => {
                      toggleSimDropDown();
                    }}
                  >
                    <img
                      src={
                        imgsource
                          ? `data:image/${
                              "jpeg" || "png" || "jpg"
                            };base64,${imgsource}`
                          : userone
                      }
                      alt=""
                    />
                  </span>
                ) : null}
                <div
                  className="sim_dropDown"
                  style={{ display: simDropDown ? "block" : "none" }}
                >
                  <div className="userProfile_detail">
                    {OwnerHHome ? (
                      <NavLink
                        to={"/profileowner"}
                        className={"userProfile_detail_lin"}
                      >
                        <span>
                          <FontAwesomeIcon icon={faGear} size={"sm"} />
                        </span>
                      </NavLink>
                    ) : (
                      <NavLink
                        to={"/profile"}
                        className={"userProfile_detail_lin"}
                      >
                        <span>
                          <FontAwesomeIcon icon={faGear} size={"sm"} />
                        </span>
                      </NavLink>
                    )}
                    {OwnerHHome ? (
                      <NavLink to={"/profileowner"}>
                        <div className="u_name">
                          <span className="u_name_icon">
                            <FontAwesomeIcon icon={faUser} size={"2x"} />
                          </span>
                          <div className="p_name">
                            <span>{lasname[0] ? lasname[0] : null}</span>
                            <span>{users.email ? users.email : null}</span>
                          </div>
                        </div>
                      </NavLink>
                    ) : (
                      <NavLink to={"/profile"}>
                        <div className="u_name">
                          <span className="u_name_icon">
                            <FontAwesomeIcon icon={faUser} size={"2x"} />
                          </span>
                          <div className="p_name">
                            <span>{lasname[0] ? lasname[0] : null}</span>
                            <span>{users.email ? users.email : null}</span>
                          </div>
                        </div>
                      </NavLink>
                    )}
                  </div>
                  <NavLink to={"/register"} className="add_profile">
                    <div className="add_profile_de">
                      <span className="add_profile_i">
                        <FontAwesomeIcon icon={faUsers} size={"sm"} />
                      </span>
                      <span className="add_profile_n">Add profile</span>
                    </div>
                    <span>
                      <FontAwesomeIcon icon={faArrowCircleRight} size={"sm"} />
                    </span>
                  </NavLink>
                  <span
                    className="log_out"
                    onClick={() => {
                      handleLogOut();
                    }}
                  >
                    logOut
                  </span>
                </div>
              </div>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
