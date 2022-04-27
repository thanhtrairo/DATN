import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {}

const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage
    },
    reducers: {
        addCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        },
        removeCart: (state, action) => {
            state.cartItems.splice(action.payload, 1)
        },
        cartSaveShippingAddress: (state, action) => {
            return {
                ...state,
                shippingAddress: action.payload
            }
        },
        cartSavePaymethod: (state, action) => {
            return {
                ...state,
                paymentMethod: action.payload
            }
        },
        cartClearItem: (state) => {
            return {
                ...state,
                cartItems: []
            }
        }
    }
})

export const { addCart, removeCart, cartSaveShippingAddress, cartClearItem, cartSavePaymethod } = cartSlice.actions
export default cartSlice.reducer