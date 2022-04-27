import { createSlice } from "@reduxjs/toolkit";

const favoriteListMySlice = createSlice({
    name: 'favoriteListMy',
    initialState: {
        favorites: []
    },
    reducers: {
        favoriteListMyRequest: () => {
            return {
                loading: true,
            }
        },
        favoriteListMySuccess: (state, action) => {
            return {
                loading: false,
                favorites: action.payload,
            }
        },
        favoriteListMyFail: (state, action) => {
            return {
                loading: false,
                error: action.ListMyload
            }
        },
        favoriteListMyReset: () => {
            return {
                favorites: []
            }
        },
        favoriteListMyRemove: (state, action) => {
            state.favorites.splice(action.payload, 1)
        }
    }
})

export const { favoriteListMyRequest, favoriteListMySuccess, favoriteListMyFail, favoriteListMyReset, favoriteListMyRemove } = favoriteListMySlice.actions
export default favoriteListMySlice.reducer