import React, { Component } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";

export default class Login extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.history.push("/admin");
      // ketika tokennya sudah ada maka otomatis langsung masuk halaman Admin

    }
  }

  masukAdmin = (e) => {
    e.preventDefault();
    if (
      e.target.username.value === "usamah" &&
      e.target.password.value === "palkon"
    ) {
      localStorage.setItem("token", "kamusiapa");
      this.props.history.push("/admin");
      // ini adalah props dari react router untuk memasukkan ke halaman Admin
    } else {
      alert("incorrect password");
    }

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Login </h1>
        <Form onSubmit={this.masukAdmin}>
          <FormLabel>Account</FormLabel>
          <Form.Control name="username" placeholder="masukkan nama" />
          <FormLabel>Password</FormLabel>

          <Form.Control
            name="password"
            type="password"
            placeholder="masukkan password"
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
