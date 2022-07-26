import { Button, Popconfirm, Spin, Table, TableProps } from "antd";
import { useState } from "react";
import { EditableCell } from "./editableCells";

import classNames from "classnames/bind";
import styles from "./racerManage.module.scss";
import { RacerItem } from "@/types/racer.type";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  useAddRacer,
  useDeleteRacer,
  useFetchRacers,
  useUpdateRacers,
} from "@/services/f1/racerService";
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
  key: "",
  id: "",
  name: "",
  dateOfBirth: "",
  national: "",
  bio: "",
};
function RacerManage() {
  const { data, status } = useFetchRacers();
  const updateRacer = useUpdateRacers();
  const deleteRacer = useDeleteRacer();
  const addRacer = useAddRacer();
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: RacerItem) => record.id === editingKey;

  const [isAdd, setAdd] = useState(false);

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
  };

  const edit = (record: Partial<RacerItem> & { id: React.Key }) => {
    console.log("record id: " + record.id);
    setCurrentRowValues(data.find((item: any) => item.id === record.id));
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
      width: "5%",
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
          deleteRacer.mutate({ id: record.id });
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

  console.log("admin re render");
  const save = async (id: React.Key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (isAdd) {
        const item = newData[index];
        console.log("currentRowValues: " + currentRowValues);
        if (currentRowValues) addRacer.mutate({ data: currentRowValues });

        setAdd(false);
        setEditingKey("");
      } else {
        if (index > -1) {
          const item = newData[index];

          if (currentRowValues)
            updateRacer.mutate({ id: id, data: currentRowValues });
          setEditingKey("");
          setCurrentRowValues(test);
        } else {
          if (currentRowValues) newData.push(currentRowValues);
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
      key: "",
      id: "",
      name: `Edward King`,
      dateOfBirth: "2001-10-14",
      national: `Colombia`,
      bio: "Hmm",
    };
    setAdd(true);
    addRacer.mutate({ data: newData });
  };

  return (
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
        loading={{ indicator: <Spin></Spin>, spinning: status === "loading" }}
      />
    </>
  );
}

export default RacerManage;
