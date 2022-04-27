import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from 'axios'

import Toast from "../LoadingError/Toast"
import Message from "../LoadingError/Error"
import Loading from "../LoadingError/Loading"
import { productCreateFail, productCreateRequest, productCreateReset, productCreateSuccess } from "../../redux/product/productCreateSlice"
import { userLogout } from "../../redux/user/userLoginSlice"

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}
const AddProductMain = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState("new")

  const dispatch = useDispatch()

  const {categorieList} = useSelector((state) => state.categories)
  const { userInfo } = useSelector(state => state.userLogin)
  const productCreate = useSelector((state) => state.productCreate)
  const { loading, error, product } = productCreate

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects)
      dispatch(productCreateReset())
      setName("")
      setDescription("")
      setCountInStock(0)
      setImage("")
      setPrice(0)
    }
  }, [product, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    const createProduct = async (pro) => {
      try {
        dispatch(productCreateRequest())

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.post(`/api/products/`, pro, config)

        dispatch(productCreateSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(productCreateFail(message))
      }
    }
    createProduct({ name, price, description, image, countInStock, categories })
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_categories" className="form-label">
                      Categories
                    </label>
                    <select 
                      className="form-select form-select-lg mb-3" 
                      aria-label=".form-select-lg example"
                      value={categories}
                      onChange={e => setCategories(e.target.value)}
                    >
                      {categorieList.map(category => (
                        <option style={{textTransform: "capitalize"}} value={category.name} key={category._id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddProductMain
