
import React, { memo, useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { favoritesCreateFail, favoritesCreateRequest, favoritesCreateSuccess } from '../redux/favorites/favoriteSlice'
import './Product.scss'
import Rating from './Rating'

function Product({ product }) {
  const [like, setLike] = useState(false)

  const { name, price, description, image, countInStock, countInSold, categories } = product

  const {userInfo} = useSelector(state => state.userLogin)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLike(false)
    }, 2000)

    return () => clearTimeout(timeId)
  }, [like])

  const handleLike = () => {
    setLike(true)
    const createFavorites = async (pro) => {
      try {
        dispatch(favoritesCreateRequest())

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.post(`/api/favorites/`, pro, config)

        dispatch(favoritesCreateSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch(favoritesCreateFail(message))
      }
    }
    if (userInfo) {
      createFavorites({ name, price, description, image, countInStock, countInSold, categories })
    }
  }

  return (
    <div className="productItem">
      {like && <div className={'heart'}>
        <div className="left"></div>
        <div className="right"></div>
      </div>}
      <div className="productItemImg">
        <Link to={`/products/${product._id}`}>
          <img src={product.image} alt={product.image} />
        </Link>
        <div className="productItemLike">
            <i className="fa fa-heart" onClick={handleLike}></i>
        </div>
      </div>
      <div className="productItemText">
        <p>{product.name}</p>
        <h4>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </h4>
        <h3>{product.price} VND</h3>
      </div>
    </div>
  )
}

export default memo(Product)