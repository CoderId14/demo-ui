import React from "react";

import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const ButtonGroupTableEdit = ({ editing, eventHandlers, rowKey }: any) => {
  const { editRow, deleteRow, saveRow, cancelRow }: any = eventHandlers;

  return !editing ? (
    <div
      style={{
        width: 45,
        margin: "0, 5",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <EditOutlined onClick={() => editRow(rowKey)} />
      <DeleteOutlined onClick={() => deleteRow(rowKey)} />
    </div>
  ) : (
    <div
      style={{
        width: 45,
        margin: "0 ,5",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CheckCircleOutlined onClick={() => saveRow(rowKey)} />
      <CloseCircleOutlined onClick={() => cancelRow()} />
    </div>
  );
};

export default ButtonGroupTableEdit;
