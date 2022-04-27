import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: {
            reviews: []
        }
    },
    reducers: {
        productDetailRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        productDetailSuccess: (state, action) => {
            return {
                loading: false,
                product: action.payload
            }
        },
        productDetailFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { productDetailRequest, productDetailFail, productDetailSuccess } = productDetailSlice.actions
export default productDetailSlice.reducer