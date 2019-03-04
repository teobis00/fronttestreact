import React from "react";

const Sigma = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32"
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g id="sum-sign" transform="translate(-33.329)">
      <path
        fill={fill}
        d="M51.449,4.855V2.769H37.892l7.978,8.58a1.386,1.386,0,0,1-.016,1.9l-7.888,8.2H51.449V20.2a1.385,1.385,0,0,1,2.769,0V22.84a1.387,1.387,0,0,1-1.385,1.385H34.714a1.385,1.385,0,0,1-1-2.344l9.235-9.6L33.7,2.327A1.385,1.385,0,0,1,34.714,0h18.12a1.387,1.387,0,0,1,1.385,1.385v3.47a1.385,1.385,0,0,1-2.769,0Z"
      />
    </g>
  </svg>
);

export default Sigma;