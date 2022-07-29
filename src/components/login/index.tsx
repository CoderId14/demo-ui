import styles from "./Login.module.scss";
import { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
import { selectAuth } from "../../redux/store";

function Login() {
  const userRef = useRef<HTMLParagraphElement>(null);
  const errRef = useRef();

  const login = useSelector(selectAuth).login;
  const user = login?.user ? login.user : null;

  const [username, setUser] = useState<string>("");
  const [password, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    if (user) {
      alert("You already login");
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    const res = loginUser(newUser, dispatch, navigate);
  };

  return (
    <section className="container">
      <pre>{JSON.stringify({ username: username, password: password })}</pre>
      <h1 className="text-bold">Login</h1>
      {success ? <p>Success</p> : <p>Error</p>}
      <Form onSubmit={handleSubmit}>
        <p
          ref={userRef}
          className={errMsg ? styles.errMsg : styles.offscreen}
          aria-live="assertive"
        ></p>
        <Form.Group className="mb-3" controlId="usernameOrEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username or email"
            className={styles.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser(e.currentTarget.value)
            }
            value={username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPwd(e.currentTarget.value)
            }
            value={password}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group>
          <Form.Text>
            Need an Account? <br />
            <Link to="/register" className="text">
              Register
            </Link>
          </Form.Text>
        </Form.Group>
      </Form>
      <Button variant="warning" type="button">
        <a href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:8080/oauth2/callback/google">
          Login With Google
        </a>
      </Button>
    </section>
  );
}

export default Login;
