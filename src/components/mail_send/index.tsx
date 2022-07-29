import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/store";
import { Link } from "react-router-dom";

const MailRedirect = () => {
  const user = useSelector(selectAuth).register.user;
  const email = user.email;

  if (email) {
    return (
      <h1>
        {" "}
        Go to <a href="gmail.com">{email}</a> to verify your account
      </h1>
    );
  } else {
    return (
      <h1>
        {" "}
        Go back to <Link to="/login">Login</Link>
      </h1>
    );
  }
};

export default MailRedirect;
