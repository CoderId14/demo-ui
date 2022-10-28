import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { activeUser } from "@/apiRequests/registerRequest";

export default function RegisterCallback() {
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let urlParam = new URLSearchParams(window.location.search);
  let token = urlParam.get("token") || "";
  if (token == "") {
    navigate("/login");
  }
  useEffect(() => {
    console.log(token);
    activeUser(token, dispatch, navigate);
  }, []);

  return <div>RegisterCallback</div>;
}
