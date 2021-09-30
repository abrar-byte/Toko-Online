import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";
import { numberWithCommas } from './utils';
import axios from 'axios';
import { CardFooter } from 'reactstrap';


export default class Beli extends Component {
  state = {
    produk: []
  }


  componentDidMount() {
    axios.get("produk")
      .then(res => {
        const data = res.data
        console.log(data);
        this.setState({ produk: data })
      })
      .catch((error) => {
        throw error;
      })

  }
  masuk = (i) => {
    let produk = this.state.produk
    const keranjang = {
      title: produk[i].title,
      price: produk[i].price,
      img: produk[i].img,
      id: produk[i].id

    }
    axios
      .post("detail", keranjang)
      .then((res) => {
        console.log("Masuk");
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });




  }

  render() {
    let produk = this.state.produk
    console.log(produk)
    return (
      <div>
        <Container fluid style={{ backgroundColor: 'orange' }}>
          <Row>
            <Col>
              <Row>
                <h1 style={{ color: "white" }}>Rekomendasi</h1>

                {produk?.map((item, i) =>
                  <Col key={i} lg={3} md={4} sm={6} >
                    <Card className="min-vh-100 my-3" bg="light" text="dark" >
                      <Card.Img variant="top" src={item.img} width="200" height="200" />
                      <Card.Body>
                        <Card.Title>
                          <th>{item.title}</th>
                        </Card.Title>
                        <Card.Text>
                          <td>Rp. {numberWithCommas(item.price)}</td>
                        </Card.Text>
                      </Card.Body>
                      <CardFooter>
                        <Link className="d-flex justify-content-center" to="/detail"><Button onClick={() => this.masuk(i)}>Check In</Button></Link>
                      </CardFooter>
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

