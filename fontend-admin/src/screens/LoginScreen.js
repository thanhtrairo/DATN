import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"

import { userLoginRequest, userLoginSuccess, userLoginFail } from '../redux/user/userLoginSlice'
import Toast from '../components/LoadingError/Toast'
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const Login = () => {
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [userInfo, history])

  const submitHandler = (e) => {
    e.preventDefault()
    const LoginUser = async (email, password) => {
      const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
      }
      try {
        dispatch(userLoginRequest())
        const { data } = await axios.post(
          `/api/users/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          })

        if (!data.isAdmin === true) {
          toast.error("You are not Admin", ToastObjects)
          dispatch(userLoginFail())
        } else {
          dispatch(userLoginSuccess(data))
        }
        localStorage.setItem("userInfo", JSON.stringify(data))

      } catch (error) {
        const errorMessage = error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        dispatch(userLoginFail(errorMessage))
      }
    }
    LoginUser(email, password)
  }
  return (
    <>
      <Toast />
      <div
        className="card shadow mx-auto"
        style={{ maxWidth: "380px", marginTop: "100px" }}
      >
        <div className="card-body">
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <h4 className="card-title mb-4 text-center">Sign in</h4>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
