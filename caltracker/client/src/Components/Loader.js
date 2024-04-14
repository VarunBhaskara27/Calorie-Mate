import React from "react";
import { Spinner } from "react-bootstrap";

//Code from https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/components/Loader.js

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
