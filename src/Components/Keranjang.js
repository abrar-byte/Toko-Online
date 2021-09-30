import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { numberWithCommas } from "./utils";
import axios from "axios";

// Coba di sini adalah komponen keranjang ya Ges
class Coba extends Component {
  state = {
    keranjang: [],
    total: 0
  }

  // async componentDidMount() {
  //   await axios
  //     .get("keranjang")
  //     .then((res) => {
  //       const data = res.data;
  //       console.log(data);
  //       this.setState({ keranjang: data });
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  //   this.total()
  // }

  tambah = async (item) => {

    const payload = { ...item, jumlah: item.jumlah + 1, total: item.total + item.price }
    await axios.put(`keranjang/${item.id}`, payload)
    // ${} memperlakukan item yg ada di antara itu sebagai js
    await axios
      .get("keranjang")
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ keranjang: data });
      })
      .catch((error) => {
        throw error;
      });
    this.total()
  };
  kurang = (item) => {
    const payload = { ...item, jumlah: item.jumlah - 1, total: item.total - item.price }
    if (item.jumlah < 2) {
      axios.delete(`keranjang/${item.id}`)
    } else {

      axios.put(`keranjang/${item.id}`, payload)
    }
    axios
      .get("keranjang")
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ keranjang: data });
      })
      .catch((error) => {
        throw error;
      });
    this.total()

  };


  hapus = () => {
    this.props.fungsiKeranjang([]);
    this.props.fungsiTotal(0);
    this.props.fungsiJumlah(0);
    localStorage.removeItem("keranjang");
  };
  jumlah = () => {
    let jumlah = this.props.keranjang;
    let allJumlah = jumlah.reduce((sum, data) => sum + data.jumlah, 0);
    this.props.fungsiJumlah(allJumlah);
  };
  total = () => {
    let total = this.state.keranjang;
    let allTotal = total.reduce((sum, data) => sum + data.total, 0);
    console.log(allTotal)
    console.log(total)
    this.setState({ total: allTotal });
  };
  render() {
    // console.log(this.props.total);
    // console.log(this.props.keranjang);

    return (
      <>
        <div>
          {this.props.basket && (
            <table className="table-auto border-2 border-solid border-red-500 px-2 py-2 text-center m-auto ">
              <thead>
                <tr className="bg-yellow-200">
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                    No
                  </th>
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                    Nama
                  </th>
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center"></th>
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                    Jumlah
                  </th>
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center"></th>
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                    Harga
                  </th>
                  <th className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.basket.map((item, i) => (
                  <tr key={i}>
                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      {i + 1}
                    </td>
                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      {item.title}
                    </td>
                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      <Button onClick={() => this.props.tambah(item)}>Tambah</Button>
                    </td>
                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      {item.jumlah}
                    </td>
                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      <Button onClick={() => this.props.kurang(item)}>Kurang</Button>
                    </td>

                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      Rp.{numberWithCommas(item.price)}
                    </td>
                    <td className="border-2 border-solid border-red-500 px-2 py-2 text-center">
                      Rp.{numberWithCommas(item.total)}
                    </td>
                  </tr>
                ))}
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
                      <strong>Rp. {numberWithCommas(this.props.stotal)}</strong>
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          <br />
        </div>
        <div className="grid">
          <Button className="place-self-center " onClick={this.props.hapus}>
            Hapus
          </Button>
        </div>
      </>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    keranjang: state.keranjang,
    total: state.total,
    jumlah: state.jumlah,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    fungsiKeranjang: (p) => dispatch({ type: "fungsi1", keranjang: p }),
    fungsiJumlah: (p) => dispatch({ type: "fungsi2", jumlah: p }),
    fungsiTotal: (p) => dispatch({ type: "fungsi3", total: p }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Coba);
