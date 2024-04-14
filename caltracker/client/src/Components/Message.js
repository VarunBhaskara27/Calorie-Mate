import React from "react";
import { Alert } from "react-bootstrap";

//Code from https://github.com/bradtraversy/proshop_mern/blob/master/frontend/src/components/Message.js

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
