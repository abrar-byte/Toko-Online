import React, { Component } from 'react'
import Tes1 from './Tes1'
// ngetes parsing props

export default class Tes extends Component {
  state = {
    nama: "Usamah"
  }

  ubah = () => {
    this.setState({ nama: "Mujahid" })
  }
  render() {
    return (
      <div>
        <h1>Tes</h1>
        <Tes1 nama={this.state.nama} ubah={this.ubah} />
        <button onClick={this.ubah}>Tambah</button>
      </div>
    )
  }
}
