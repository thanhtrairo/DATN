import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const userLoginSlice = createSlice({
    name: 'usersLogin',
    initialState: {
        userInfo: userInfoFromLocalStorage
    },
    reducers: {
        userLoginRequest: () => {
            return {
                loading: true,
            }
        },
        userLoginSuccess: (state, action) => {
            return {
                loading: false,
                userInfo: action.payload
            }
        },
        userLoginFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        userLogout: () => {
            return {
                userInfo: null
            }
        }
    }
})

export const { userLoginRequest, userLoginFail, userLoginSuccess, userLogout } = userLoginSlice.actions
export default userLoginSlice.reducer