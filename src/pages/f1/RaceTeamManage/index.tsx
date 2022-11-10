import {
  Button,
  Input,
  Popconfirm,
  Select,
  Spin,
  Table,
  TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { EditableCell } from "./editableCells";

import classNames from "classnames/bind";
import styles from "./racerManage.module.scss";
import { RacerItem } from "@/types/racer.type";
import { IRaceTeam } from "../../../types/raceTeam.type";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  useAddRaceTeam,
  useFetchRaceTeams,
  useUpdateRaceTeam,
} from "@/services/f1/raceTeamService";
import {
  useDeleteRaceTeam,
  useFetchRaceTeamsBySeason,
} from "../../../services/f1/raceTeamService";
import { useFetchSeasons } from "../../../services/f1/seasonService";
import { ISeason } from "../../../types/season.type";
import SelectOption from "@/components/SelectOption";
import { Form } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

let cx = classNames.bind(styles);

const onChange: TableProps<IRaceTeam>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const originData: IRaceTeam[] = [];
const test: IRaceTeam | undefined = {
  id: "",
  key: "",
  name: "",
  powerUnit: 0,
  description: "",
};
function RaceTeamManage() {
  const { data, status } = useFetchRaceTeams();
  const updateRaceTeam = useUpdateRaceTeam();
  const deleteRaceTeam = useDeleteRaceTeam();
  const addRaceTeam = useAddRaceTeam();
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: IRaceTeam) => record.id === editingKey;

  const [isAdd, setAdd] = useState(false);

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
  };

  const edit = (record: Partial<IRaceTeam> & { id: React.Key }) => {
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
      editable: true,
      width: "20%",
    },
    {
      title: "PowerUnit",
      dataIndex: "powerUnit",
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
      title: "Description",
      dataIndex: "description",
      sorter: (a: any, b: any) => a.description - b.description,
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: IRaceTeam) => {
        const editable = isEditing(record);
        function deleteItem(id: string | number): void {
          deleteRaceTeam.mutate({ id: record.id });
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
        if (currentRowValues) addRaceTeam.mutate({ data: currentRowValues });

        setAdd(false);
        setEditingKey("");
      } else {
        if (index > -1) {
          const item = newData[index];

          if (currentRowValues)
            updateRaceTeam.mutate({ id: id, data: currentRowValues });
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
      onCell: (record: IRaceTeam) => ({
        record,
        inputType: col.dataIndex === "powerUnit" ? "number" : "text",
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
    const newData: IRaceTeam = {
      key: "",
      id: "",
      name: `Edward King`,
      powerUnit: 1000.0,
      description: "Colombia",
    };
    setAdd(true);
    addRaceTeam.mutate({ data: newData });
  };
  const { data: seasonData, status: seasonStatus } = useFetchSeasons();
  const [selectedSeason, setSelectedSeason] = useState("");
  const raceTeamBySeason = useFetchRaceTeamsBySeason();
  console.log("selectedSeason: " + selectedSeason);
  const queryClient = useQueryClient();
  return (
    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <SelectOption
        data={seasonData}
        setDataSelect={(value: any) => {
          setSelectedSeason(value);
          if (value !== "")
            raceTeamBySeason.mutate({
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
        loading={{ indicator: <Spin></Spin>, spinning: status === "loading" }}
      />
    </>
  );
}

export default RaceTeamManage;
