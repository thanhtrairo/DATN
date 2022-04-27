import React, { useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from 'axios'

import "./index.css"
import "./responsive.css"
import "react-toastify/dist/ReactToastify.css"

import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/productScreen"
import CategoriesScreen from "./screens/CategoriesScreen"
import OrderScreen from "./screens/OrderScreen"
import OrderDetailScreen from "./screens/OrderDetailScreen"
import AddProduct from "./screens/AddProduct"
import Login from "./screens/LoginScreen"
import UsersScreen from "./screens/UsersScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import NotFound from "./screens/NotFound"
import PrivateRouter from './PrivateRouter'
import { productListFail, productListRequest, productListSuccess } from "./redux/product/productListSlice"
import { userLogout } from "./redux/user/userLoginSlice"
import { orderListFail, orderListRequest, orderListSuccess } from "./redux/order/orderListSlice"
import { useDispatch, useSelector } from "react-redux"
import { getCategoriesFail, getCategoriesRequest, getCategoriesSuccess } from "./redux/catagories/categorieSlice"

function App() {
  const dispatch = useDispatch()

  const {userInfo} = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
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
      const listOrders = async () => {
        try {
          dispatch(orderListRequest())
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
      
          const { data } = await axios.get(`/api/orders/all`, config)
      
          dispatch(orderListSuccess(data))
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === "Not authorized, token failed") {
            dispatch(userLogout())
          }
          dispatch(orderListFail(message))
        }
      }
      listOrders()
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
    }
  }, [dispatch, userInfo])
  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:orderId" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/product/:productId/edit" component={ProductEditScreen} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  )
}

export default App
