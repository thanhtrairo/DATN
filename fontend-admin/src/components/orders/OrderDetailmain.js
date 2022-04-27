import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import OrderDetailProducts from "./OrderDetailProducts"
import OrderDetailInfo from "./OrderDetailInfo"
import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Error"
import {orderDetailRequest, orderDetailSuccess, orderDetailFail} from '../../redux/order/orderDetailSlice'
import { userLogout } from "../../redux/user/userLoginSlice"
import { orderConfirmFail, orderConfirmRequest, orderConfirmSuccess } from "../../redux/order/orderConfirmSlice"

const OrderDetailmain = ({ orderId }) => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  const orderDetail = useSelector((state) => state.orderDetail)
  const { loading, error, order } = orderDetail

  const orderConfirm = useSelector((state) => state.orderConfirm)
  const { loading: loadingConfirm, success: successConfirm } = orderConfirm

  useEffect(() => {
    const getOrderDetails = async (id) => {
      try {
        dispatch(orderDetailRequest())
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
    
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch(orderDetailSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(orderDetailFail(message))
      }
    }
    getOrderDetails(orderId)
  }, [dispatch, orderId, successConfirm, userInfo.token])

  const confirmHandler = () => {
    const confirmOrder = async (order) => {
      try {
        dispatch(orderConfirmRequest())
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
    
        const { data } = await axios.put(`/api/orders/${order._id}/confirm`, {}, config)
        dispatch(orderConfirmSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(orderConfirmFail(message))
      }
    }
    confirmOrder(order)
  }

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isConfirm ? (
                    <button className="btn btn-success col-12">
                      CONFIRM AT ({" "}
                      {moment(order.confirmAt).format("MMM Do YY")})
                    </button>
                  ) : (
                    <>
                      {loadingConfirm && <Loading />}
                      <button
                        onClick={confirmHandler}
                        className="btn btn-dark col-12"
                      >
                        CONFIRM
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default OrderDetailmain
