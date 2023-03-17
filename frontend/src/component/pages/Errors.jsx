import React from "react";

const Errors = ({ error = "" }) => {
  return (
    <p className="text-center fs-3 my-5 text-dark">
      {error ? error : "This Feature Comming Soon"}
    </p>
  );
};

export default Errors;
