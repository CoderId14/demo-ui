import axiosInstance from "@/config/axios";
import { Button, Form, Popconfirm, Table, TableProps } from "antd";
import { useState, useEffect } from "react";
import { EditableCell } from "./editableCells";

import classNames from "classnames/bind";
import styles from "./grandPrix.module.scss";

import { deleteRacer } from "../../../apiRequests/f1/racerRequest";
import apiErrorDefaultsHandler from "@/Utils/apiErrorDefaultHandler";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { IGrandPrix } from "@/types/grandPrix.type";
let cx = classNames.bind(styles);

const onChange: TableProps<IGrandPrix>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const originData: IGrandPrix[] = [];
const test: IGrandPrix | undefined = {
  name: "",
  laps: 0,
  time: "",
  description: "",
  raceCourse: "Ha Noi Stadium",

  key: "",
};
function GrandPrixManage() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: IGrandPrix) => record.key === editingKey;
  const [count, setCount] = useState(data.length);
  const [isAdd, setAdd] = useState(false);

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
  };

  const edit = (record: Partial<IGrandPrix> & { key: React.Key }) => {
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
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name - b.name,
    },
    {
      title: "Laps",
      dataIndex: "laps",
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
      title: "Time",
      dataIndex: "time",
      sorter: (a: any, b: any) => a.time - b.time,
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
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
      title: "RaceCourse",
      dataIndex: "raceCourse",
      width: "20%",
      editable: true,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IGrandPrix) => {
        const editable = isEditing(record);
        function deleteItem(key: string | number): void {
          // deleteRacer(
          //   "",
          //   key,
          //   (res: any) => {
          //     console.log("da xoa");
          //     setData(data.filter((item) => item.key !== record.key));
          //     setEditingKey("");
          //   },
          //   (errors: any) => {
          //     console.log(errors);
          //   },
          // );
        }

        return editable ? (
          <span>
            <CheckCircleOutlined
              style={{ marginRight: 8 }}
              onClick={() => save(record.key)}
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
              onConfirm={() => deleteItem(record.key)}
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

  console.log("admin re render");
  const save = async (key: React.Key) => {
    try {
      // const row = (await form.validateFields()) as IGrandPrix;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (isAdd) {
        const item = newData[index];
        // console.log("row1: " + JSON.stringify(row));
        // console.log("row2: " + JSON.stringify(row));
        // console.log("id: " + id);
        // if (currentRowValues) await addData(currentRowValues);
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
          console.log("id: " + key);
          console.log("item: " + JSON.stringify(item));
          // console.log("current row: " + JSON.stringify(currentRowValues));
          //   if (currentRowValues) await updateData(currentRowValues, id);
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
      onCell: (record: IGrandPrix) => ({
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
    const newData: IGrandPrix = {
      key: count,
      name: `Edward King ${count}`,
      laps: 0,
      time: "",
      description: "",
      raceCourse: "Ha Noi Stadium",
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

export default GrandPrixManage;
