import React, { Component } from 'react'
import { Form, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="shopee-logo.svg"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            Belii
          </Navbar.Brand>
          <Nav.Item>
            <Form.Control type="search" placeholder="" />
          </Nav.Item>
          <Navbar.Collapse className="justify-content-end">

            <Navbar.Text>Login</Navbar.Text>
          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }
}
