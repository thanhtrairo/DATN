import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Error"
import { userListFail, userListRequest, userListSuccess } from "../../redux/user/userListSlice"
import { userLogout } from '../../redux/user/userLoginSlice'
import avatar from '../../img/avatar.png'

const UserComponent = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.userLogin)
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const [filter, setFilter] = useState("dafault")
  const listUser = useMemo(() => {
    if (filter === "admin") {
      return users.filter(user => user.isAdmin)
    } else if (filter === "user") {
      return users.filter(user => !user.isAdmin)
    }
    return users
  }, [filter, users])

  useEffect(() => {
    const listUser = async() => {
      try {
        dispatch(userListRequest());

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch(userListSuccess(data));
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(userLogout());
        }
        dispatch(userListFail());
      }
    }
    listUser()
  }, [dispatch, userInfo.token])
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="dafault">Status</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {(listUser ? listUser : users).map((user) => (
                <div className="col" key={user._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src={avatar}
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        {user.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">Customer</p>
                        )}

                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserComponent
