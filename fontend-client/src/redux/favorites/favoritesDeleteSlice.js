import { createSlice } from "@reduxjs/toolkit";

const favoriteDeleteSlice = createSlice({
    name: 'favoriteDelete',
    initialState: {},
    reducers: {
        favoriteDeleteRequest: () => {
            return {
                loading: true,
            }
        },
        favoriteDeleteSuccess: () => {
            return {
                loading: false,
                success: true
            }
        },
        favoriteDeleteFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { favoriteDeleteRequest, favoriteDeleteFail, favoriteDeleteSuccess } = favoriteDeleteSlice.actions
export default favoriteDeleteSlice.reducer