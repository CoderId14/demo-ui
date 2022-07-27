import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";

import Login from "./components/login";

import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/register";
import Home from "./components/Home";
import { publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;

            return (
              <Route key={index} path={route.path} element={<Page />}></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
