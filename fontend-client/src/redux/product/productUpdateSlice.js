import { createSlice } from "@reduxjs/toolkit";

const productUpdateSlice = createSlice({
    name: 'productUpdate',
    initialState: {},
    reducers: {
        productUpdateRequest: () => {
            return {
                loading: true,
            }
        },
        productUpdateSuccess: (state, action) => {
            return {
                loading: false,
                success: true,
                product: action.payload
            }
        },
        productUpdateFail: (state, action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        productUpdateReset: () => {
            return {
                product: {}
            }
        }
    }
})

export const { productUpdateRequest, productUpdateFail, productUpdateSuccess, productUpdateReset } = productUpdateSlice.actions
export default productUpdateSlice.reducer