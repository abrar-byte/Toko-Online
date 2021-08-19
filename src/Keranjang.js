import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// ini tidak dipakai ya ges ya
export default class Keranjang extends Component {
  state = {
    // basket: JSON.parse(localStorage.getItem("keranjang")) || []
    basket: JSON.parse(localStorage.getItem("keranjang")) || [],
    total: 0,


  }
  filterByProperty = (array, propertyName) => {
    var occurrences = {}
    return array.filter(function (x) {
      var property = x[propertyName]
      if (occurrences[property]) {
        return false;
      }
      occurrences[property] = true;
      return true;
    })
  }

  componentDidMount() {
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
  }

  hapus = () => {
    this.setState({ basket: [] })
    this.setState({ total: 0 })
    localStorage.removeItem('keranjang')

  }
  total = () => {
    let total = this.state.basket
    let allTotal = total.reduce((sum, data) => sum + data.total, 0)
    console.log(allTotal);
    this.setState({ total: allTotal })
  }


  render() {
    console.log(this.state.total);
    return (
      <div>
        {this.state.basket &&
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th></th>
                <th>Jumlah</th>
                <th></th>

                <th>Harga</th>
                <th>Total</th>
              </tr>
            </thead>
            {/* {this.MasukTroley.map((item, i) => */}
            <tbody>
              {this.state.basket.map((item, i) =>

                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.nama}</td>
                  <td>
                    <Button onClick={() => this.tambah(item)}>Tambah</Button>
                  </td>
                  <td>{item.jumlah}</td>
                  <td>
                    <Button onClick={() => this.kurang(item)}>Kurang</Button>
                  </td>

                  <td>Rp.{item.harga}</td>
                  <td>Rp.{item.total}</td>
                </tr>
              )}

            </tbody>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <h4>
                    <strong>TOTAL</strong>
                  </h4>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <h4>
                    <strong>Rp {this.state.total}</strong>
                  </h4>
                </td>
              </tr>
            </tbody>

          </Table>}
        <br />
        <Button onClick={this.hapus}>Hapus</Button>
        {/* {<Badeg jumlah="ABC" />} */}
      </div>
    )
  }
}
