import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, Navbar, StarRate } from "../../Components";
import userdr from "../../assets/stadium.png";
const AddReview = () => {
  const [load, setLaod] = useState(false);
  const [commentt, setComment] = useState("");
  const [stadiumRate, setStadiumRate] = useState(0);
  const navigate = useNavigate();
  const { stad_Id } = useParams();
  const users = JSON.parse(localStorage.getItem("userItem"));
  console.log(stad_Id, "gutmi");
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    let userdata = {
      rate: stadiumRate * 20,
      playerId: users.id,
      teamId: window.location.href.split("?")[1],
      stadiumId: stad_Id,
      comment: commentt,
    };
    if (userdata.rate == 0) {
      toast.info("You Should Rate Stadium", {
        position: "bottom-right",
      });
    } else {
      try {
        setLaod(true);
        const res = await fetch(
          `https://a7gezlyapi.azurewebsites.net/api/Stadium/AddReview`,
          {
            method: "POST",
            body: JSON.stringify(userdata),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        toast.info("Done", {
          position: "bottom-right",
        });
        navigate(`/playerreservation/${window.location.href.split("?")[1]}`, {
          replace: true,
        });
        setLaod(false);
        return false;
      } catch (error) {
        return console.log(error);
      }
    }
    console.log(userdata, "jiy");
  };
  return (
    <div className="add_review">
      <Navbar
        login={"register"}
        registered={"registered"}
        stadiums={"stadium"}
        homeplayr={"homeplayr"}
      />
      {load ? <Loading /> : null}
      <div className="hed">
        <h2>Add Rate and Your review</h2>
      </div>
      <div className="container container_rev content">
        <div className="card">
          <h3>Stadium Rate</h3>
          <img src={userdr} alt="" />
          <div>
            <StarRate setStadiumRate={setStadiumRate} />
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            required
            name="comment"
            id="comment"
            cols="60"
            rows="10"
            value={commentt}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
