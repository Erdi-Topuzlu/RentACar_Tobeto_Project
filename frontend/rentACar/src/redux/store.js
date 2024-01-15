import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./slices/carDataSlice";


export const store = configureStore({
    reducer: {
        data: carDataSlice,
    }
})