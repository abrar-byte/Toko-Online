// import { Button } from "bootstrap";z`
import React, { Component } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Detail extends Component {
  state = {
    detail: localStorage.getItem("detail")
      ? JSON.parse(localStorage.getItem("detail"))
      : null,
    // total: 0,

  };



  tambahin = () => {
    const keranjang = this.props.basket
    const detail = this.state.detail;
    const obj = { skuId: detail.skuId, nama: detail.itemTitle, jumlah: 1, harga: detail.itemPrice, total: detail.itemPrice }
    const index =
      keranjang && keranjang.findIndex((p) => p.skuId === detail.skuId);
    if (keranjang === null) {
      keranjang = [obj]
      localStorage.setItem("keranjang", JSON.stringify(keranjang));
      // console.log(detail);

    }
    if (keranjang && index < 0) {
      keranjang.push(obj);
      localStorage.setItem("keranjang", JSON.stringify(keranjang));

    }
    if (keranjang && keranjang[index]) {
      keranjang[index].jumlah = keranjang[index].jumlah + 1;
      keranjang[index].total =
        keranjang[index].jumlah * keranjang[index].harga;
      localStorage.setItem("keranjang", JSON.stringify(keranjang))
    }
    this.props.jumlah()
    this.props.total()
  }


  render() {
    // console.log(this.state.total);
    return (
      <div>
        {localStorage.getItem("detail") && (
          <Row className="justify-content-md-center">
            <Col md={3}>
              <Card className="min-vh-100 " bg="light" text="dark">
                <Card.Img
                  variant="top"
                  src={this.state.detail.itemImg}
                  width="200"
                  height="200"
                />
                <Card.Body>
                  <Card.Title>
                    <th>{this.state.detail.itemTitle}</th>
                  </Card.Title>
                  <Card.Text>
                    <td>{this.state.detail.itemPrice}</td>
                  </Card.Text>
                </Card.Body>
                <Link to="/keranjang"><Button onClick={this.tambahin}>
                  Tambah
                </Button>
                </Link>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
