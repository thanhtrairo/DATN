import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderBottom from "../Components/HeaderBottom"
import TitleCatagory from "../Components/TitleCatagory"
import { cartSaveShippingAddress } from "../redux/cart/cartSlice"

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0)

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [phone, setPhone] = useState(shippingAddress.phone)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(cartSaveShippingAddress({address, city, phone, country}))
    localStorage.setItem("shippingAddress", JSON.stringify({address, city, phone, country}))
    history.push("/placeorder")
  }
  return (
    <>
      <HeaderBottom />
      <TitleCatagory>Địa Chỉ Giao Hàng</TitleCatagory>
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>Địa chỉ giao hàng</h6>
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  )
}

export default ShippingScreen
