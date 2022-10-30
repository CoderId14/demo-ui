import { Spin } from "antd";
import classNames from "classnames/bind";
import styles from "./preLoad.module.scss";

let cx = classNames.bind(styles);

const PreLoad: React.FC = () => (
  <div className={cx("example")}>
    <Spin />
  </div>
);

export default PreLoad;
