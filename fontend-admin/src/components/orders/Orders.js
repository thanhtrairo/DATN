import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = ({ orders, sort }) => {
  const listOrder = useMemo(() => {
    if (sort === 'confirm') {
      return orders.filter(order => order.isConfirm)
    } else if (sort === 'notConfirm') {
      return orders.filter(order => !order.isConfirm)
    } else {
      return orders
    }
  }, [orders, sort])
  return (
    <table className="table tableRes">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
          (listOrder.length > 0 ? listOrder : orders).map((order) => (
            <tr key={order._id}>
              <td>
                <b>{order.user.name}</b>
              </td>
              <td>{order.user.email}</td>
              <td className="d-none d-sm-table-cell">{order.totalPrice} VND</td>
              <td className="d-none d-sm-table-cell">{moment(order.createdAt).format("MMM Do YY")}</td>
              <td>
                {order.isConfirm ? (
                  <span className="badge btn-success">Confirm</span>
                ) : (
                  <span className="badge btn-dark">Not Confirm</span>
                )}
              </td>
              <td className="d-flex justify-content-end align-item-center">
                <Link to={`/order/${order._id}`} className="text-success">
                  <i className="fas fa-eye"></i>
                </Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default memo(Orders);
