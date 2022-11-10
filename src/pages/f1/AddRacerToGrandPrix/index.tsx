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
import { useFetchSeasons } from "@/services/f1/seasonService";
import { useFetchGrandPrixes } from "@/services/f1/grandPrixService";
import { useFetchRaceTeams } from "@/services/f1/raceTeamService";
import { useQuery } from "@tanstack/react-query";
import { getAllRacers } from "@/apiRequests/f1/racerRequest";
import { addRacerToResult } from "../../../apiRequests/f1/resultRequest";
import {
  useAddRacerToResult,
  useDeleteResult,
} from "../../../services/f1/resultService";
import {
  useFetchRacerInGrandPrix,
  useFetchRacerNotInGrandPrix,
} from "../../../services/f1/racerOfRaceTeam";
import {
  getRacerInGrandPrix,
  getRacerNotInGrandPrix,
} from "@/apiRequests/f1/racerOfRaceTeamRequest";
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
  racerOfTeamId: 0,
};
const { Option } = Select;
function RacerManage() {
  const { data, status } = useFetchRacers();
  const updateRacer = useUpdateRacers();
  const deleteRacer = useDeleteRacer();
  const addRacer = useAddRacer();
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: RacerItem) => record.id === editingKey;

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
      title: "RacerTeamId",
      dataIndex: "racerOfTeamId",

      width: "15%",
    },
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

        return (
          <EditOutlined onClick={() => handleAdd(record)}>Edit</EditOutlined>
        );
      },
    },
  ];
  const columns1: any = [
    {
      title: "RacerTeamId",
      dataIndex: "racerOfTeamId",

      width: "15%",
    },
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

        return (
          <EditOutlined onClick={() => handleDelete(record)}>Edit</EditOutlined>
        );
      },
    },
  ];

  console.log("admin re render");

  const addRacerToResult = useAddRacerToResult();
  const [seasonSelect, setSeasonSelect] = useState("");
  const [grandPrixSelect, setGrandPrixSelect] = useState("");
  const [raceTeamSelect, setRaceTeamSelect] = useState("");
  const deleteResult = useDeleteResult();
  const handleDelete = (record: Partial<RacerItem> & { id: React.Key }) => {
    console.log("record id: " + record.id);
    // setCurrentRowValues(
    //   racerNotInData.find((item: any) => item.id === record.id),
    // );
    console.log("racerOfTeamId: " + record.racerOfTeamId);
    console.log("currentRowValue: " + JSON.stringify(currentRowValues));

    deleteResult.mutate({
      seasonId: seasonSelect,
      grandPrixId: grandPrixSelect,
      racerOfTeamId: record.racerOfTeamId,
    });
  };
  const handleAdd = (record: Partial<RacerItem> & { id: React.Key }) => {
    console.log("record id: " + record.id);
    // setCurrentRowValues(
    //   racerNotInData.find((item: any) => item.id === record.id),
    // );
    console.log("racerOfTeamId: " + record.racerOfTeamId);
    console.log("currentRowValue: " + JSON.stringify(currentRowValues));

    addRacerToResult.mutate({
      seasonId: seasonSelect,
      grandPrixId: grandPrixSelect,
      racerOfTeamId: record.racerOfTeamId,
    });
  };
  const [form] = Form.useForm();
  const fetchRacerNotIn = useFetchRacerNotInGrandPrix();
  const fetchRacerIn = useFetchRacerInGrandPrix();

  const onFinish = (values: any) => {
    console.log(values);
    fetchRacerNotIn.mutate({
      seasonId: values.seasonId,
      grandPrixId: values.grandPrixId,
      raceTeamId: values.raceTeamId,
    });
    fetchRacerIn.mutate({
      seasonId: values.seasonId,
      grandPrixId: values.grandPrixId,
      raceTeamId: values.raceTeamId,
    });
  };
  const { data: seasonData, status: seasonStatus } = useFetchSeasons();
  const { data: grandPrixData } = useFetchGrandPrixes();
  const { data: raceTeamData } = useFetchRaceTeams();
  const { data: racerNotInData } = useQuery(["racer-register-not-in"], () =>
    getRacerNotInGrandPrix(seasonSelect, grandPrixSelect, raceTeamSelect),
  );
  const { data: racerInData } = useQuery(["racer-register-in"], () =>
    getRacerInGrandPrix(seasonSelect, grandPrixSelect, raceTeamSelect),
  );

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="seasonId" label="Select a Season">
          <Select
            style={{ width: 200 }}
            onChange={(value) => setSeasonSelect(value)}
          >
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
          name="raceTeamId"
          label="Select a RaceTeam"
          style={{ width: 200 }}
        >
          <Select
            style={{ width: 200 }}
            onChange={(value) => setRaceTeamSelect(value)}
          >
            {" "}
            {raceTeamData &&
              raceTeamData.map((item: any, index: number) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="grandPrixId"
          label="Select a Chặng đua"
          style={{ minWidth: 200 }}
        >
          <Select
            style={{ width: 200 }}
            onChange={(value) => setGrandPrixSelect(value)}
          >
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
        bordered
        columns={columns}
        dataSource={racerNotInData}
        onChange={onChange}
        rowClassName={cx("editable-row")}
        pagination={{
          onChange: cancel,
        }}
        loading={{ indicator: <Spin></Spin>, spinning: status === "loading" }}
      />
      <Table
        bordered
        columns={columns1}
        dataSource={racerInData}
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
