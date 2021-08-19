import React, { Component } from 'react'

// ini hanya untuk percobaan

export default class E extends Component {
  state = {
    nama: "Danil",
    hobi: "membaca",
    mobil: "fortuner",
    jenis: "laki laki"
  }

  handle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.name);

  }
  render() {
    return (
      <div>
        <div>
          <p>Nama Saya : {this.state.nama}</p>
          <p>{this.state.hobi}</p>
          <input type="text" name="nama" value="tulis namamu" onChange={this.handle} />
        </div>
      </div>
    )
  }
}
