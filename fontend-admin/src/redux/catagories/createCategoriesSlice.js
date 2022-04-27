import { createSlice } from "@reduxjs/toolkit";

const createCategoriesSlice = createSlice({
    name: 'categorie',
    initialState: {},
    reducers: {
        createCategoriesRequest: () => {
            return {
                loading: true,
            }
        },
        createCategoriesSuccess: (state, action) => {
            return {
                loading: false,
                categorie: action.payload
            }
        },
        createCategoriesFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        createCategoriesReset: () => {
            return {}
        }
    }
})

export const {
    createCategoriesRequest,
    createCategoriesSuccess,
    createCategoriesFail,
    createCategoriesReset
} = createCategoriesSlice.actions
export default createCategoriesSlice.reducer