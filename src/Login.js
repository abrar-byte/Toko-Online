import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class Login extends Component {


  masukAdmin(e) {
    e.preventDefault()
    if (e.target.user.value === 'fazufi' && e.target.pass.value === 'fazufi') {
      localStorage.setItem('token', '1klsdfjsalkjfjfkdklsdjfsfjejr')
      this.props.history.push('/admin')
    } else {
      alert('incorrect password')
    }
    //   console.log(e.target.user.value)
    // console.log(e.target.pass.value)
  }
  


  render() {
    return (
      <Form onSubmit={(e) => this.masukAdmin(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="user" type="text" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="pass" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
