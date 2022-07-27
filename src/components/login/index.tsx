import styles from "./Login.module.scss";
import { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiRequest";

function Login() {
  const userRef = useRef<HTMLParagraphElement>(null);
  const errRef = useRef();

  const [user, setUser] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newUser = {
      username: user,
      password: pwd,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <section>
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
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Form.Group>
          <Form.Text>
            Need an Account? <br />
            <Link to="/signUp" className="text">
              Sign Up
            </Link>
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login with Google
        </Button>
      </Form>
    </section>
  );
}

export default Login;
