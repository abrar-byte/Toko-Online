import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

// Coba di sini adalah komponen keranjang ya Ges
class Coba extends Component {
  tambah = (item) => {
    const keranjang = this.props.keranjang
    const i = keranjang.findIndex(s => s.nama === item.nama)
    if (i < 0) {
      keranjang.push({ nama: item.nama, harga: item.harga, jumlah: 1, total: item.harga })
    } else {
      keranjang[i].harga = item.harga
      keranjang[i].jumlah = keranjang[i].jumlah + 1
      keranjang[i].total = keranjang[i].jumlah * item.harga
    }
    this.props.fungsiKeranjang(keranjang)
    localStorage.setItem('keranjang', JSON.stringify(keranjang))
    this.total()
    this.jumlah()
  }
  kurang = (item) => {
    const keranjang = this.props.keranjang
    // mengecek apakah di dalam keranjang sudah ada item apa belum
    const i = keranjang.findIndex(s => s.nama === item.nama)
    if (keranjang[i].jumlah <= 1) {
      keranjang.splice(i, 1)
    } else {
      keranjang[i].harga = item.harga
      keranjang[i].jumlah = keranjang[i].jumlah - 1
      keranjang[i].total = keranjang[i].jumlah * item.harga
    }
    this.props.fungsiKeranjang(keranjang)
    localStorage.setItem('keranjang', JSON.stringify(keranjang))
    this.total()
    this.jumlah()

  }

  hapus = () => {
    this.props.fungsiKeranjang([])
    this.props.fungsiTotal(0)
    localStorage.removeItem('keranjang')
    this.jumlah()


  }
  jumlah = () => {
    let jumlah = this.props.keranjang
    let allJumlah = jumlah.reduce((sum, data) => sum + data.jumlah, 0)
    this.props.fungsiJumlah(allJumlah)
  }
  total = () => {
    let total = this.props.keranjang
    let allTotal = total.reduce((sum, data) => sum + data.total, 0)
    this.props.fungsiTotal(allTotal)
  }
  render() {
    console.log(this.props.total);
    console.log(this.props.keranjang);

    return (
      <div>
        {this.props.keranjang &&
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
            <tbody>
              {this.props.keranjang.map((item, i) =>

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
                    <strong>Rp {this.props.total}</strong>
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

const mapStatetoProps = (state) => {
  return {
    keranjang: state.keranjang,
    total: state.total,

  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    fungsiKeranjang: (p) => dispatch({ type: "fungsi1", keranjang: p }),
    fungsiJumlah: (p) => dispatch({ type: "fungsi2", jumlah: p }),
    fungsiTotal: (p) => dispatch({ type: "fungsi3", total: p })

  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Coba)