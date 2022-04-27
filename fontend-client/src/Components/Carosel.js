
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { productFail, productRequest, productSuccess } from '../redux/product/productSlice'
import Slider from 'react-slick/lib/slider'
import Product from './Product'
import TitleCatagory from './TitleCatagory'
import Loading from './LoadingError/Loading'
import Message from './LoadingError/Error'

function Carosel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    }

    const productList = useSelector(state => state.products)
    const { loading, error, products } = productList

    const { categorieList } = useSelector(state => state.categories)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(productRequest())
                const { data } = await axios.get("/api/products")
                localStorage.setItem("productList", JSON.stringify(data))
                dispatch(productSuccess(data))
            } catch (error) {
                const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message
                dispatch(productFail(errorMessage))
            }
        }
        fetchProducts()
    }, [dispatch])

    return (
        <>
            {loading ? (
                <div className="mb-5">
                    <Loading />
                </div>
            ) : error ? (
                <Message variant="alert-danger">{error}</Message>
            ) : (
                categorieList.map(category => (
                    <div key={category._id}>
                        <TitleCatagory>{`Sản phẩm ${category.name}`}</TitleCatagory>
                        <Slider {...settings}>
                            {products.filter(product => product.categories === category.name)
                                .map(product => (
                                    <Product product={product} key={product._id} />
                                ))
                            }
                        </Slider>
                    </div>
                )
                ))
            }
        </>
    )
}

export default Carosel