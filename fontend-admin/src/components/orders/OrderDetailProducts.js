import React from "react"
import { Link } from "react-router-dom"

const OrderDetailProducts = (props) => {
  const { order, loading } = props
  const newOrder = {...order}
  
  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100)
    }
    
    newOrder.itemsPrice = addDecimals(
      newOrder.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  return (
    <table className="table border table-lg tableRes2">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{item.price} VND</td>
            <td>{item.qty} </td>
            <td className="text-center"> {item.qty * item.price} VND</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>{newOrder.itemsPrice} VND</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>{order.shippingPrice} VND</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">{order.totalPrice} VND</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isConfirm ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Confirm
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Confirm
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default OrderDetailProducts
