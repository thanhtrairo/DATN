
import React, { useEffect } from 'react'
import axios from 'axios'

import Footer from '../Components/Footer'
import HeaderBottom from '../Components/HeaderBottom'
import HeaderTop from '../Components/HeaderTop'
import CaroselScreen from './CaroselScreen'
import Carosel from '../Components/Carosel'
import { useDispatch } from 'react-redux'
import { getCategoriesFail, getCategoriesRequest, getCategoriesSuccess } from '../redux/categories/categoriesSlice'

const Home = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch(getCategoriesRequest())

        const { data } = await axios.get(`/api/categories`)

        dispatch(getCategoriesSuccess(data))
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch(getCategoriesFail(message))
      }
    }
    getCategories()
  }, [dispatch])

  return (
    <>
      <HeaderTop />
      <HeaderBottom />
      <CaroselScreen />
      <div className="container mb-5">
        <Carosel />
      </div>
      <Footer />
    </>
  )
}

export default Home