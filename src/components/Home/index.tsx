import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { selectAuth } from "../../redux/authSlice";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props {
  children?: JSX.Element;
}

interface User {
  username: string;
  accessToken: string;
}

const Home = () => {
  const user: User = useSelector(
    (state): RootState => state.auth.login?.currentUser,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getAllPosts(user.accessToken, dispatch);
  });

  return (
    <div>
      <h1> Home </h1>
      {/* <h2>
        {" "}
        Hi , <span> {user && user.username} </span>
      </h2> */}
    </div>
  );
};

export default Home;
