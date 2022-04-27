import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify"

import Toast from '../LoadingError/Toast'
import { userLogout } from "../../redux/user/userLoginSlice";
import { createCategoriesFail, createCategoriesRequest, createCategoriesReset, createCategoriesSuccess } from "../../redux/catagories/createCategoriesSlice";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { getCategoriesFail, getCategoriesRequest, getCategoriesSuccess } from "../../redux/catagories/categorieSlice";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
}

const CreateCategory = () => {

  const [name, setName] = useState("")

  const dispatch = useDispatch()

  const { categorieList } = useSelector((state) => state.categories)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { loading, error, categorie } = useSelector((state) => state.createCategories)

  useEffect(() => {
    if (categorie) {
      toast.success("Categories Added", ToastObjects)
      dispatch(createCategoriesReset())
      setName("")
    }
    const getCategories = async () => {
      try {
        dispatch(getCategoriesRequest())

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/categories`, config)

        dispatch(getCategoriesSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(getCategoriesFail(message))
      }
    }
    getCategories()
  }, [categorie, dispatch, userInfo.token])

  const handleCreate = (e) => {
    e.preventDefault()
    const createCategories = async (name) => {
      try {
        dispatch(createCategoriesRequest())

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.post(`/api/categories/`, { name }, config)

        dispatch(createCategoriesSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(createCategoriesFail(message))
      }
    }
    createCategories(name)
  }

  return (
    <>
      <Toast />
      <div className="col-md-12 col-lg-6">
        <form>
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <div className="mb-4">
            <label htmlFor="product_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="form-control py-3"
              id="product_name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary py-3" onClick={handleCreate}>Create category</button>
          </div>
        </form>
      </div>
      <div className="col-md-12 col-lg-6">
        <table className="table">
          <thead>
            <tr className="row">
              <th className="col-8">ID</th>
              <th className="col-4">Name</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {categorieList?.map(category => (
              <tr key={category._id} className="row">
                <td className="col-8">{category._id}</td>
                <td className="col-4" style={{ textTransform: "capitalize" }}>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CreateCategory;
