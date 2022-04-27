
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment'

import HeaderBottom from '../Components/HeaderBottom'
import TitleCatagory from '../Components/TitleCatagory'
import Footer from '../Components/Footer'
import Loading from '../Components/LoadingError/Loading'
import Message from '../Components/LoadingError/Error'
import { Link, useHistory, useParams } from 'react-router-dom'
import { productDetailFail, productDetailRequest, productDetailSuccess } from '../redux/product/ProductDetailSlice'
import Rating from '../Components/Rating'
import { productReviewFail, productReviewRequest, productReviewReset, productReviewSuccess } from '../redux/product/productReviewSlice'
import { userLogout } from '../redux/user/userLoginSlice'

function SingleProduct() {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const { productId } = useParams()
    const history = useHistory()

    const productDetail = useSelector(state => state.productDetail)

    const { loading, error, product } = productDetail

    const { userInfo } = useSelector((state) => state.userLogin)

    const productReview = useSelector((state) => state.productReview)

    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReview

    const dispatch = useDispatch()

    useEffect(() => {
        if (successCreateReview) {
            alert("Review Submitted")
            setRating(0)
            setComment("")
            dispatch(productReviewReset())
        }
        const fetchProduct = async (id) => {
            try {
                dispatch(productDetailRequest())
                const { data } = await axios.get(`/api/products/${id}`)
                dispatch(productDetailSuccess(data))
            } catch (error) {
                const errorMessage = error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
                dispatch(productDetailFail(errorMessage))
            }
        }
        fetchProduct(productId)
    }, [productId, dispatch, successCreateReview])

    const AddToCartHandle = (e) => {
        e.preventDefault()
        if(userInfo) {
            history.push(`/cart/${productId}?qty=${qty}`)
        } else {
            history.push(`/login?redirect=cart/${productId}?qty=${qty}`)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const createProductReview = async (productId, review) => {
            try {
                dispatch(productReviewRequest())
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }

                await axios.post(`/api/products/${productId}/review`, review, config)
                dispatch(productReviewSuccess())
            } catch (error) {
                const message =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
                if (message === "Not authorized, token failed") {
                    dispatch(userLogout());
                }
                dispatch(productReviewFail(message))
            }
        }
        createProductReview(productId, {
            rating,
            comment,
        })
    }

    return (
        <>
            <HeaderBottom />
            <TitleCatagory>Chi tiết sản phẩm</TitleCatagory>
            <div className="container single-product">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="single-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                    </div>
                                    <p>{product.description}</p>

                                    <div className="product-count col-lg-7 ">
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Giá</h6>
                                            <span>{product.price} VND</span>
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Trạng thái</h6>
                                            {product.countInStock > 0 ? (
                                                <span>Trong kho</span>
                                            ) : (
                                                <span>Không có sẵn</span>
                                            )}
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Đánh giá</h6>
                                            <Rating
                                                value={product.rating}
                                                text={` ${product.numReviews} đánh giá`}
                                            />
                                        </div>
                                        {product.countInStock > 0 ? (
                                            <>
                                                <div className="flex-box d-flex justify-content-between align-items-center">
                                                    <h6>Số lượng</h6>
                                                    <select
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={AddToCartHandle}
                                                    className="round-black-btn"
                                                >
                                                    Thêm vào giỏ
                                                </button>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RATING */}
                        <div className="row my-5">
                            <div className="col-md-6">
                                <h6 className="mb-3">Đánh giá</h6>
                                {product.reviews.length === 0 && (
                                    <Message variant={"alert-info mt-3"}>Không có đánh giá</Message>
                                )}
                                {product.reviews.map((review) => (
                                    <div
                                        key={review._id}
                                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                                    >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <span>{moment(review.createdAt).calendar()}</span>
                                        <div className="alert alert-info mt-3">
                                            {review.comment}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-6">
                                <h6>Viết đánh giá</h6>
                                <div className="my-4">
                                    {loadingCreateReview && <Loading />}
                                    {errorCreateReview && (
                                        <Message variant="alert-danger">
                                            {errorCreateReview}
                                        </Message>
                                    )}
                                </div>
                                {userInfo ? (
                                    <form
                                        onSubmit={submitHandler}
                                    >
                                        <div className="my-4">
                                            <strong>Xếp hạng</strong>
                                            <select
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            >
                                                <option value="">Chọn...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div className="my-4">
                                            <strong>Bình luận</strong>
                                            <textarea
                                                row="3"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            ></textarea>
                                        </div>
                                        <div className="my-3">
                                            <button
                                                disabled={loadingCreateReview}
                                                className="col-12 bg-black border-0 p-3 rounded text-white"
                                            >
                                                Đánh giá
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="my-3">
                                        <Message variant={"alert-warning"}>
                                            Vui lòng{" "}
                                            <Link to="/login">
                                                " <strong>đăng nhập</strong> "
                                            </Link>{" "}
                                            để đánh giá{" "}
                                        </Message>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default SingleProduct