import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/apiRequests/registerRequest";
import { formSchema } from "./yupSchema";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Button, Form, Input, Typography } from "antd";
import { selectAuth } from "../../redux/store";
let cx = classNames.bind(styles);

interface IFormInput {
  username: string;
  password: string;
  rePassword: string;
  email: string;
}

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let isFetching = useSelector(selectAuth).register.isFetching;

  const [form] = Form.useForm();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("data from form: ", data);
    const { username, password, email } = data;
    const request = {
      username: username,
      password: password,
      email: email,
    };
    console.log("data request: ", request);
    registerUser(request, dispatch, navigate);
  };
  const yupSync = {
    async validator({ field }: any, value: any) {
      await formSchema.validateSyncAt(field, { [field]: value });
    },
  };
  return (
    <section className={cx("container")}>
      <Form
        size="large"
        form={form}
        onFinish={onSubmit}
        name="basic"
        wrapperCol={{ offset: 8, span: 8 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item name="usernameOrEmail" rules={[yupSync]}>
          <Input placeholder="Username"></Input>
        </Form.Item>

        <Form.Item name="password" rules={[yupSync]}>
          <Input.Password placeholder="Password"></Input.Password>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isFetching}>
            Login
          </Button>
        </Form.Item>
        <Form.Item className={cx("extras")}>
          <div className={cx("center-items")}>
            <div>
              <Typography.Text type="secondary">
                Need an Account?
              </Typography.Text>

              <Link to="/register" className="text">
                Register
              </Link>
            </div>
            <div>
              <Link to="/forgot" className="text">
                Forgot Password
              </Link>
            </div>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
}

export default Register;
