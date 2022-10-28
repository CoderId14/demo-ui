import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import yup from "../../Utils/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
import { forgotPasswords } from "@/apiRequests/forgotRequest";

interface IFormInput {
  usernameOrEmail: string;
}
const ForgotPassword: React.FC = () => {
  const formSchema = yup.object().shape({
    usernameOrEmail: yup
      .string()
      .matches(
        /^(?:[A-Zd][A-Zd_-]{4,25}|[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4})$/i,
        "Email or username invalid",
      )
      .required("Username or Email is required")
      .min(4, "Username or Email length should be at least 4 characters")
      .max(
        25,
        "Username or Email length cannot exceed more than 25 characters",
      ),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const [usernameOrEmail, setUsernameOrEmail] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log("data form ", data);

    forgotPasswords(data.usernameOrEmail, dispatch, navigate);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormLabel>Username or Email</FormLabel>
          <FormControl
            type="text"
            placeholder="Username or Email"
            {...register("usernameOrEmail")}
          ></FormControl>
          {errors.usernameOrEmail && (
            <Form.Text className="fw-bold text-uppercase text-danger">
              {" "}
              {errors?.usernameOrEmail?.message}
            </Form.Text>
          )}
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default ForgotPassword;
