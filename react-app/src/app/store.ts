import { configureStore, createSlice } from "@reduxjs/toolkit";
import type { Promotion } from "../models/promotion";

// Promotionsn slice
const promotionsSlice = createSlice({
    name: "promotions",
    initialState: [] as Promotion[],
    reducers: {
        setPromotions: (state, action) => action.payload
    }
});


const store = configureStore({
    reducer: {
        promotions: promotionsSlice.reducer
    }
});


export const { setPromotions } = promotionsSlice.actions;
export default store;