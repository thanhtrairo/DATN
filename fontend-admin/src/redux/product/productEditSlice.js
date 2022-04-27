import { createSlice } from "@reduxjs/toolkit";

const productEditSlice = createSlice({
    name: 'productEdit',
    initialState: {
        product: {
            reviews: []
        }
    },
    reducers: {
        productEditRequest: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        productEditSuccess: (state, action) => {
            return {
                loading: false,
                product: action.payload
            }
        },
        productEditFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { productEditRequest, productEditFail, productEditSuccess } = productEditSlice.actions
export default productEditSlice.reducer