import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { privateRoutes, publicRoutes } from "@/routes/index";
import { NavbarMain } from "@/components/navbar";
import { ToastContainer } from "react-toastify";
// import PrivateRoutes from "@/routes/PrivateRoutes";
import "./App.scss";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/store";
import PrivateRoute from "./routes/PrivateRoute";
function App() {
  const user = useSelector(selectAuth).login.user;
  // const navigate = useNavigate();
  return (
    <>
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
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute isAllowed={!!user}>
                      <Page />
                    </PrivateRoute>
                  }
                ></Route>
              );
            })}
          </Routes>
        </div>
      </Router>
      <div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
}

export default App;
