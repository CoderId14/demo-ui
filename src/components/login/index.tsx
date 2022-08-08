import styles from "./Login.module.scss";
import { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changPassword, loginUser } from "../../redux/apiRequest";
import { selectAuth } from "../../redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import yup from "../../Utils/yupGlobal";
import { toast, ToastContainer } from "react-toastify";

interface IFormInput {
  usernameOrEmail: string;
  password: string;
}

function Login() {
  const userRef = useRef<HTMLParagraphElement>(null);
  const errRef = useRef();

  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    usernameOrEmail: yup
      .string()
      .matches(
        /^(?:[A-Z\d][A-Z\d_-]{4,25}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
        "Email or username invalid",
      )
      .required("Username or Email is required")
      .min(4, "Username or Email length should be at least 4 characters")
      .max(
        25,
        "Username or Email length cannot exceed more than 25 characters",
      ),

    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
        "Password must minimum 4 characters, at least 1 letter and 1 number",
      )
      .required("Password is required")
      .max(16, " Password length cannot exceed more than 16 characters"),
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

  useEffect(() => {
    if (user) {
      alert("You already login");
      navigate("/");
    }
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    console.log("data form ", data);
    const request = {
      username: data.usernameOrEmail,
      password: data.password,
    };
    toast.promise(loginUser(request, dispatch, navigate), {
      pending: "Pending",
      success: "Success",
      error: "Error",
    });
  };

  return (
    <section className="container">
      <h1 className="text-bold">Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="usernameOrEmail">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username or email"
            {...register("usernameOrEmail")}
          />
        </Form.Group>
        {errors.usernameOrEmail && (
          <Form.Text className="fw-bold text-uppercase text-danger">
            {errors.usernameOrEmail?.message}
          </Form.Text>
        )}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <Form.Text className="fw-bold text-uppercase text-danger">
              {errors.password?.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Form.Group>
        <Form.Text>
          Need an Account? <br />
          <Link to="/register" className="text">
            Register
            <br />
          </Link>
        </Form.Text>
        <Form.Text>
          <Link to="/forgot" className="text">
            Forgot Password
            <br />
          </Link>
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="button">
        <a
          href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8080/oauth2/callback/google"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          Login With Google
        </a>
      </Button>
      <div>
        <ToastContainer></ToastContainer>
      </div>
    </section>
  );
}

export default Login;
