import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, Card } from "reactstrap";
import { REGISTER } from "../api";

const Register = () => {
  const [status, setStatus] = useState("init");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, password2 } = e.target;
    const result = await fetch(REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        password2: password2.value,
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
    setStatus("redirect");
  };

  if (status === "redirect") return <Redirect to="/login" />;

  return (
    <Col md={8} className="mt-4">
      <Card className="p-2">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password1">Confirm Password</Label>
            <Input
              required
              type="password"
              name="password2"
              id="password2"
              placeholder="password"
            />
          </FormGroup>
          {status === "error" && <p className="text-danger">{error.msg}</p>}
          <Button>Register</Button>
        </Form>
      </Card>
    </Col>
  );
};

export default Register;
