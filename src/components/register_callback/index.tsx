import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { access } from "fs";
import { selectAuth } from "../../redux/store";
import { activeUser, loginUserWithGoogle } from "../../redux/apiRequest";

export default function RegisterCallback() {
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let urlParam = new URLSearchParams(window.location.search);
  let token = urlParam.get("token") || "";
  if (token == "") navigate("/login");
  useEffect(() => {
    console.log(token);
    activeUser(token, dispatch, navigate);
  }, []);

  return <div>RegisterCallback</div>;
}
