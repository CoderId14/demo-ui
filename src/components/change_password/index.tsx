import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import yup from "../../Utils/yupGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { changPassword, getUserByToken } from "../../redux/apiRequest";
import { toast } from "react-toastify";

interface IFormInput {
  usernameOrEmail: string;
  password: string;
  rePassword: string;
}

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector(selectUser).forgotPassword;
  let email = user.email;
  let token = user?.token;

  let urlParam = new URLSearchParams(window.location.search);

  let tokenFromEmail = urlParam.get("token") || "";

  useEffect(() => {
    if (tokenFromEmail) {
      if (email == null) getUserByToken(tokenFromEmail, dispatch, navigate);
    } else {
      navigate("/login");
    }
  }, []);

  const formSchema = yup.object().shape({
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
    const { usernameOrEmail, password } = data;
    const request = {
      usernameOrEmail: usernameOrEmail,
      password: password,
      token: tokenFromEmail,
    };
    console.log("data request: ", request);
    toast.promise(changPassword(request, dispatch, navigate), {
      pending: "Pending",
      success: "Success",
      error: "Error",
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="usernameOrEmail">
        <Form.Label>Email or Username</Form.Label>
        <Form.Control
          type="text"
          readOnly
          value={email || "Email khong hop le"}
          {...register("usernameOrEmail")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.rePassword && (
          <Form.Text className="fw-bold text-uppercase text-danger">
            {" "}
            {errors?.password?.message}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="re-password">
        <Form.Label>Re New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re Password"
          {...register("rePassword")}
        />
        {errors.rePassword && (
          <Form.Text className="fw-bold text-uppercase text-danger">
            {" "}
            {errors?.rePassword?.message}
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
