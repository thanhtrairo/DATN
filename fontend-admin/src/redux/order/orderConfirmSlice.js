import { createSlice } from "@reduxjs/toolkit";

const orderConfirmSlice = createSlice({
    name: 'orderConfirm',
    initialState: {},
    reducers: {
        orderConfirmRequest: () => {
            return {
                loading: true,
            }
        },
        orderConfirmSuccess: () => {
            return {
                loading: false,
                success: true
            }
        },
        orderConfirmFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        orderConfirmReset: () => {
            return {}
        }
    }
})

export const { orderConfirmRequest, orderConfirmFail, orderConfirmSuccess, orderConfirmReset } = orderConfirmSlice.actions
export default orderConfirmSlice.reducer