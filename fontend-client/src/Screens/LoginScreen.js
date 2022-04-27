
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

import HeaderBottom from '../Components/HeaderBottom'
import TitleCatagory from '../Components/TitleCatagory'
import Footer from '../Components/Footer'
import Message from '../Components/LoadingError/Error'
import Loading from '../Components/LoadingError/Loading'
import { userLoginFail, userLoginRequest, userLoginSuccess } from '../redux/user/userLoginSlice'
import { useDispatch, useSelector } from 'react-redux'

function LoginScreen() {
    window.scrollTo(0, 0)
    const history = useHistory()
    const location = useLocation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    
    const redirect = location.search.includes("qty") 
    ? `${location.search.split("=")[1]}=${location.search.split("=")[2]}`
    : location.search 
    ? location.search.split("=")[1] : "/"

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        const LoginUser = async (email, password) => {
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
                localStorage.setItem("userInfo", JSON.stringify(data))
                dispatch(userLoginSuccess(data))
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
            <HeaderBottom />
            <TitleCatagory>Đăng nhập</TitleCatagory>
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
                <form
                    className="Login col-md-8 col-lg-4 col-11"
                    onSubmit={submitHandler}
                >
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
                    <button type="submit">Đăng nhập</button>
                    <p>
                        <Link
                            to={redirect ? `/register?redirect=${redirect}` : "/register"}
                        >
                            Tạo tài khoản
                        </Link>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default LoginScreen
