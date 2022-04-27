import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cart/cartSlice"
import ProductDetailSlice from "./product/ProductDetailSlice"
import productSlice from "./product/productSlice"
import userLoginSlice from "./user/userLoginSlice"
import userRegisterSlice from "./user/userRegisterSlice"
import userDetailSlice from './user/userDetailSlice'
import userUpdateSlice from './user/userUpdateSlice'
import productReviewSlice from "./product/productReviewSlice"
import orderCreateSlice from './order/createOrderSlice'
import orderDetailSlice from "./order/orderDetailSlice"
import orderListMySlice from './order/orderUserSlice'
import categoriesSlice from "./categories/categoriesSlice"
import productUpdateSlice from './product/productUpdateSlice'
import favoritesCreateSlice from './favorites/favoriteSlice'
import favoriteListMySlice from './favorites/favoriteUserSlice'
import favoritesDeleteSlice from "./favorites/favoritesDeleteSlice"

const store = configureStore({
    reducer: {
        products: productSlice,
        productDetail: ProductDetailSlice,
        productReview: productReviewSlice,
        cart: cartSlice,
        userLogin: userLoginSlice,
        userRegister: userRegisterSlice,
        userDetail: userDetailSlice,
        userUpdateProfile: userUpdateSlice,
        orderCreate: orderCreateSlice,
        orderDetail: orderDetailSlice,
        orderListMy: orderListMySlice,
        categories: categoriesSlice,
        productUpdate: productUpdateSlice,
        favoritesCreate: favoritesCreateSlice,
        favoriteListMy: favoriteListMySlice,
        favoriteDelete: favoritesDeleteSlice
    }
})

export default store