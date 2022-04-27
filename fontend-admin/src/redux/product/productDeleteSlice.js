import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice = createSlice({
    name: 'productDelete',
    initialState: {},
    reducers: {
        productDeleteRequest: () => {
            return {
                loading: true,
            }
        },
        productDeleteSuccess: () => {
            return {
                loading: false,
                success: true
            }
        },
        productDeleteFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { productDeleteRequest, productDeleteFail, productDeleteSuccess } = productDeleteSlice.actions
export default productDeleteSlice.reducer