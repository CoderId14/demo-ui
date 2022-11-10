import {
  Button,
  Form,
  Popconfirm,
  Select,
  Spin,
  Table,
  TableProps,
} from "antd";
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
import { Key } from "antd/lib/table/interface";
import { useFetchResult } from "../../services/f1/resultService";
import { useFetchSeasons } from "@/services/f1/seasonService";
import SelectOption from "@/components/SelectOption";
import { useFetchTournament } from "../../services/f1/tournament";
import { useFetchGrandPrixes } from "@/services/f1/grandPrixService";
let cx = classNames.bind(styles);

const onChange: TableProps<RacerItem>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};

interface IUpdateResult {
  id: Key;
  racerName: string;
  raceTeamName: string;
  national: string;
  bio: string;
  startDate: string;
  finishDate: string;
  time: string;
  laps: number;
  racerOfRaceTeamId: number;
}

const originData: IUpdateResult[] = [];
const test: IUpdateResult | undefined = {
  id: "",
  racerName: "",
  raceTeamName: "",
  national: "",
  bio: "",
  startDate: "",
  finishDate: "",
  time: "",
  laps: 0,
  racerOfRaceTeamId: 0,
};
const { Option } = Select;
function UpdateResult() {
  const { data, status } = useFetchResult(2, 7, 1);
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

  const edit = (record: Partial<IUpdateResult> & { id: React.Key }) => {
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
      title: "Tên Tay Đua",
      dataIndex: "racerName",
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
      title: "Tên Đội Đua",
      dataIndex: "raceTeamName",
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
    ,
    {
      title: "Thời gian bắt đầu",
      dataIndex: "startTime",
      sorter: (a: any, b: any) => a.dateOfBirth - b.dateOfBirth,
      editable: true,
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "finishTime",
      sorter: (a: any, b: any) => a.dateOfBirth - b.dateOfBirth,
      editable: true,
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
    const newData: IUpdateResult = {
      id: "",
      racerName: "Thao",
      raceTeamName: "HanoiF1",
      national: "VietNam",
      bio: "test",
      startDate: "2022-11-01 14:13:37.735000",
      finishDate: "2022-11-01 17:13:37.735000",
      time: "17:13:37.735000",
      laps: 0,
      racerOfRaceTeamId: 0,
    };
    setAdd(true);
    addRacer.mutate({ data: newData });
  };
  const { data: seasonData, status: seasonStatus } = useFetchSeasons();
  const { data: tournamentData } = useFetchTournament();
  const { data: grandPrixData } = useFetchGrandPrixes();
  const [selectedSeason, setSelectedSeason] = useState("");

  console.log("selectedSeason: " + selectedSeason);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 15 }}>
        Add a row
      </Button>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="season" label="Select a Season">
          <Select style={{ width: 200 }}>
            {" "}
            {seasonData &&
              seasonData.map((item: any, index: number) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="tournament"
          label="Select a Tournament"
          style={{ width: 200 }}
        >
          <Select style={{ width: 200 }}>
            {" "}
            {tournamentData &&
              tournamentData.map((item: any, index: number) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="grandPrix"
          label="Select a Chặng đua"
          style={{ minWidth: 200 }}
        >
          <Select style={{ width: 200 }}>
            {" "}
            {grandPrixData &&
              grandPrixData.map((item: any, index: number) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

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

export default UpdateResult;
