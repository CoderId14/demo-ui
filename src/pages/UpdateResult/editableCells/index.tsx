import { Form } from "antd";
import { useState } from "react";
import InputNode from "./inputNode";
const dateFormat = "YYYY/MM/DD";
interface RacerItem {
  id: React.Key;
  name: string;
  dateOfBirth: string;
  national: string;
  bio: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: "name" | "dateOfBirth" | "national" | "bio";
  title: any;
  inputType: "number" | "text" | "date";
  record: RacerItem;
  index: number;
  currentRowValues: RacerItem;
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
