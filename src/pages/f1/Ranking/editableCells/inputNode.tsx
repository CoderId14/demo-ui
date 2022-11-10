import React, { useState } from "react";
import Moment from "moment";
import {
  Input,
  InputNumber as AntInputNumber,
  DatePicker as AntDatePicker,
} from "antd";

const InputNumber = (props: any) => {
  const { value, handleInputChange, ...restProps } = props;

  return (
    <AntInputNumber
      style={{ width: 240 }}
      value={value}
      step={1}
      onChange={handleInputChange}
      {...restProps}
    />
  );
};

const DatePicker = (props: any) => {
  const { value, handleInputChange, ...restProps } = props;
  const placeholder = "Select year";

  return (
    <AntDatePicker
      allowClear="true"
      placeholder={placeholder}
      format="YYYY-MM-DD"
      value={value}
      onChange={(e: Moment.Moment) => handleInputChange(e.format("YYYY-MM-DD"))}
      {...restProps}
    />
  );
};

const InputNode = ({ inputType, value, ...restProps }: any) => {
  const newValue = inputType === "date" ? Moment(value) : value;

  switch (inputType) {
    case "text":
      return (
        <Input
          value={newValue}
          {...restProps}
          onChange={(e) => {
            console.log("e tartget " + e.target.value);
            // return setinputText(e.target.value);
            return restProps.handleInputChange(e.target.value);
          }}
        />
      );
    case "number":
      return <InputNumber value={newValue} {...restProps} />;
    case "date":
      return <DatePicker value={newValue} {...restProps} />;
    default:
      return <Input value={newValue} {...restProps} />;
  }
};

export default InputNode;
