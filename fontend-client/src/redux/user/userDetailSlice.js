import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
    name: 'usersDetail',
    initialState: {
        user: {}
    },
    reducers: {
        userDetailRequest: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        userDetailSuccess: (state, action) => {
            return {
                loading: false,
                user: action.payload
            }
        },
        userDetailFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        userDetailReset: () => {
            return {
                user: {}
            }
        }
    }
})

export const { userDetailRequest, userDetailFail, userDetailSuccess, userDetailReset } = userDetailSlice.actions
export default userDetailSlice.reducer