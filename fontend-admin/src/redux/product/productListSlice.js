import { createSlice } from "@reduxjs/toolkit";

const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        products: []
    },
    reducers: {
        productListRequest: () => {
            return {
                loading: true,
                products: []
            }
        },
        productListSuccess: (state, action) => {
            return {
                loading: false,
                products: action.payload
            }
        },
        productListFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { productListRequest, productListFail, productListSuccess } = productListSlice.actions
export default productListSlice.reducer