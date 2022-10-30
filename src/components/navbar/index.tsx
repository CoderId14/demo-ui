import { NavLink, useNavigate } from "react-router-dom";
import { selectAuth } from "../../redux/store";
import { useSelector } from "react-redux";
import { logOut } from "@/apiRequests/logoutRequest";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Avatar, Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import classNames from "classnames/bind";
import styles from "./Nav.module.scss";
import { AppConst } from "@/app-const";

let cx = classNames.bind(styles);

interface Props {
  isHiddenHomeLogo?: boolean;
}
export const NavbarMain = (props: Props) => {
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
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const menuItems = [
    getItem("Bang Xep Hang", "5", <UploadOutlined />, [
      getItem("BXH tay dua", "8"),
    ]),
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Bảng Xếp Hạng",
      children: [
        {
          key: "9",
          label: (
            <NavLink to={AppConst.RACER_RANKING_URL}>BXH Tay Đua </NavLink>
          ),
        },
      ],
    },
    getItem(
      <NavLink to="/">Home</NavLink>,
      "13",
      <HomeOutlined className={cx("iconSizeMedium")} />,
    ),
    getItem(
      "User Profile",
      "10",
      <Avatar icon={<UserOutlined className={cx("iconSizeMedium")} />} />,
      [
        getItem(
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>,
          "11",
          <LogoutOutlined className={cx("iconSizeMedium")} />,
        ),
        getItem(
          <NavLink to={AppConst.LOGIN_URL}>Login</NavLink>,
          "12",
          <LoginOutlined className={cx("iconSizeMedium")} />,
        ),
      ],
    ),
  ];

  console.log("menu items: " + menuItems);
  return (
    // <Menu
    //   className={cx("container")}
    //   mode="horizontal"
    //   defaultSelectedKeys={["home"]}
    //   items={menuItems}
    // ></Menu>
    <Menu
      className={cx("container")}
      mode="horizontal"
      defaultSelectedKeys={["home"]}
    >
      <Menu.Item
        key="home"
        icon={<HomeOutlined className={cx("iconSizeMedium")} />}
        hidden={props.isHiddenHomeLogo}
      >
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      {!user?.roles.includes("ROLE_ADMIN") && (
        <Menu.SubMenu
          key="bxh"
          title="Bang Xep Hang"
          icon={<UploadOutlined className={cx("iconSizeMedium")} />}
        >
          <Menu.Item
            key="bxh tay dua"
            icon={<UploadOutlined className={cx("iconSizeMedium")} />}
          >
            <NavLink to={AppConst.RACER_RANKING_URL}>BXH Tay Dua</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      )}

      <Menu.SubMenu
        key="authSubMenu"
        title="User Profile"
        icon={
          <Avatar>
            <UserOutlined className={cx("iconSizeMedium")} />
          </Avatar>
        }
        className={cx("right-style")}
      >
        {!user && (
          <Menu.Item
            key="login"
            icon={<LoginOutlined className={cx("iconSizeMedium")} />}
          >
            <NavLink to={AppConst.LOGIN_URL}> Login </NavLink>
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
  );
};
