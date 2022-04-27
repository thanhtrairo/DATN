import { createSlice } from "@reduxjs/toolkit";

const productReviewSlice = createSlice({
    name: 'productReivew',
    initialState: {},
    reducers: {
        productReviewRequest: () => {
            return {
                loading: true,
            }
        },
        productReviewSuccess: () => {
            return {
                loading: false,
                success: true,
            }
        },
        productReviewFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        productReviewReset: () => {
            return {}
        }
    }
})

export const { productReviewRequest, productReviewSuccess, productReviewFail, productReviewReset } = productReviewSlice.actions
export default productReviewSlice.reducer