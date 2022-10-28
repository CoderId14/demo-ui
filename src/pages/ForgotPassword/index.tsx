import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import yup from "../../Utils/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import { forgotPasswords } from "@/apiRequests/forgotRequest";
import { formSchema } from "./yupSchema";
import { Button, Form, Input } from "antd";

interface IFormInput {
  usernameOrEmail: string;
}
const ForgotPassword: React.FC = () => {
  const yupSync = {
    async validator({ field }: any, value: any) {
      await formSchema.validateSyncAt(field, { [field]: value });
    },
  };
  const [form] = Form.useForm();

  const [usernameOrEmail, setUsernameOrEmail] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log("data form ", data);

    forgotPasswords(data.usernameOrEmail, dispatch, navigate);
  };
  return (
    <>
      <Form
        size="large"
        form={form}
        onFinish={onSubmit}
        name="basic"
        wrapperCol={{ offset: 8, span: 8 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{
          marginTop: 16,
        }}
      >
        <Form.Item name="usernameOrEmail" rules={[yupSync]}>
          <Input placeholder="Username or Email"></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 15 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPassword;
