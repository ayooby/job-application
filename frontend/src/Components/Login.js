import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Alert,
  Col,
} from "reactstrap";
import { LOGIN, VALIDATE_USER } from "../api";
import { UserContext } from "../Context/User";

const Login = () => {
  const [status, setStatus] = useState("init");
  const [error, setError] = useState("");
  const { setUser, user } = useContext(UserContext);

  const loginUser = ({ currentUser, token }) => {
    token && window.localStorage.setItem("token", token);
    setUser({ ...user, loggedIn: true, user: currentUser });
    setStatus("redirect");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const result = await fetch(LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }).then(async (res) => ({
      error: !res.ok,
      data: await res.json(),
    }));

    if (result.error) {
      setError(result.data);
      setStatus("error");
      return;
    }
    loginUser({ currentUser: result.data.user, token: result.token });
  };

  const userToken = window.localStorage.getItem("token");

  const checkUserByToken = async (token) => {
    fetch(VALIDATE_USER, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.isvalid) {
          loginUser({ currentUser: res.user });
          return;
        }
        window.localStorage.removeItem("token");
        setStatus("login");
      });
  };

  useEffect(() => {
    if (userToken) {
      checkUserByToken(userToken);
      return;
    }
    setStatus("login");
  }, []);

  if (status === "init") return <CheckingAccount />;

  if (status === "redirect") return <Redirect to="/dashboard" />;

  return (
    <Col md={8} className="mt-4">
      <Card className="p-2">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          {status === "error" && <p className="text-danger">{error.msg}</p>}
          <Button>Login</Button>
        </Form>
      </Card>
    </Col>
  );
};

const CheckingAccount = () => (
  <Alert color="info">Checking your account...</Alert>
);

export default Login;
