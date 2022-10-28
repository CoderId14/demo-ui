import { NavLink, useNavigate } from "react-router-dom";
import { selectAuth } from "../../redux/store";
import { useSelector } from "react-redux";
import { logOut } from "@/apiRequests/logoutRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Menu } from "antd";
import {
  SettingOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import classNames from "classnames/bind";
import styles from "./Nav.module.scss";
let cx = classNames.bind(styles);
export const NavbarMain = () => {
  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;
  const accessToken = user?.accessToken ? user.accessToken : "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (user) logOut(dispatch, navigate);
  };

  useEffect(() => {
    if (!user) {
    }
  }, []);

  // const handleClick = () => {
  //   useEffect(() => {
  //     if (user) {
  //       alert("You already login");
  //       navigate("/");
  //     }
  //   }, []);
  // }

  return (
    <Menu
      className={cx("container")}
      mode="horizontal"
      defaultSelectedKeys={["home"]}
    >
      <Menu.Item
        key="home"
        icon={<HomeOutlined className={cx("iconSizeLarge")} />}
      >
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.SubMenu
        key="authSubMenu"
        title="User Profile"
        icon={<UserOutlined className={cx("iconSizeLarge")} />}
        className={cx("right-style")}
      >
        {!user && (
          <Menu.Item
            key="login"
            icon={<LoginOutlined className={cx("iconSizeMedium")} />}
          >
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
        )}
        {user && (
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined className={cx("iconSizeMedium")} />}
          >
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </Menu.Item>
        )}

        <Menu.Item
          key="register"
          icon={<UserAddOutlined className={cx("iconSizeMedium")} />}
        >
          <NavLink to="/register">Register</NavLink>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <Navbar.Brand as={Link} to="/">
    //       Home
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         {!user && (
    //           <Nav.Link as={Link} to="/login">
    //             Login
    //           </Nav.Link>
    //         )}

    //         <Nav.Link as={Link} to="/register">
    //           Register
    //         </Nav.Link>
    //         {user && (
    //           <Nav.Link as={Link} to="/" onClick={handleLogout}>
    //             Logout
    //           </Nav.Link>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};
