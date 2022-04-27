import React, { useEffect, useMemo } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addCart, removeCart } from "../redux/cart/cartSlice";
import HeaderBottom from "../Components/HeaderBottom";
import TitleCatagory from "../Components/TitleCatagory";
import { productUpdateFail, productUpdateRequest, productUpdateSuccess } from '../redux/product/productUpdateSlice'

const CartScreen = () => {
  window.scrollTo(0, 0);
  const { productId } = useParams()
  const location = useLocation()
  const history = useHistory()

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const { cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])

  const total = useMemo(() => {
    return cartItems.reduce((a, i) => a + i.qty * i.price, 0)
  }, [cartItems])

  useEffect(() => {
    const fetchProduct = async (id) => {
      const { data } = await axios.get(`/api/products/${id}`)
      if (productId) {
        dispatch(addCart({
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          description: data.description,
          countInStock: data.countInStock,
          countInSold: data.countInSold,
          categories: data.categories,
          qty
        }))
      }
    }
    fetchProduct(productId)
  }, [dispatch, productId, qty])

  const checkOutHandler = () => {
    history.push("/shipping")
  }

  const removeFromCartHandle = (item) => {
    dispatch(removeCart(item))
  }

  const handleCountInStock = (e, item) => {
    dispatch(addCart({
      ...item,
      qty: Number(e.target.value)
    }))
    const updateProduct = async (pro) => {
      console.log(pro.countInSold)
      try {
        dispatch(productUpdateRequest());

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.put(`/api/products/${pro.product}/stock`, pro, config);

        dispatch(productUpdateSuccess(data));
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(productUpdateFail(message));
      }
    }
    updateProduct({
      ...item,
      countInSold: Number(e.target.value)
    })
  }

  return (
    <>
      <HeaderBottom />
      <TitleCatagory>Giỏ Hàng</TitleCatagory>
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng trống
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/products"
              style={{
                fontSize: "12px",
              }}
            >
              Quay lại shop
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Tổng sản phẩm
              <Link className="text-success mx-2" to="/cart">
                {cartItems.length}
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item, index) => (
              <div className="cart-iterm row" key={item.product}>
                <div
                  onClick={() => removeFromCartHandle(index)}
                  className="remove-button d-flex justify-content-center align-items-center"
                >
                  <i className="fas fa-times"></i>
                </div>
                <div className="cart-image col-md-3">
                  <img src={item.image} alt={item.image} />
                </div>
                <div className="cart-text col-md-5 d-flex align-items-center">
                  <Link to={`/products/${item.product}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </div>
                <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>Số lượng</h6>
                  <select
                    value={item.qty}
                    onChange={(e) => handleCountInStock(e, item)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>Tiền</h6>
                  <h4>{item.price} VND</h4>
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng tiền:</span>
              <span className="total-price">{total} VND</span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/products" className="col-md-6 ">
                <button>Tiếp tục mua hàng</button>
              </Link>
              <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                <button onClick={checkOutHandler}>Thanh toán</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
