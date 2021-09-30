import React, { Component } from "react";
import { Nav, Navbar, Form, Badge, Table, Button } from "react-bootstrap";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Beli from "./Beli";
import "./Navbar.css";
import Detail from "./Detail";
import Tes from "../Tes/Tes";
import Coba from "./Keranjang";
import "./style.css";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import Login from "./Login";
import Admin from "./Admin";
import { numberWithCommas } from "./utils";
import axios from "axios";

// axios global

const HarusLogin = ({
  component: Component,
  ...props /* ini untuk merender props propsnya */
}) => {
  // di sini component diubah menjadi Component
  // const HarusLogin adalah functional componet
  const token = localStorage.getItem("token");
  return (
    <Route
      {...props}
      render={(props2) =>
        token /* jika token ada */ ? (
          props.path === "/login" /* jika pathnya adalah /login */ ? (
            <Redirect to="/admin" /> /* maka dimasukkan ke /admin */
          ) : (
            <Component
              {...props2}
            /> /* jika pathnya bukan /login dan ada token maka kembali ke Component yaitu Admin */
            // Ini Visual pembawaan props, knp componentnya jadi huruf besar, krn harus besar Huruf Awalnya
          )
        ) : (
          <Redirect to="/login" /> /* jika tidak ada token dan pathnya login maka masuk ke login */
        )
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      basket: [],
      jumlah: 0,
      total: 0,
    };
  }
  async componentDidMount() {
    await axios
      .get("keranjang")
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ basket: data });
      })
      .catch((error) => {
        throw error;
      });
    this.total();
    this.jumlah();
  }

  // async componentDidUpdate() {
  //   await axios
  //     .get("keranjang")
  //     .then((res) => {
  //       const data = res.data;
  //       console.log(data);
  //       this.setState({ basket: data });
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   this.total();
  //   this.jumlah();
  // }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  onHover = (p) => {
    this.setState({
      popoverOpen: p,
    });
  };
  total = async () => {
    let total = this.state.basket;
    let allTotal = total.reduce((sum, data) => sum + data.total, 0);
    console.log(allTotal);
    await this.setState({ total: allTotal });
  };

  jumlah = async () => {
    let jumlah = this.state.basket;
    let allJumlah = await jumlah.reduce((sum, data) => sum + data.jumlah, 0);
    await this.setState({ jumlah: allJumlah });
    console.log(jumlah);
  };

  tambah = async (item) => {
    const payload = {
      ...item,
      jumlah: item.jumlah + 1,
      total: item.total + item.price,
    };
    await axios.put(`keranjang/${item.id}`, payload).then(async () => {
      await axios
        .get("keranjang")
        .then(async (res) => {
          const data = res.data;
          console.log(data);
          await this.setState({ basket: data });
        })
        .catch((error) => {
          throw error;
        });
    });
    // ${} memperlakukan item yg ada di antara itu sebagai js
    console.log("jumlah", this.state.basket.jumlah);
    await this.total();
    await this.jumlah();
  };
  kurang = async (item) => {
    const payload = {
      ...item,
      jumlah: item.jumlah - 1,
      total: item.total - item.price,
    };
    if (item.jumlah < 2) {
      await axios.delete(`keranjang/${item.id}`);
    } else {
      await axios.put(`keranjang/${item.id}`, payload);
    }
    await axios
      .get("keranjang")
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ basket: data });
      })
      .catch((error) => {
        throw error;
      });
    this.total();
    this.jumlah();
  };
  hapus = async () => {
    this.setState({ basket: [] });
    this.setState({ total: 0 });

    for (let index = 0; index < this.state.basket.length; index++) {
      const element = this.state.basket[index];
      await axios.delete(`keranjang/${element.id}`);
    }
  };

  render() {
    return (
      <div>
        <Router history={createBrowserHistory()}>
          <div>
            <Navbar bg="warning" expand="lg">
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src="logo.png"
                  width="180"
                  height="130"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Brand className="ml-1">
                <h5>Search</h5>
              </Navbar.Brand>

              <Navbar.Brand className="ml-1">
                <Form.Control
                  type="text"
                  placeholder="cari apa?"
                  className="mr-sm-2"
                />
              </Navbar.Brand>
              <Nav.Link>
                <div>
                  <Link
                    to="/keranjang"
                    id="Popover1"
                    type="button"
                    onMouseEnter={() => this.onHover(true)}
                    onMouseLeave={() => this.onHover(false)}
                  >
                    <img
                      src="2849824-basket-buy-market-multimedia-shop-shopping-store_107977 (1).png"
                      width="25"
                      height="25"
                    />
                    <Badge bg="primary" className="text-primary">
                      {this.state.jumlah}
                    </Badge>
                  </Link>
                  <Popover
                    size="responsive"
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target="Popover1"
                    toggle={this.toggle}
                  >
                    <PopoverHeader>Keranjang</PopoverHeader>
                    <PopoverBody /* style={{ width: "500px" }} */>
                      {/* <Keranjang /> */}
                      {this.state.basket && (
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Nama</th>
                              <th>Jumlah</th>
                              <th>Harga</th>
                              {/* <th>Total</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.basket.map((item, i) => (
                              <tr key={i}>
                                <td>{item.title}</td>
                                <td>{item.jumlah}</td>
                                <td>Rp.{numberWithCommas(item.price)}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tbody>
                            <tr>
                              <td>
                                <strong>TOTAL</strong>
                              </td>

                              <td></td>

                              <td>
                                <strong>
                                  Rp.{numberWithCommas(this.state.total)}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      )}
                    </PopoverBody>
                  </Popover>
                </div>
              </Nav.Link>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/detail">Detail</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/tes">Tes</Link>
              </Nav.Link>

              <Navbar.Collapse className="justify-content-end">
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>
              </Navbar.Collapse>
            </Navbar>

            <hr />

            {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
            <Switch>
              <Route exact path="/">
                <Beli />
              </Route>
              <Route path="/keranjang">
                <Coba
                  basket={this.state.basket}
                  stotal={this.state.total}
                  sjumlah={this.state.jumlah}
                  jumlah={this.jumlah}
                  tambah={this.tambah}
                  kurang={this.kurang}
                  hapus={this.hapus}
                  total={this.total}
                />
              </Route>
              <Route path="/detail">
                <Detail
                  tambah={this.tambah}
                  basket={this.state.basket}
                  jumlah={this.jumlah}
                  total={this.total}
                />
              </Route>
              <Route path="/tes">
                <Tes />
              </Route>
              <Route path="/login" component={Login} />

              <HarusLogin path="/admin" component={Admin} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    keranjang: state.keranjang,
    jumlah: state.jumlah,
    total: state.total,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    fungsiKeranjang: (p) => dispatch({ type: "fungsi1", keranjang: p }),
    fungsiJumlah: (p) => dispatch({ type: "fungsi2", jumlah: p }),
    fungsiTotal: (p) => dispatch({ type: "fungsi3", total: p }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
