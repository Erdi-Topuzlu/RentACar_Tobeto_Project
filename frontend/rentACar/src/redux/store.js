import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./slices/carDataSlice";
import carDetailSlice from "./slices/carDetailSlice";


export const store = configureStore({
    reducer: {
        carAllData: carDataSlice,
        carDetail:carDetailSlice
    }
})