import { Component } from "react";
import { Button, Table, Modal, Form, Row, Col, Container } from 'react-bootstrap';


class Admin extends Component {
  state = {
    stokProduk: JSON.parse(localStorage.getItem('stokProduk')),
    showModalAdmin: false,
    showModalAdminIndex: 0
  }
  componentDidMount() {
    localStorage.setItem('stokProduk', JSON.stringify(this.state.stokProduk))
  }
  handleShow = () => {
    this.setState({ showModalAdmin: true })
  }
  handleClose = () => {
    this.setState({ showModalAdmin: false })
  }

  onEdit = (e, item) => {
    e.preventDefault()
    this.setState({ showModalAdmin: false })
    this.handleShow()
    const stokProduk = this.state.stokProduk
    const i = stokProduk.findIndex(s => s.nama === item.nama)
    this.setState({ showModalAdminIndex: i })
  }
  onDelete = (e, item) => {
    e.preventDefault()
    const stokProduk = this.state.stokProduk
    const i = stokProduk.findIndex(s => s.nama === item.nama)
    stokProduk.splice(i, 1)
    this.setState({ stokProduk })
  }
  onAdd = (e) => {
    e.preventDefault()
    const stokProduk = this.state.stokProduk
    stokProduk.push({ nama: e.target.nama.value, harga: parseInt(e.target.harga.value) })
    localStorage.setItem('stokProduk', JSON.stringify(stokProduk))
    this.setState({ stokProduk })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.handleClose()
    const stokProduk = this.state.stokProduk
    const i = this.state.showModalAdminIndex
    stokProduk[i].nama = e.target.nama.value
    stokProduk[i].harga = e.target.harga.value
    this.setState({ stokProduk: stokProduk })
    localStorage.setItem('stokProduk', JSON.stringify(stokProduk))
  }
  render() {
    return (
      <Container fluid>
        <Row>

          <Col xs={12} md={9}>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Edit</th>
                  <th>Hapus</th>
                </tr>
              </thead>
              <tbody>
                {this.state.stokProduk.map((item, i) =>
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.nama}</td>
                    <td>Rp {item.harga}</td>
                    <td><Button onClick={(e) => this.onEdit(e, item)} >edit</Button></td>
                    <td><Button onClick={(e) => this.onDelete(e, item)} >hapus</Button></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs={6} md={3}>
            <h2>TAMBAH PRODUK</h2>
            <Form onSubmit={this.onAdd}>
              <Form.Group >
                <Form.Control placeholder="nama" name="nama" />
                <Form.Control placeholder="harga" name="harga" />
              </Form.Group>
              <Button type="submit">
                Tambahkan
              </Button>
            </Form>
          </Col>
        </Row>
        <ModalAdmin stokProduk={this.state.stokProduk} showModalAdminIndex={this.state.showModalAdminIndex} showModalAdmin={this.state.showModalAdmin} handleShow={this.handleShow} handleClose={this.handleClose} onSubmit={this.onSubmit} />
      </Container>
    )
  }
}

class ModalAdmin extends Component {
  render() {
    const stokProduk = this.props.stokProduk
    return (
      <Modal show={this.props.showModalAdmin} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT DATA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.onSubmit}>
            <Form.Group >
              <Form.Control name="nomor" defaultValue={this.props.showModalAdminIndex + 1} />
              <Form.Control name="nama" defaultValue={stokProduk[this.props.showModalAdminIndex].nama} />
              <Form.Control name="harga" defaultValue={stokProduk[this.props.showModalAdminIndex].harga} />
            </Form.Group>
            <Button variant="dark" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Admin