
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import axios from 'axios'

import { addCart } from '../../redux/cart/cartSlice'
import Message from '../LoadingError/Error'
import Loading from '../LoadingError/Loading'
import Toast from '../LoadingError/Toast'
import { userLogout } from '../../redux/user/userLoginSlice'
import { favoriteDeleteFail, favoriteDeleteRequest, favoriteDeleteSuccess } from '../../redux/favorites/favoritesDeleteSlice'
import { favoriteListMyRemove } from '../../redux/favorites/favoriteUserSlice'

function Favorites({ loading, error, favorites }) {

    const Toastobjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    }

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.userLogin)

    const handleAddCart = (favorite) => {
        dispatch(addCart({ ...favorite, qty: 1 }))
        toast.success("Moved to cart", Toastobjects)
    }

    const handleDeleteFavorite = (id, index) => {
        const deleteFavorite = async (id, index) => {
            try {
                dispatch(favoriteDeleteRequest());

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                await axios.delete(`/api/favorites/${id}`, config);

                dispatch(favoriteDeleteSuccess());
                dispatch(favoriteListMyRemove(index))
            } catch (error) {
                const message =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
                if (message === "Not authorized, token failed") {
                    dispatch(userLogout());
                }
                dispatch(favoriteDeleteFail(message));
            }
        }
        deleteFavorite(id, index)
    }

    return (
        <>
            <Toast />
            <div className=" d-flex justify-content-center align-items-center flex-column">
                <>
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (favorites.length === 0 ? (
                        <div className="col-12 alert alert-info text-center mt-3">
                            No Favorites
                            <Link
                                className="btn btn-success mx-2 px-3 py-2"
                                to="/"
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                START SHOPPING
                            </Link>
                        </div>
                    ) : (
                        <div className="productBottomRight">
                            <div className="row">
                                {favorites.map((favorite, index) => (
                                    <div className="col-6 col-sm-4 mb-5" key={favorite._id}>
                                        <div className="productItem">
                                            <div className="productItemImg">
                                                <Link to={`/products/${favorite._id}`}>
                                                    <img src={favorite.image} alt={favorite.image} />
                                                </Link>
                                                <div className="productItemLike">
                                                    <i className="fa fa-shopping-cart" onClick={() => handleAddCart(favorite)}></i>
                                                </div>
                                                <div className="productItemRemove">
                                                    <i className="fa fa-times-circle" onClick={() => handleDeleteFavorite(favorite._id, index)}></i>
                                                </div>
                                            </div>
                                            <div className="productItemText">
                                                <p className="mb-2">{favorite.name}</p>
                                                <h3>{favorite.price} VND</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            </div>
        </>
    )
}

export default Favorites