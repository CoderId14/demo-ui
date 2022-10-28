import { logOut } from "@/apiRequests/logoutRequest";
import axiosInstance from "@/config/axios";
import AdminLayout from "@/layouts/adminLayout";
import { selectAuth } from "@/redux/store";
import moment from "moment";
import {
  Button,
  Form,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forEachChild, StringLiteral } from "typescript";
import { EditableCell } from "./editableCells";

import classNames from "classnames/bind";
import styles from "./racerManage.module.scss";
import { AddItem, RacerItem } from "@/types/racer.type";
import { normalizeDate } from "./utils";
import { deleteRacer } from "../../../apiRequests/f1/racerRequest";
import { AxiosError } from "axios";
import apiErrorDefaultsHandler from "@/Utils/apiErrorDefaultHandler";
import {
  getCellRenderers,
  getFunctionalColumns,
} from "./editableCells/helpers";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ButtonGroupTableEdit from "./editableCells/Button";
let cx = classNames.bind(styles);

const onChange: TableProps<RacerItem>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const originData: RacerItem[] = [];
const test: RacerItem | undefined = {
  id: "",
  name: "",
  dateOfBirth: "",
  national: "",
  bio: "",
};
function RacerManage() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: RacerItem) => record.id === editingKey;
  const [count, setCount] = useState(data.length);
  const [isAdd, setAdd] = useState(false);

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
  };

  const edit = (record: Partial<RacerItem> & { id: React.Key }) => {
    // form.setFieldsValue({
    //   name: "",
    //   dateOfBirth: moment("2000-11-11", "YYYY-MM-DD"),
    //   national: "",
    //   bio: "",
    //   ...record,
    // });
    console.log("record id: " + record.id);
    setCurrentRowValues(data.find((item) => item.id === record.id));
    // console.log("current row values: " + JSON.stringify(currentRowValues));
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
      id: true,
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
      width: "30%",
      editable: true,
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      sorter: (a: any, b: any) => a.dateOfBirth - b.dateOfBirth,
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
      title: "Bio",
      dataIndex: "bio",
      width: "20%",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: RacerItem) => {
        const editable = isEditing(record);
        function deleteItem(id: string | number): void {
          deleteRacer(
            "",
            id,
            (res: any) => {
              console.log("da xoa");
              setData(data.filter((item) => item.id !== record.id));
              setEditingKey("");
            },
            (errors: any) => {
              console.log(errors);
            },
          );
        }

        return editable ? (
          <span>
            <CheckCircleOutlined
              style={{ marginRight: 8 }}
              onClick={() => save(record.id)}
            >
              Save
            </CheckCircleOutlined>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <CloseCircleOutlined style={{ marginRight: 8 }}>
                Cancel
              </CloseCircleOutlined>
            </Popconfirm>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => deleteItem(record.id)}
            >
              <DeleteOutlined>Delete</DeleteOutlined>
            </Popconfirm>
          </span>
        ) : (
          <EditOutlined
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </EditOutlined>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchRacer() {
      try {
        let res = await axiosInstance.get("/racer");
        res.data = normalizeDate(res.data);
        console.log(res.data);
        setData(res.data);
      } catch (error: any) {
        apiErrorDefaultsHandler(error.response.status);
      }
    }
    fetchRacer();
  }, []);

  useEffect(() => {});
  async function updateData(sendData: RacerItem, id: React.Key) {
    try {
      console.log("sendData: " + JSON.stringify(sendData));
      let res = await axiosInstance.put("/racer/" + id, sendData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {});
  async function addData(sendData: RacerItem) {
    try {
      console.log("sendData: " + JSON.stringify(sendData));
      let res = await axiosInstance.post("/racer", sendData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("admin re render");
  const save = async (id: React.Key) => {
    try {
      // const row = (await form.validateFields()) as RacerItem;

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (isAdd) {
        const item = newData[index];
        // console.log("row1: " + JSON.stringify(row));
        // console.log("row2: " + JSON.stringify(row));
        // console.log("id: " + id);
        if (currentRowValues) await addData(currentRowValues);
        newData.splice(index, 1, {
          ...item,
          ...currentRowValues,
        });
        // newData.forEach((test) => {
        //   console.log(test);
        // });
        setAdd(false);
        setData(newData);
        setEditingKey("");
      } else {
        if (index > -1) {
          const item = newData[index];
          // console.log("row1: " + JSON.stringify(row));
          // console.log("row2: " + JSON.stringify(row));
          console.log("id: " + id);
          console.log("item: " + JSON.stringify(item));
          // console.log("current row: " + JSON.stringify(currentRowValues));
          if (currentRowValues) await updateData(currentRowValues, id);
          newData.splice(index, 1, {
            ...item,
            ...currentRowValues,
          });
          // newData.forEach((test) => {
          //   console.log(test);
          // });
          setData(newData);

          setEditingKey("");
          setCurrentRowValues(test);
        } else {
          if (currentRowValues) newData.push(currentRowValues);
          setData(newData);
          setEditingKey("");
        }
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: RacerItem) => ({
        record,
        inputType: col.dataIndex === "dateOfBirth" ? "date" : "text",
        dataIndex: col.dataIndex,
        disabled: col.dataIndex === "ID",
        title: col.title,
        editing: isEditing(record),
        handleInputChange,
        currentRowValues,
        render: col,
      }),
    };
  });
  const handleAdd = () => {
    const newData: RacerItem = {
      id: count,
      name: `Edward King ${count}`,
      dateOfBirth: "2001-10-14",
      national: `Viet Nam`,
      bio: "Hmm",
    };
    setAdd(true);
    setData([...data, newData]);
    setCount(count + 1);
  };

  return (
    // <Form form={form}>

    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
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

export default RacerManage;
