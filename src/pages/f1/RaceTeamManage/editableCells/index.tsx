import { Form } from "antd";
import { useState } from "react";
import InputNode from "./inputNode";
import { IRaceTeam } from "../../../../types/raceTeam.type";
const dateFormat = "YYYY/MM/DD";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: "name" | "powerUnit" | "description";
  title: any;
  inputType: "number" | "text" | "date";
  record: IRaceTeam;
  index: number;
  currentRowValues: IRaceTeam;
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
    <td {...restProps} key={dataIndex}>
      {editing ? (
        <Form.Item
          //   name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
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
