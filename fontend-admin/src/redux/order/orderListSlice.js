import { createSlice } from "@reduxjs/toolkit";

const orderListSlice = createSlice({
    name: 'orderList',
    initialState: {
        orders: []
    },
    reducers: {
        orderListRequest: () => {
            return {
                loading: true,
            }
        },
        orderListSuccess: (state, action) => {
            return {
                loading: false,
                orders: action.payload
            }
        },
        orderListFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { orderListRequest, orderListFail, orderListSuccess } = orderListSlice.actions
export default orderListSlice.reducer