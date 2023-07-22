import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading, Navbar } from "../../Components";

const StadiumAnalysis = () => {
  const [load, setLaod] = useState(false);
  const { stad_Id } = useParams();
  const [comments, setcomments] = useState([]);

  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/GetStadiumReviews?id=${stad_Id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        setcomments(data);
        console.log(data, "sj");
      }
      setLaod(false);
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  useEffect(() => {
    getMyReservations();
  }, []);

  return (
    <div className="stadium_feedback">
      <Navbar
        login={"register"}
        stadiums={"stadium"}
        homeowner={"homeowner"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      <div className="container content container_com">
        <div className="comments">
          {comments.length > 0 ? (
            comments.map((item) => {
              return (
                <div className="all_comment">
                  {/* <span className="comment_teamId">{item.teamId}</span> */}
                  <span className="comment">{item.comment}</span>
                </div>
              );
            })
          ) : (
            <span className="no_comments">No Comments</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StadiumAnalysis;
