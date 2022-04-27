import { createSlice } from "@reduxjs/toolkit";

const favoritesCreateSlice = createSlice({
    name: 'favoritesCreate',
    initialState: {},
    reducers: {
        favoritesCreateRequest: () => {
            return {
                loading: true,
            }
        },
        favoritesCreateSuccess: (state, action) => {
            return {
                loading: false,
                success: true,
                favorites: action.payload
            }
        },
        favoritesCreateFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const { favoritesCreateRequest, favoritesCreateFail, favoritesCreateSuccess } = favoritesCreateSlice.actions
export default favoritesCreateSlice.reducer