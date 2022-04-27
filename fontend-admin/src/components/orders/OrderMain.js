import React, { useState } from "react"
import Message from "../LoadingError/Error"
import Loading from "../LoadingError/Loading"
import Orders from "./Orders"
import { useSelector } from "react-redux"

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const [sort, setSort] = useState("dafault")

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="dafault">Status</option>
                <option value="confirm">Confirm</option>
                <option value="notConfirm">Not confirm</option>
                <option value="showAll">Show all</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} sort={sort}/>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderMain
