import { IRacerRanking } from "@/types/racer.type";
import { DatePicker, Form, Input, InputNumber } from "antd";
import moment from "moment";
import { format } from "path";
import { useState } from "react";
import InputNode from "./inputNode";
const dateFormat = "YYYY/MM/DD";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex:
    | "ranking"
    | "name"
    | "raceTeam"
    | "national"
    | "totalPoints"
    | "totalTimes";
  title: any;
  inputType: "number" | "text" | "date";
  record: IRacerRanking;
  index: number;
  currentRowValues: IRacerRanking;
  handleInputChange: any;

  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  currentRowValues,
  handleInputChange,
  ...restProps
}) => {
  let childNode = children;
  const [rowValue, setRowValue] = useState(currentRowValues);
  // console.log("rowValue: " + JSON.stringify(rowValue));

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
        //   name={dataIndex}
        //   style={{ margin: 0 }}
        //   rules={[
        //     {
        //       required: true,
        //       message: `Please Input ${title}!`,
        //     },
        //   ]}
        >
          <InputNode
            style={{ margin: 0 }}
            inputType={inputType}
            value={currentRowValues[dataIndex]}
            handleInputChange={(value: any) => {
              handleInputChange(value, dataIndex);
            }}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
