import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectAuth } from "../../redux/store";
import { useEffect } from "react";
import { getAllPosts } from "../../apiRequests/apiRequest";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Props {
  children?: JSX.Element;
}

interface User {
  username: string;
  accessToken: string;
}

const Home = () => {
  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;
  const accessToken = user?.accessToken ? user.accessToken : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <h1>Hello {user && user.username}</h1>
    </>
  );
};

export default Home;
