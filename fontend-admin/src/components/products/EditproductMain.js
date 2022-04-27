import React, { useState, useEffect } from "react"
import Toast from "./../LoadingError/Toast"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from 'axios'

import Message from "../LoadingError/Error"
import Loading from "../LoadingError/Loading"
import { productUpdateFail, productUpdateRequest, productUpdateReset, productUpdateSuccess } from "../../redux/product/productUpdateSlice"
import { userLogout } from "../../redux/user/userLoginSlice"
import { productEditFail, productEditRequest, productEditSuccess } from "../../redux/product/productEditSlice"

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const EditProductMain = ({ productId }) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState("")

  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)

  const productEdit = useSelector((state) => state.productEdit)
  const { loading, error, product } = productEdit

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch(productUpdateReset())
      toast.success("Product Updated", ToastObjects)
    } else {
      if (!product.name || product._id !== productId) {
        const editProduct = async (id) => {
          try {
            dispatch(productEditRequest())
            const { data } = await axios.get(`/api/products/${id}`)
            dispatch(productEditSuccess(data))
          } catch (error) {
            const message =
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            if (message === "Not authorized, token failed") {
              dispatch(userLogout())
            }
            dispatch(productEditFail(message))
          }
        }
        editProduct(productId)
      } else {
        setName(product.name)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setImage(product.image)
        setPrice(product.price)
        setCategories(product.categories)
      }
    }
  }, [product, dispatch, productId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    const updateProduct = async (product) => {
      try {
        dispatch(productUpdateRequest());
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
    
        const { data } = await axios.put(`/api/products/${product._id}`,product,config);
    
        dispatch(productUpdateSuccess(data));
        dispatch(productEditSuccess(data));
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(userLogout());
        }
        dispatch(productUpdateFail(message));
      }
    }
    updateProduct({
      _id: productId,
      name,
      price,
      description,
      image,
      countInStock,
      categories
    })
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
            <h2 className="content-title">Update Product</h2>
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
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
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
                          <option value="new">New</option>
                          <option value="medium">Medium</option>
                          <option value="mini">Mini</option>
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
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default EditProductMain
