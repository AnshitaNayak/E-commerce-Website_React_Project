import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
            else {
                state.products.push(action.payload);
            }
        },
        reduceQuantity: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;    
            }
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload);
        },
        resetCart: (state, action) => {
            state.products = [];
        },
    },
})

export const { addToCart, reduceQuantity, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;