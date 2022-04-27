import { configureStore } from "@reduxjs/toolkit"
import orderConfirmSlice from "./order/orderConfirmSlice"
import orderDetailSlice from "./order/orderDetailSlice"
import orderListSlice from "./order/orderListSlice"
import productCreateSlice from "./product/productCreateSlice"
import productDeleteSlice from "./product/productDeleteSlice"
import productEditSlice from "./product/productEditSlice"
import productListSlice from "./product/productListSlice"
import productUpdateSlice from "./product/productUpdateSlice"
import userListSlice from "./user/userListSlice"
import userLoginSlice from "./user/userLoginSlice"
import categorieSlice from './catagories/categorieSlice'
import createCategoriesSlice from './catagories/createCategoriesSlice'

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice,
        userList: userListSlice,
        productList: productListSlice,
        productDelete: productDeleteSlice,
        productEdit: productEditSlice,
        productCreate: productCreateSlice,
        productUpdate: productUpdateSlice,
        orderConfirm: orderConfirmSlice,
        orderDetail: orderDetailSlice,
        orderList: orderListSlice,
        categories: categorieSlice,
        createCategories: createCategoriesSlice
    }
})

export default store