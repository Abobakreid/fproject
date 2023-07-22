import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
const PlayerRate = ({ plrRate }) => {
  const [playerRate, setplayerRate] = useState("");

  useEffect(() => {
    let progressStartValue = 0,
      progressEndValue = Math.floor(plrRate),
      speed = 1;

    let progress = setInterval(() => {
      if (progressEndValue != 0) {
        progressStartValue++;
        setplayerRate(progressStartValue);
        if (progressStartValue == progressEndValue) {
          clearInterval(progress);
          setplayerRate(plrRate);
        } else {
          setplayerRate(progressStartValue);
        }
      } else {
        clearInterval(progress);
      }
    }, speed);
  }, [Math.floor(plrRate)]);

  return (
    <div className="Load_container">
      <div className="bak">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.floor(plrRate)}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: "0.5" }}
          className="line"
        ></motion.div>
      </div>
      {plrRate == 0 ? "0" : playerRate}%
    </div>
  );
};

export default PlayerRate;
