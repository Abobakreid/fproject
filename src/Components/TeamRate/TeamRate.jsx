import React, { useEffect, useState } from "react";

const TeamRate = ({ plyrate }) => {
  const [tteamMembers, settteamMembers] = useState("");

  useEffect(() => {
    let circularProgress = document.getElementById("progress");

    let progressStartValue = 0;
    let progressEndValue = Math.floor(plyrate);
    console.log(progressEndValue, "Abobakr");
    let speed = 100;

    let progress = setInterval(() => {
      console.log("hshshs");
      if (plyrate !== 0) {
        progressStartValue++;
        if (progressStartValue == progressEndValue) {
          clearInterval(progress);
          settteamMembers(plyrate);
        } else {
          settteamMembers(progressStartValue);
          circularProgress.style.background = `conic-gradient(#78feb5 ${
            progressStartValue * 3.6
          }deg, white 0deg)`;
        }
      } else {
        clearInterval(progress);
      }
    }, speed);
  }, [plyrate]);

  return (
    <div className="circular_container">
      <div className="circular-progress" id="progress">
        <span className="progress-value">
          {plyrate == 0 ? "0" : tteamMembers}%
        </span>
      </div>
    </div>
  );
};

export default TeamRate;
