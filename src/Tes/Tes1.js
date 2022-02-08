import React, { Component } from 'react'
// ngetes parsing props
export default class Tes1 extends Component {
  render() {
    return (
      <div>
        <h1>Tes 1</h1>
        <h2>{this.props.nama}</h2>
        {/* <button onClick={this.props.ubah}>UBAH</button> */}
      </div>
    )
  }
}
