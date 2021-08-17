import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Coba di sini adalah komponen keranjang ya Ges
export default class Coba extends Component {

  render() {
    return (
      <div>
        {this.props.basket &&
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
              {this.props.basket.map((item, i) =>

                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.nama}</td>
                  <td>
                    <Button onClick={() => this.props.tambah(item)}>Tambah</Button>
                  </td>
                  <td>{item.jumlah}</td>
                  <td>
                    <Button onClick={() => this.props.kurang(item)}>Kurang</Button>
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
                    <strong>Rp {this.props.stotal}</strong>
                  </h4>
                </td>
              </tr>
            </tbody>

          </Table>}
        <br />
        <Button onClick={this.props.hapus}>Hapus</Button>
        {/* {<Badeg jumlah="ABC" />} */}
      </div>
    )
  }
}
