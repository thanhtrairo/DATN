import { createSlice } from "@reduxjs/toolkit";

const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: true,
        orderItems: [],
        shippingAddress: {}
    },
    reducers: {
        orderDetailRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSuccess: (state, action) => {
            return {
                loading: false,
                order: action.payload
            }
        },
        orderDetailFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { orderDetailRequest, orderDetailFail, orderDetailSuccess } = orderDetailSlice.actions
export default orderDetailSlice.reducer