import React, { useEffect } from "react";

const Notification = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timer);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Notification;
