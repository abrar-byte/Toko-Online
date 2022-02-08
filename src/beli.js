import React, { Component } from 'react'
import produk from './lazada.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";


export default class Beli extends Component {
  state = {
    produk,
    // total: 0
  }
  // masuk = () => {
  //   let produk = this.state.produk.data.
  //     resultValue[
  //     "icms-zebra-5000383-2586219"].data
  //   for (let i = 0; i < produk.length; i++) {
  //     localStorage.setItem("detail", JSON.stringify(produk[i]))
  //   }
  // }

  render() {
    // console.log(this.state.total)
    let produk = this.state.produk.data.
      resultValue[
      "icms-zebra-5000383-2586219"].data
    return (
      <div>
        <Container fluid style={{ backgroundColor: 'gray' }}>
          <Row>
            <Col>
              <Row>
                <h1 style={{ color: "white" }}>Rekomendasi</h1>

                {produk.map((item, i) =>
                  <Col lg={3} md={4} sm={6}>
                    <Card className="min-vh-100 my-3" bg="light" text="dark" key={i}>
                      <Card.Img variant="top" src={item.itemImg} width="200" height="200" />
                      <Card.Body>
                        <Card.Title>
                          <th>{item.itemTitle}</th>
                        </Card.Title>
                        <Card.Text>
                          <td>{item.itemPrice}</td>
                        </Card.Text>
                      </Card.Body>
                      <Link to="/detail"><Button onClick={ () => localStorage.setItem('detail', JSON.stringify(produk[i])) }>Tambah</Button></Link>
                    </Card>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

