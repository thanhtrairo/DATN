import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        users: []
    },
    reducers: {
        userListRequest: () => {
            return {
                loading: true,
            }
        },
        userListSuccess: (state, action) => {
            return {
                loading: false,
                users: action.payload
            }
        },
        userListFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        userListReset: () => {
            return {
                users: []
            }
        }
    }
})

export const { userListRequest, userListFail, userListSuccess, userListReset } = userListSlice.actions
export default userListSlice.reducer