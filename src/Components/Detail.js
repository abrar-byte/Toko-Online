// import { Button } from "bootstrap";z`
import React, { Component } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { numberWithCommas } from "./utils";
import axios from "axios";

class Detail extends Component {
  state = {
    detil: null,
  };

  componentDidMount() {
    axios
      .get("detail")
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ detil: data });
      })
      .catch((error) => {
        throw error;
      });
  }

  jumlah = () => {
    let jumlah = this.props.keranjang;
    let allJumlah = jumlah.reduce((sum, data) => sum + data.jumlah, 0);
    this.props.fungsiJumlah(allJumlah);
  };
  total = () => {
    let total = this.props.keranjang;
    let allTotal = total.reduce((sum, data) => sum + data.total, 0);
    this.props.fungsiTotal(allTotal);
  };

  fungsiTambah = async (value) => {
    let detil = this.state.detil;
    await axios.get("keranjang").then((res) => {
      const i = res.data && res.data.findIndex((d) => d.id === detil.id);
      if (!res.data[i]) {
        const keranjang = {
          title: detil.title,
          jumlah: 1,
          price: detil.price,
          total: detil.price,
          id: detil.id,
        };
        axios
          .post("keranjang", keranjang)
          .then(async () => {
            axios
              .get("keranjang")
              .then((res) => {
                const data = res.data;
                console.log(data);
              })
              .catch((error) => {
                throw error;
              });

            console.log("keranjang");
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      } else {
        console.log("jalan");
        const data = {
          title: res.data[i].title,
          jumlah: res.data[i].jumlah + 1,
          price: res.data[i].price,
          total: res.data[i].total + res.data[i].price,
        };
        console.log(data);

        detil &&
          axios.put("keranjang/" + detil.id, data).then(() => {
            axios.get("keranjang").then((res) => {
              const data = res.data;
              console.log(data);
              // this.setState({ keranjang: data });
            });
          });
      }
    });

    this.props.total();
    this.props.jumlah();
  };

  tambahin = () => {
    const keranjang = this.props.keranjang;
    const detail = this.state.detail;
    const obj = {
      skuId: detail.skuId,
      nama: detail.itemTitle,
      jumlah: 1,
      harga: detail.itemPrice,
      total: detail.itemPrice,
    };
    const index =
      keranjang && keranjang.findIndex((p) => p.skuId === detail.skuId);
    if (keranjang === null) {
      keranjang = [obj];
      localStorage.setItem("keranjang", JSON.stringify(keranjang));
      // console.log(detail);
    }
    if (keranjang && index < 0) {
      keranjang.push(obj);
      localStorage.setItem("keranjang", JSON.stringify(keranjang));
    }
    if (keranjang && keranjang[index]) {
      keranjang[index].jumlah = keranjang[index].jumlah + 1;
      keranjang[index].total = keranjang[index].jumlah * keranjang[index].harga;
      localStorage.setItem("keranjang", JSON.stringify(keranjang));
    }
    this.jumlah();
    this.total();
  };

  render() {
    // console.log(this.props.keranjang);
    // console.log(this.props.fungsiJumlah);
    // console.log(this.props.fungsiTotal);
    let { detil } = this.state;
    return (
      <div>
        {detil && (
          <Row className="justify-content-md-center">
            <Col md={3}>
              <Card className="min-vh-100 " bg="light" text="dark">
                <Card.Img
                  variant="top"
                  src={detil.img}
                  width="200"
                  height="200"
                />
                <Card.Body>
                  <Card.Title>
                    <th>{detil.title}</th>
                  </Card.Title>
                  <Card.Text>
                    <td>Rp. {numberWithCommas(detil.price)}</td>
                  </Card.Text>
                </Card.Body>
                <Link to="/keranjang">
                  <Button onClick={this.fungsiTambah}>Tambah</Button>
                </Link>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return { keranjang: state.keranjang };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    fungsiJumlah: (p) => dispatch({ type: "fungsi2", jumlah: p }),
    fungsiTotal: (p) => dispatch({ type: "fungsi3", total: p }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Detail);
