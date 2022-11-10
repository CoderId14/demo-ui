import { useFetchRaceTeamsBySeason } from "@/services/f1/raceTeamService";
import { Select, Spin } from "antd";
import { ISeason } from "../../types/season.type";

const { Option } = Select;

function SelectOption({ data, setDataSelect }: any) {
  console.log("data select: " + JSON.stringify(data));
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setDataSelect(value);
  };

  return (
    <>
      {data ? (
        <Select
          style={{ width: 200, marginLeft: 20 }}
          showSearch
          optionFilterProp="children"
          onChange={onChange}
          // onSearch={onSearch}
        >
          {data.map((item: any, index: number) => {
            return (
              <Option key={index} value={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      ) : (
        <Spin style={{ marginLeft: 20 }}></Spin>
      )}
    </>
  );
}

export default SelectOption;
