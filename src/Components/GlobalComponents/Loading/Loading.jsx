import React from "react";

const Loading = () => {
  return (
    <div className="body_loading">
      <svg viewBox="0 0 960 300">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="80%">
            A7gezly
          </text>
        </symbol>

        <g className="g-ants">
          <use href="#s-text" className="text-copy"></use>
          <use href="#s-text" className="text-copy"></use>
          <use href="#s-text" className="text-copy"></use>
          <use href="#s-text" className="text-copy"></use>
          <use href="#s-text" className="text-copy"></use>
        </g>
      </svg>
    </div>
  );
};

export default Loading;
