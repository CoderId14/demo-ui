import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";

function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    <section className="container">
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.currentTarget.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword2(e.currentTarget.value)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
}

export default Register;
