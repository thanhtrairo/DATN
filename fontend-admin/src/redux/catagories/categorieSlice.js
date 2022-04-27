import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categorieList: []
    },
    reducers: {
        getCategoriesRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        getCategoriesSuccess: (state, action) => {
            return {
                loading: false,
                categorieList: action.payload
            }
        },
        getCategoriesFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export const {
    getCategoriesRequest,
    getCategoriesSuccess,
    getCategoriesFail,
} = categoriesSlice.actions
export default categoriesSlice.reducer