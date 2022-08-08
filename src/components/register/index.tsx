import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changPassword, registerUser } from "../../redux/apiRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import yup from "../../Utils/yupGlobal";
import { toast, ToastContainer } from "react-toastify";

interface IFormInput {
  username: string;
  password: string;
  rePassword: string;
  email: string;
}

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username must minimum 4 characters and dont contain special characters",
      )
      .max(16, " Username length cannot exceed more than 16 characters"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email invalid")
      .max(25, " Email length cannot exceed more than 16 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
        "Password must minimum 4 characters, at least 1 letter and 1 number",
      )
      .max(16, " Password length cannot exceed more than 16 characters"),
    rePassword: yup
      .string()
      .required("Re-Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
        "Password must minimum 4 characters, at least 1 letter and 1 number",
      )
      .max(16, "Password length cannot exceed more than 16 characters")
      .oneOf([yup.ref("password")], "Password do not match"),
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("data from form: ", data);
    const { username, password, email } = data;
    const request = {
      username: username,
      password: password,
      email: email,
    };
    console.log("data request: ", request);
    toast.promise(registerUser(request, dispatch, navigate), {
      pending: "Pending",
      success: "Success",
      error: "Error",
    });
  };

  return (
    <section className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("username")}
          />
          {errors.username && (
            <Form.Text className="fw-bold text-uppercase text-danger">
              {errors.username?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-Password"
            {...register("rePassword")}
          />
          {errors.rePassword && (
            <Form.Text className="fw-bold text-uppercase text-danger">
              {errors.rePassword?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && (
            <Form.Text className="fw-bold text-uppercase text-danger">
              {errors.email?.message}
            </Form.Text>
          )}
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <ToastContainer></ToastContainer>
      </div>
    </section>
  );
}

export default Register;
