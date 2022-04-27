import { createSlice } from "@reduxjs/toolkit";

const orderListMySlice = createSlice({
    name: 'orderListMy',
    initialState: {
        orders: []
    },
    reducers: {
        orderListMyRequest: () => {
            return {
                loading: true,
            }
        },
        orderListMySuccess: (state, action) => {
            return {
                loading: false,
                orders: action.payload,
            }
        },
        orderListMyFail: (state, action) => {
            return {
                loading: false,
                error: action.ListMyload
            }
        },
        orderListMyReset: () => {
            return {
                orders: []
            }
        }
    }
})

export const { orderListMyRequest, orderListMySuccess, orderListMyFail, orderListMyReset } = orderListMySlice.actions
export default orderListMySlice.reducer