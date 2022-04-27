
import React, { useEffect, useState } from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import axios from 'axios'

import HeaderBottom from '../Components/HeaderBottom'
import TitleCatagory from '../Components/TitleCatagory'
import Footer from '../Components/Footer'
import Loading from '../Components/LoadingError/Loading'
import Message from '../Components/LoadingError/Error'
import { userResgisterFail, userResgisterRequest, userResgisterSuccess } from '../redux/user/userRegisterSlice'
import { userLoginSuccess } from '../redux/user/userLoginSlice'
import { useDispatch, useSelector } from 'react-redux'

function RegisterScreen() {
    window.scrollTo(0, 0);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const history = useHistory()
  const location = useLocation()

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  const redirect = location.search.includes("qty") 
    ? `${location.search.split("=")[1]}=${location.search.split("=")[2]}`
    : location.search 
    ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    const resgisterUser = async (name, email, password) => {
      try {
        dispatch(userResgisterRequest())
        const { data } = await axios.post(
          `/api/users`,
          { name, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          })
        localStorage.setItem("userInfo", JSON.stringify(data))
        dispatch(userResgisterSuccess(data))
        dispatch(userLoginSuccess(data))
      } catch (error) {
        const errorMessage = error.response && error.response.data.message
          ? error.response.data.message
          : error.message
        dispatch(userResgisterFail(errorMessage))
      }
    }
    resgisterUser(name, email, password)
  }
    return (
        <>
            <HeaderBottom />
            <TitleCatagory>Đăng ký</TitleCatagory>
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}

                <form
                    className="Login col-md-8 col-lg-4 col-11"
                    onSubmit={submitHandler}
                >
                    <input
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Đăng ký</button>
                    <p>
                        <Link 
                            to={redirect ? `/login?redirect=${redirect}` : "/login"}
                        >
                            Bạn đã có tài khoản <strong>Đăng nhập</strong>
                        </Link>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default RegisterScreen