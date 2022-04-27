import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
    name: 'usersUpdate',
    initialState: {},
    reducers: {
        userUpdateRequest: () => {
            return {
                loading: true,
            }
        },
        userUpdateSuccess: (state, action) => {
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            }
        },
        userUpdateFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { userUpdateRequest, userUpdateFail, userUpdateSuccess } = userUpdateSlice.actions
export default userUpdateSlice.reducer