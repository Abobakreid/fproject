import { Rating } from "@mui/material";
import React, { useState } from "react";

import Stack from "@mui/material/Stack";

const StarRate = ({
  setSpeed,
  setDefending,
  setPassing,
  setShooting,
  setDribbling,
  setHandling,
  setKicking,
  setReflexes,
  setSpeedgoal,
  setDiving,
  setPositioning,
  setStadiumRate,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  console.log(rating);
  const handelfun = (val) => {
    setRating(val);
    if (setSpeed !== undefined) {
      setSpeed(val);
    } else if (setDefending !== undefined) {
      setDefending(val);
    } else if (setPassing !== undefined) {
      setPassing(val);
    } else if (setShooting !== undefined) {
      setShooting(val);
    } else if (setDribbling !== undefined) {
      setDribbling(val);
    } else if (setHandling !== undefined) {
      setHandling(val);
    } else if (setKicking !== undefined) {
      setKicking(val);
    } else if (setReflexes !== undefined) {
      setReflexes(val);
    } else if (setSpeedgoal !== undefined) {
      setSpeedgoal(val);
    } else if (setDiving !== undefined) {
      setDiving(val);
    } else if (setPositioning !== undefined) {
      setPositioning(val);
    } else if (setStadiumRate !== undefined) {
      setStadiumRate(val);
    }
  };
  const rate = (val) => {
    handelfun(val);
  };

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        precision={0.1}
        onChange={(event, newValue) => {
          rate(newValue);
        }}
      />
    </Stack>
  );
};

export default StarRate;
