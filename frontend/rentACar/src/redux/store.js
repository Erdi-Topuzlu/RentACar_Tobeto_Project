import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./slices/carDataSlice";
import carDetailSlice from "./slices/carDetailSlice";
import userDataSlice from "./slices/userDataSlice";
import userDataUpdateSlice from "./slices/userDataUpdateSlice";
import { userPhotoUpdateSlice } from "./slices/userPhotoUpdateSlice";
import allRentalsSlice from "./slices/allRentalsSlice";
import rentalDetailSlice from "./slices/rentalDetailSlice";



export const store = configureStore({
    reducer: {
        carAllData: carDataSlice,
        carDetail: carDetailSlice,
        userDetail: userDataSlice,
        userUpdate: userDataUpdateSlice,
        userPhoto: userPhotoUpdateSlice,
        rentalDetail: rentalDetailSlice,
        allRentals: allRentalsSlice
    }
})