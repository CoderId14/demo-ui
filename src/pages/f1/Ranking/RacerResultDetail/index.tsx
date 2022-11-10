import { Table, TableProps } from "antd";
import { useState, Key } from "react";
import { EditableCell } from "../editableCells";

import classNames from "classnames/bind";
import styles from "./racerRanking.module.scss";
import { IRacerRanking, IRacerResultDetails } from "@/types/racer.type";

import { EyeOutlined } from "@ant-design/icons";
import {
  useFetchRacer,
  useFetchRacerRanking,
} from "@/services/f1/racerService";
import { useFetchRacerResultDetail } from "../../../../services/f1/racerService";
import SelectOption from "@/components/SelectOption";
import { useFetchRaceTeamsBySeason } from "@/services/f1/raceTeamService";
import { useFetchSeasons } from "@/services/f1/seasonService";
import { Button, Nav } from "react-bootstrap";
import { AppConst } from "@/app-const";
import { Link } from "react-router-dom";
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
const test: IRacerResultDetails = {
  key: "",
  racerId: 0,
  racerName: "",
  grandPrixName: "",
  time: "",
  ranking: 0,
  point: 0,
  finishTime: "",
};

function RacerResultDetail() {
  const [selectedSeason, setSelectedSeason] = useState("1");
  let urlParam = new URLSearchParams(window.location.search);
  let racerId = urlParam.get("racerId") || "2";
  const { data, status } = useFetchRacerResultDetail(racerId, selectedSeason);

  const columns: any = [
    {
      title: "GrandPrix",
      dataIndex: "grandPrixName",
      sorter: (a: any, b: any) => a.grandPrixName - b.grandPrixName,
    },
    {
      title: "Date",
      dataIndex: "time",
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
      title: "Ranking",
      dataIndex: "ranking",
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
      title: "Point",
      dataIndex: "point",
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
      title: "Finish Time",
      dataIndex: "finishTime",
      width: "20%",
      editable: true,
      ellipsis: true,
    },
  ];

  console.log("admin re render");
  const { data: seasonData, status: seasonStatus } = useFetchSeasons();
  console.log("id : " + typeof Number(racerId));
  const { data: racer } = useFetchRacer(Number(racerId));

  return (
    // <Form form={form}>

    <>
      {racer && (
        <h3 style={{ textAlign: "center" }}>
          Result Detail of Racer: {racer.name}
        </h3>
      )}
      <SelectOption
        data={seasonData}
        setDataSelect={(value: any) => {
          setSelectedSeason(value);
          if (value !== "") console.log("adfafasdf: " + data);
        }}
      ></SelectOption>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowClassName={cx("editable-row")}
      />
      <Button style={{ width: 150 }}>
        <Link to={AppConst.RACER_RANKING_URL} style={{ color: "white" }}>
          Quay Lại
        </Link>{" "}
      </Button>
    </>
  );
}

export default RacerResultDetail;
