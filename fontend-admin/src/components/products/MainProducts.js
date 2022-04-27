import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Product from "./Product"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Error"
import { userLogout } from "../../redux/user/userLoginSlice"
import { productListFail, productListRequest, productListSuccess } from "../../redux/product/productListSlice"

const MainProducts = () => {
  const dispatch = useDispatch()

  const {categorieList} = useSelector((state) => state.categories)
  const { userInfo } = useSelector(state => state.userLogin)
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { error: errorDelete, success: successDelete } = productDelete

  useEffect(() => {
    const listProducts = async () => {
      try {
        dispatch(productListRequest())

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/products/all`, config)

        dispatch(productListSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(productListFail(message))
      }
    }
    listProducts()
  }, [dispatch, successDelete, userInfo.token])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [arrSearchProduct, setArrSearchProduct] = useState([])

  const handleSearch = () => {
    if (search) {
      const arrSearch = products.filter(product => product.name.includes(search))
      setArrSearchProduct(arrSearch)
    } else {
      setArrSearchProduct([])
    }
  }

  const arrProducts = useMemo(() => {
    setSearch("")
    setArrSearchProduct([])
    if(filter) {
      return products.filter(product => product.categories === filter)
    }
    return products
  }, [filter, products])

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="d-sm-flex justify-content-between align-items-center gx-3 py-3">
            <div>
              <div className="input-group formRes">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  onClick={handleSearch}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
            <div>
              <select
                style={{display: 'inline-block', width: 'auto'}}
                onChange={e => setFilter(e.target.value)}
                value={filter}
                className="form-select"
                aria-label="Default select example">
                <option value="default">Filter</option>
                {categorieList.map(category => (
                  <option value={category.name} key={category._id}>Product {category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {(arrSearchProduct.length > 0 ? arrSearchProduct : arrProducts.length > 0 ? arrProducts : products).map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MainProducts
