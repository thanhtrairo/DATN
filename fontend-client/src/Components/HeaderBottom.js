
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from "../img/logo.png"
import { favoriteListMyReset } from '../redux/favorites/favoriteUserSlice'
import { orderListMyReset } from '../redux/order/orderUserSlice'
import { userDetailReset } from '../redux/user/userDetailSlice'
import { userLogout } from '../redux/user/userLoginSlice'

function HeaderBottom() {
    const cart = useSelector(state => state.cart.cartItems)
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    const handlerLogout = () => {
        localStorage.removeItem("userInfo")
        dispatch(userLogout())
        dispatch(userDetailReset())
        dispatch(orderListMyReset())
        dispatch(favoriteListMyReset())
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light header_bottom">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt={logo} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav align-items-md-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Sản phẩm</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="contact" className="nav-link">Liên hệ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="blog" className="nav-link">Tin tức</Link>
                            </li>
                            <li className="nav-item dropdown header_user">
                                <a href="/" className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hi, {userInfo?.name}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                    {userInfo ? (
                                        <>
                                            <li>
                                                <Link to="/profile" className="dropdown-item">Hồ sơ</Link>
                                            </li>
                                            <li>
                                                <Link onClick={handlerLogout} to="/" className="dropdown-item">Đăng xuất</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login" className="dropdown-item">Đăng nhập</Link>
                                            </li>
                                            <li>
                                                <Link to="/register" className="dropdown-item">Đăng ký</Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </li>
                            <li className="nav-item Login-Register">
                                <Link to="/cart" className="nav-link">
                                    <i className="fas fa-shopping-bag"></i>
                                    <span className="badge">{cart.length || 0}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default HeaderBottom