import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div className="my-3" style={{ display: "flex", justifyContent: "center" }}>
      <img src={spinner} alt="spinner" />
    </div>
  );
};
export default Spinner;
