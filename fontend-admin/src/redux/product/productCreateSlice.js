import { createSlice } from "@reduxjs/toolkit";

const productCreateSlice = createSlice({
    name: 'productCreate',
    initialState: {},
    reducers: {
        productCreateRequest: () => {
            return {
                loading: true,
            }
        },
        productCreateSuccess: (state, action) => {
            return {
                loading: false,
                success: true,
                product: action.payload
            }
        },
        productCreateFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        productCreateReset: () => {
            return {}
        }
    }
})

export const { productCreateRequest, productCreateFail, productCreateSuccess, productCreateReset } = productCreateSlice.actions
export default productCreateSlice.reducer