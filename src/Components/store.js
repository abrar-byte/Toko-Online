import { createStore } from "redux"

const initialState = {
  keranjang: JSON.parse(localStorage.getItem("keranjang")) || [],
  jumlah: 0,
  total: 0,
}

const reducer = (state = initialState, a) => {
  if (a.type === "fungsi1") {
    return { ...state, keranjang: a.keranjang }
  }
  if (a.type === "fungsi2") {
    return { ...state, jumlah: a.jumlah }
  }
  if (a.type === "fungsi3") {
    return { ...state, total: a.total }
  }
  return state
}

export const store = createStore(reducer)