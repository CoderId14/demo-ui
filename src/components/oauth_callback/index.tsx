import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { access } from "fs";
import { selectAuth } from "@/redux/store";
import { loginUserWithGoogle } from "@/apiRequests/loginRequest";

export default function GoogleCallBack() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let urlParam = new URLSearchParams(window.location.search);

  useEffect(() => {
    let token = urlParam.get("token") ? urlParam.get("token") : "";
    console.log(token);
    loginUserWithGoogle(token, dispatch, navigate);
  }, []);

  return <div>GoogleCallBack</div>;
}
