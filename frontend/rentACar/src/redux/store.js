import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./slices/dataSlice";


export const store = configureStore({
    reducer: {
        data: carDataSlice,
    }
})