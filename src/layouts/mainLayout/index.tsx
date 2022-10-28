import { NavbarMain } from "@/components/Navbar";

import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

function MainLayout(props: Props) {
  return (
    <Layout>
      <NavbarMain></NavbarMain>
      <Layout>
        <Content>{props.children}</Content>
      </Layout>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        footer
      </Footer>
    </Layout>
  );
}

export default MainLayout;
