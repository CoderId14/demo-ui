import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import logo from "./logo.svg";

import Login from "./components/login";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/register";
import Home from "./components/Home";
import { privateRoutes, publicRoutes } from "./routes/index";
import { NavbarMain } from "./components/navbar";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/store";
// import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  // const user = useSelector(selectAuth).login.user;
  // const navigate = useNavigate();
  return (
    <Router>
      <div className="app">
        <NavbarMain></NavbarMain>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />}></Route>
            );
          })}
          {/* <Route element={<PrivateRoutes />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route key={index} path={route.path} element={<Page />}></Route>
              );
            })}
          </Route> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
