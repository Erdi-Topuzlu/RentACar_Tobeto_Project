import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./slices/carDataSlice";
import carDetailSlice from "./slices/carDetailSlice";
import userDataSlice from "./slices/userDataSlice";
import userDataUpdateSlice from "./slices/userDataUpdateSlice";


export const store = configureStore({
    reducer: {
        carAllData: carDataSlice,
        carDetail: carDetailSlice,
        userDetail: userDataSlice,
        userUpdate: userDataUpdateSlice
    }
})