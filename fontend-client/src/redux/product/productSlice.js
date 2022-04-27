import { createSlice } from "@reduxjs/toolkit";

const productsFromLocalStorage = localStorage.getItem("productList")
    ? JSON.parse(localStorage.getItem("productList"))
    : []

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: productsFromLocalStorage
    },
    reducers: {
        productRequest: () => {
            return {
                loading: true,
                products: []
            }
        },
        productSuccess: (state, action) => {
            return {
                loading: false,
                products: action.payload
            }
        },
        productFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { productRequest, productFail, productSuccess } = productSlice.actions
export default productSlice.reducer