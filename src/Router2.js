import React, { Component } from 'react'
import { Nav, Navbar, Form, Badge, Table } from 'react-bootstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";
import Beli from './beli';
import './Navbar.css'
import Detail from './Detail';
import Tes from './Tes/Tes';
import Coba from './Coba';
import './style.css';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      basket: JSON.parse(localStorage.getItem("keranjang")) || [],
      jumlah: 0,
      total: 0,

    };
  }

  componentDidMount() {
    this.jumlah()
    this.total()
  }

  tambah = (item) => {
    const keranjang = this.state.basket
    const i = keranjang.findIndex(s => s.nama === item.nama)
    if (i < 0) {
      keranjang.push({ nama: item.nama, harga: item.harga, jumlah: 1, total: item.harga })
    } else {
      keranjang[i].harga = item.harga
      keranjang[i].jumlah = keranjang[i].jumlah + 1
      keranjang[i].total = keranjang[i].jumlah * item.harga
    }
    this.setState({ basket: keranjang })
    localStorage.setItem('keranjang', JSON.stringify(keranjang))
    this.total()
    this.jumlah()
  }
  kurang = (item) => {
    const keranjang = this.state.basket
    // mengecek apakah di dalam keranjang sudah ada item apa belum
    const i = keranjang.findIndex(s => s.nama === item.nama)
    if (keranjang[i].jumlah <= 1) {
      keranjang.splice(i, 1)
    } else {
      keranjang[i].harga = item.harga
      keranjang[i].jumlah = keranjang[i].jumlah - 1
      keranjang[i].total = keranjang[i].jumlah * item.harga
    }
    this.setState({ basket: keranjang })
    localStorage.setItem('keranjang', JSON.stringify(keranjang))
    this.total()
    this.jumlah()

  }

  hapus = () => {
    this.setState({ basket: [] })
    this.setState({ total: 0 })
    localStorage.removeItem('keranjang')
    this.jumlah()


  }
  total = () => {
    let total = this.state.basket
    let allTotal = total.reduce((sum, data) => sum + data.total, 0)
    console.log(allTotal);
    this.setState({ total: allTotal })
  }
  jumlah = () => {
    let jumlah = this.state.basket
    let allJumlah = jumlah.reduce((sum, data) => sum + data.jumlah, 0)
    this.setState({ jumlah: allJumlah })
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  onHover = (p) => {
    this.setState({
      popoverOpen: p,
    })
  }



  render() {

    return (
      <div>
        <Router>
          <div>
            <Navbar bg="light" expand="lg">
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

              <Navbar.Brand className="ml-1">
                <Form.Control type="search" placeholder="" />
              </Navbar.Brand>
              <Nav.Link  >
                <div >
                  <Link to="/keranjang" id="Popover1"
                    type="button"
                    onMouseEnter={() => this.onHover(true)}
                    onMouseLeave={() => this.onHover(false)}>
                    <img src="2849824-basket-buy-market-multimedia-shop-shopping-store_107977 (1).png" width="25" height="25" />
                    <Badge bg="primary" className="text-primary">{this.state.jumlah}</Badge>
                    {/* <button onClick={this.jumlah}>B</button> */}
                  </Link>
                  <Popover size="responsive" placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle} >
                    <PopoverHeader>Keranjang</PopoverHeader>
                    <PopoverBody /* style={{ width: "500px" }} */>{/* <Keranjang /> */}
                      {this.state.basket &&
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
                            {this.state.basket.map((item, i) =>

                              <tr key={i}>
                                <td>{item.nama}</td>
                                <td>{item.jumlah}</td>
                                <td>Rp.{item.harga}</td>
                                {/* <td>Rp.{item.total}</td> */}
                              </tr>
                            )}

                          </tbody>
                          <tbody>
                            <tr>

                              <td>

                                <strong>TOTAL</strong>

                              </td>

                              <td></td>


                              <td>

                                <strong>Rp {this.state.total}</strong>

                              </td>
                            </tr>
                          </tbody>
                        </Table>}
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

                <Navbar.Text>Login</Navbar.Text>
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
                {/* <Keranjang jumlah={this.jumlah} /> */}
                <Coba basket={this.state.basket} stotal={this.state.total} sjumlah={this.state.jumlah} jumlah={this.jumlah} tambah={this.tambah} kurang={this.kurang} hapus={this.hapus} total={this.total} />

              </Route>
              <Route path="/detail">
                <Detail tambah={this.tambah} basket={this.state.basket} jumlah={this.jumlah} total={this.total} />
              </Route>
              <Route path="/tes">
                <Tes />
              </Route>
            </Switch>
          </div>
        </Router >
      </div>
    );
  }
}
