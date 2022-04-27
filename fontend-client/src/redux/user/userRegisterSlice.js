import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
    name: 'usersResgister',
    initialState: {},
    reducers: {
        userResgisterRequest: () => {
            return {
                loading: true,
            }
        },
        userResgisterSuccess: (state, action) => {
            return {
                loading: false,
                userInfo: action.payload
            }
        },
        userResgisterFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { userResgisterRequest, userResgisterFail, userResgisterSuccess, userLogout } = userRegisterSlice.actions
export default userRegisterSlice.reducer