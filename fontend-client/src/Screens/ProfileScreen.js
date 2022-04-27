import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import moment from "moment"

import ProfileTabs from "../Components/profileComponents/ProfileTabs"
import { userDetailFail, userDetailRequest, userDetailSuccess } from "../redux/user/userDetailSlice"
import { userLogout } from "../redux/user/userLoginSlice"
import Orders from "../Components/profileComponents/Orders"
import HeaderBottom from "../Components/HeaderBottom"
import userImg from '../img/user.jpg'
import TitleCatagory from '../Components/TitleCatagory'
import { orderListMyFail, orderListMyRequest, orderListMySuccess } from "../redux/order/orderUserSlice"
import { favoriteListMyFail, favoriteListMyRequest, favoriteListMySuccess } from "../redux/favorites/favoriteUserSlice"
import Favorites from "../Components/profileComponents/Favorites"

const ProfileScreen = () => {
  window.scrollTo(0, 0)
  const dispatch = useDispatch()
  
  const { userInfo } = useSelector((state) => state.userLogin)
  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading, error, orders } = orderListMy

  const favoriteListMy = useSelector((state) => state.favoriteListMy)
  const { loading: loadingFavorite, error: errorFavorites, favorites } = favoriteListMy

  useEffect(() => {
    const listMyOrders = async () => {
      try {
        dispatch(orderListMyRequest())
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/orders/`, config)
        dispatch(orderListMySuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(orderListMyFail(message))
      }
    }
    listMyOrders()

    const getUserDetails = async (id) => {
      try {
        dispatch(userDetailRequest())
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch(userDetailSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(userDetailFail(message))
      }
    }
    getUserDetails("profile")

    const listMyFavorites = async () => {
      try {
        dispatch(favoriteListMyRequest())
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/favorites/`, config)
        dispatch(favoriteListMySuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === "Not authorized, token failed") {
          dispatch(userLogout())
        }
        dispatch(favoriteListMyFail(message))
      }
    }
    listMyFavorites()
  }, [dispatch, userInfo.token])

  return (
    <>
      <HeaderBottom />
      <TitleCatagory>Hồ Sơ</TitleCatagory>
      <div className="container mt-lg-5 mt-3 mb-5">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile d-flex align-items-center">
                <div className="author-card-avatar">
                  <img src={userImg} alt={userInfo?.name} />
                </div>
                <div className="author-card-details">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo?.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo?.createdAt).format("LLL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div className="d-flex align-items-start">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Cài đặt hồ sơ
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Đơn hàng
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </button>
                  <button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-favorite-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-favorite"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-favorite"
                    aria-selected="false"
                  >
                    Favorites
                    <span className="badge2">{favorites ? favorites.length : 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            className="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading={loading} error={error} />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-favorite"
              role="tabpanel"
              aria-labelledby="v-pills-favorite-tab"
            >
              <Favorites favorites={favorites} loading={loadingFavorite} error={errorFavorites}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileScreen
