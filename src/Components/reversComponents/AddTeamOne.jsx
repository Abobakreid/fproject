import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import img6 from "../../assets/usera.png";
const AddTeamOne = ({ items }) => {
  console.log(items, "test");
  return (
    <>
      <div className="all_teamss">
        <div className="player__info_head">
          <span className="ply_positon">TeamTwo</span>
        </div>
        <div className="all_plyerr">
          {items.length > 0
            ? items.map((item, index) => {
                return (
                  <div className="plr__info" key={index}>
                    <span>
                      <img src={img6} alt="" />
                    </span>
                    <span>
                      {item.name.split("?")[0] + " "}
                      {!item.name.split("?")[1] ||
                      item.name.split("?")[1] == "undefined"
                        ? null
                        : item.name.split("?")[1]}
                    </span>
                    <span>CGK</span>
                    <span style={{ cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faXmark} size="lg" />
                    </span>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default AddTeamOne;
