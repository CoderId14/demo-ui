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
import { useFetchGrandPrixes } from "@/services/f1/grandPrixService";
import { useFetchGrandPrixesBySeason } from "../../../services/f1/grandPrixService";
import {
  useUpdateGrandPrix,
  useDeleteGrandPrix,
  useAddGrandPrix,
} from "../../../services/f1/grandPrixService";
import SelectOption from "@/components/SelectOption";
import { useFetchSeasons } from "@/services/f1/seasonService";
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
  id: "",
  name: "",
  laps: 0,
  time: "",
  description: "",
  raceCourse: "Ha Noi Stadium",

  key: "",
};
function GrandPrixManage() {
  const { data, status } = useFetchGrandPrixes();
  const updateGrandPrix = useUpdateGrandPrix();
  const deleteGrandPrix = useDeleteGrandPrix();
  const addGrandPrix = useAddGrandPrix();

  const [editingKey, setEditingKey]: any = useState("");
  const isEditing = (record: IGrandPrix) => record.id === editingKey;

  const [isAdd, setAdd] = useState(false);

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
  };

  const edit = (record: Partial<IGrandPrix> & { id: React.Key }) => {
    console.log("record id: " + record.id);
    setCurrentRowValues(data.find((item: any) => item.id === record.id));

    setEditingKey(record.id);
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
              onConfirm={() => deleteGrandPrix.mutate(record.id)}
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
        if (currentRowValues) addGrandPrix.mutate({ data: currentRowValues });

        setAdd(false);
        setEditingKey("");
      } else {
        if (index > -1) {
          const item = newData[index];

          if (currentRowValues)
            updateGrandPrix.mutate({ id: id, data: currentRowValues });
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
      onCell: (record: IGrandPrix) => ({
        record,
        inputType: col.dataIndex === "time" ? "date" : "text",
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
      key: "",
      id: "",
      name: `Edward King`,
      laps: 10,
      time: "2022-10-12T00:00:00",
      description: "",
      raceCourse: "Ha Noi Stadium",
      season: "2022 ChampionShip Tour",
    };
    setAdd(true);
    addGrandPrix.mutate({ data: newData });
  };
  const grandPrixBySeason = useFetchGrandPrixesBySeason();
  const [selectedSeason, setSelectedSeason] = useState("");
  const { data: seasonData, status: seasonStatus } = useFetchSeasons();
  return (
    // <Form form={form}>

    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <SelectOption
        data={seasonData}
        setDataSelect={(value: any) => {
          setSelectedSeason(value);
          grandPrixBySeason.mutate({
            seasonId: value,
          });
          console.log("adfafasdf: " + data);
        }}
      ></SelectOption>
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
