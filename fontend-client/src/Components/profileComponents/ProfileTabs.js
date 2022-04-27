import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from 'axios'

import Message from "../LoadingError/Error"
import Toast from "./../LoadingError/Toast"
import Loading from "./../LoadingError/Loading"
import { userLoginSuccess, userLogout } from "../../redux/user/userLoginSlice"
import { userUpdateFail, userUpdateRequest, userUpdateSuccess } from "../../redux/user/userUpdateSlice"

const ProfileTabs = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const toastId = React.useRef(null)

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  }

  const dispatch = useDispatch()

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const {userInfo} = useSelector((state) => state.userLogin)

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { loading: updateLoading } = userUpdateProfile

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects)
      }
    } else {
      const updateProfile = async (user) => {
        try {
          dispatch(userUpdateRequest())
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }

          const { data } = await axios.put(`/api/users/profile`, user, config)
          dispatch(userUpdateSuccess(data))
          dispatch(userLoginSuccess(data))
          localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          if (message === "Not authorized, token failed") {
            dispatch(userLogout())
          }
          dispatch(userUpdateFail(message))
        }
      }
      updateProfile({ id: user._id, name, email, password })

      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects)
      }
    }
  }
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Tên</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu mới</label>
            <input
              className="form-control"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Xác nhận mật khẩu</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Cập nhật hồ sơ</button>
      </form>
    </>
  )
}

export default ProfileTabs
