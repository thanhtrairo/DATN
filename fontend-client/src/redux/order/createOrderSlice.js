import { createSlice } from "@reduxjs/toolkit";

const createOrderSlice = createSlice({
    name: 'order',
    initialState: {},
    reducers: {
        createOrderRequest: () => {
            return {
                loading: true,
            }
        },
        createOrderSuccess: (state, action) => {
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        },
        createOrderFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        createOrderReset: () => {
            return {}
        }
    }
})

export const { createOrderRequest, createOrderFail, createOrderSuccess, createOrderReset } = createOrderSlice.actions
export default createOrderSlice.reducer