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
import { useFetchRacerRanking } from "@/services/f1/racerService";
import { Navigate, useNavigate } from "react-router-dom";
import { AppConst } from "@/app-const";
import { useFetchRacerRankingBySeason } from "../../../../services/f1/racerService";
import { useFetchSeasons } from "@/services/f1/seasonService";
import SelectOption from "@/components/SelectOption";
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
const test: IRacerRanking = {
  key: "",
  ranking: 0,
  racerName: "",
  raceTeamName: "",
  national: "",
  totalPoints: 0,
  totalTimes: "03:00:00",
};
function RacerRanking() {
  const { data, status } = useFetchRacerRanking();
  const navigate = useNavigate();
  const [editingKey, setEditingKey]: any = useState("");

  const isEditing = (record: IRacerRanking) => record.key === editingKey;

  const [currentRowValues, setCurrentRowValues] = useState(test);

  const handleInputChange = (value: any, dataIndex: any) => {
    setCurrentRowValues((old: any) => ({ ...old, [dataIndex]: value }));
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
      title: "Racer Name",
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
      title: "RaceTeam",
      dataIndex: "raceTeamName",
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
            onClick={() => {
              navigate(
                AppConst.RACER_RESULT_DETAIL_URL + "?racerId=" + record.racerId,
              );
            }}
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
  const { data: seasonData, status: seasonStatus } = useFetchSeasons();
  const [selectedSeason, setSelectedSeason] = useState("");
  const racerRankingBySeason = useFetchRacerRankingBySeason();
  return (
    // <Form form={form}>

    <>
      <SelectOption
        data={seasonData}
        setDataSelect={(value: any) => {
          setSelectedSeason(value);
          if (value !== "")
            racerRankingBySeason.mutate({
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

export default RacerRanking;
