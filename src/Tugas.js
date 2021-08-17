import React, { Component } from 'react'

export default class Tugas extends Component {
  state = {
    nama: "Mujahid"
  }

  klik = (x) => {
    this.setState({ nama: x })
  }
  render() {

    return (

      <div>
        <h2>Nama:{this.state.nama}</h2>
        <button onClick={() => this.klik("Gus")}></button>
      </div>
    )
  }
}
