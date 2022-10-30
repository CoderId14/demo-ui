import axiosInstance from "@/config/axios";
import { Button, Form, Popconfirm, Table, TableProps } from "antd";
import { useState, useEffect } from "react";
import { EditableCell } from "../editableCells";

import classNames from "classnames/bind";
import styles from "./racerRanking.module.scss";
import { IRacerRanking } from "@/types/racer.type";
import { normalizeDate } from "../utils";

import apiErrorDefaultsHandler from "@/Utils/apiErrorDefaultHandler";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { deleteRacer } from "@/apiRequests/f1/racerRequest";
let cx = classNames.bind(styles);

const onChange: TableProps<IRacerRanking>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const originData: IRacerRanking[] = [];
const test: IRacerRanking | undefined = {
  key: "",
  ranking: 1,
  name: "",
  raceTeam: "",
  national: "",
  totalPoints: 0,
  totalTimes: "2001-10-14",
};
function RacerRanking() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: IRacerRanking) => record.key === editingKey;
  const [count, setCount] = useState(data.length);
  const [isAdd, setAdd] = useState(false);

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
  };

  const edit = (record: Partial<IRacerRanking> & { key: React.Key }) => {
    // form.setFieldsValue({
    //   name: "",
    //   dateOfBirth: moment("2000-11-11", "YYYY-MM-DD"),
    //   national: "",
    //   bio: "",
    //   ...record,
    // });
    console.log("record id: " + record.key);
    setCurrentRowValues(data.find((item) => item.key === record.key));
    // console.log("current row values: " + JSON.stringify(currentRowValues));
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const columns: any = [
    {
      title: "Ranking",
      dataIndex: "ranking",
      sorter: (a: any, b: any) => a.ranking - b.ranking,
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record: any) => record.name.startsWith(value),
      width: "15%",
      editable: true,
    },
    {
      title: "RaceTeam",
      dataIndex: "raceTeam",
      sorter: (a: any, b: any) => a.raceTeam - b.raceTeam,
      editable: true,
    },
    {
      title: "National",
      dataIndex: "national",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value: string, record: any) =>
        record.national.startsWith(value),
      filterSearch: true,
      width: "20%",
      editable: true,
    },
    {
      title: "Total Points",
      dataIndex: "totalPoints",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value: string, record: any) =>
        record.national.startsWith(value),
      filterSearch: true,
      width: "20%",
      editable: true,
    },
    {
      title: "Total Times",
      dataIndex: "totalTimes",
      width: "20%",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IRacerRanking) => {
        return (
          <EyeOutlined
            onClick={() => console.log("key " + record.key)}
          ></EyeOutlined>
        );
      },
    },
  ];

  console.log("admin re render");
  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IRacerRanking) => ({
        record,
        inputType: col.dataIndex === "totalTimes" ? "date" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        handleInputChange,
        currentRowValues,
        render: col,
      }),
    };
  });
  const handleAdd = () => {
    const newData: IRacerRanking = {
      key: "",
      ranking: 1,
      name: "",
      raceTeam: "",
      national: "",
      totalPoints: 0,
      totalTimes: "",
    };
    setAdd(true);
    setData([...data, newData]);
    setCount(count + 1);
  };

  return (
    // <Form form={form}>

    <>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns}
        dataSource={data}
        onChange={onChange}
        rowClassName={cx("editable-row")}
        pagination={{
          onChange: cancel,
        }}
      />
    </>
  );
}

export default RacerRanking;
