import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import ButtonGroupTableEdit from "./Button";

export const getCellRenderers = (eventHandlers: any, func = {}) => {
  const { isEditing }: any = func || {};

  const sort = {
    sort: () => <MenuOutlined />,
  };

  const edit = {
    edit: (_: any, row: any) => (
      <ButtonGroupTableEdit
        editing={isEditing(row.key)}
        eventHandlers={eventHandlers}
        rowKey={row.key}
      />
    ),
  };

  const renderers = { ...sort, ...edit };

  return renderers;
};

export const getFunctionalColumns = (
  rawColumns: any,
  renderers: any,
  func = {},
) => {
  const { isEditing, currentRowValues, handleInputChange }: any = func || {};

  return (
    rawColumns &&
    rawColumns.map((col: any) => {
      const rendererKeys = Object.keys(renderers);
      let editFunc = {};
      let renderFunc = {};

      if (col.editable) {
        editFunc = {
          onCell: (row: any) => ({
            row,
            dataIndex: col.dataIndex,
            title: col.title,
            editable: col.editable,
            inputType: col.inputType,
            editing: isEditing(row.key),
            currentRowValues,
            handleInputChange,
          }),
        };
      }

      if (rendererKeys.includes(col.dataIndex)) {
        renderFunc = {
          render: renderers[col.dataIndex],
        };
      }

      const functionalColumns = { ...col, ...editFunc, ...renderFunc };

      return functionalColumns;
    })
  );
};
