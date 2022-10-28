import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space, Tag } from "antd";
import React, { Children, useEffect, useState } from "react";

import styles from "./adminLayout.module.scss";

import classNames from "classnames/bind";
import { logOut } from "@/apiRequests/logoutRequest";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectAuth } from "@/redux/store";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { NavbarMain } from "@/components/Navbar";
import Table, { ColumnsType, TableProps } from "antd/lib/table";
import Sider from "@/components/sider";
import { getAllRacers } from "../../apiRequests/f1/racerRequest";
import axiosInstance from "@/config/axios";
import { Button } from "react-bootstrap";
import { AppConst } from "@/app-const";
let cx = classNames.bind(styles);
const { Header, Content } = Layout;

interface Props {
  items?: ItemType[] | undefined;
  children?: JSX.Element[] | JSX.Element;
}

function AdminLayout(props: Props) {
  const [collapsed, setCollapsed] = useState(false);
  console.log("admin re render");
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Quản Lý",
      children: [
        {
          key: "sub-1",
          label: (
            <NavLink to={AppConst.HOME_ADMIN_URL}>Quản Lý Tay Đua </NavLink>
          ),
        },
        {
          key: "sub-2",
          label: (
            <NavLink to={AppConst.HOME_ADMIN_URL}>Quản Lý Chặng Đua </NavLink>
          ),
        },
      ],
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "nav 2",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: "Bảng Xếp Hạng",
      children: [
        {
          key: "sub-4",
          label: (
            <NavLink to={AppConst.RACER_RANKING_URL}>BXH Tay Đua </NavLink>
          ),
        },
      ],
    },
  ];
  return (
    <Layout>
      <Sider items={items} collapsed={collapsed}></Sider>
      <Layout className={cx("site-layout")}>
        <Header className={cx("site-layout-background")} style={{ padding: 0 }}>
          <NavbarMain isHiddenHomeLogo={true}></NavbarMain>

          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            },
          )}
        </Header>
        <Content
          className={cx("site-layout-background")}
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
