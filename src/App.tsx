import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { adminRoutes, privateRoutes, publicRoutes } from "@/routes/index";
import { NavbarMain } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
// import PrivateRoutes from "@/routes/PrivateRoutes";
import "./App.scss";
import { useSelector } from "react-redux";
import { selectAuth } from "./redux/store";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import MainLayout from "./layouts/mainLayout";
import AdminLayout from "./layouts/adminLayout";
function App() {
  const user = useSelector(selectAuth).login.user;
  // const navigate = useNavigate();
  return (
    <>
      <Router>
        <div className="app">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <MainLayout>
                      <Page />
                    </MainLayout>
                  }
                ></Route>
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
                      <MainLayout>
                        <Page />
                      </MainLayout>
                    </PrivateRoute>
                  }
                ></Route>
              );
            })}
            {adminRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AdminRoute
                      isAllowed={!!user && user?.roles.includes("ROLE_ADMIN")}
                    >
                      <AdminLayout>
                        <Page />
                      </AdminLayout>
                    </AdminRoute>
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
