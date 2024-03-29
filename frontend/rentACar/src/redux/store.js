import { configureStore } from "@reduxjs/toolkit";
import carDataSlice from "./slices/carDataSlice";
import carDetailSlice from "./slices/carDetailSlice";
import userDataSlice from "./slices/userDataSlice";
import userDataUpdateSlice from "./slices/userDataUpdateSlice";
import { userPhotoUpdateSlice } from "./slices/userPhotoUpdateSlice";
import allRentalsSlice from "./slices/allRentalsSlice";
import rentalDetailSlice from "./slices/rentalDetailSlice";
import brandDataSlice from "./slices/admin/brandDataSlice";
import brandByIdDataSlice from "./slices/admin/brandByIdDataSlice";
import colorByIdDataSlice from "./slices/admin/colorByIdDataSlice";
import colorDataSlice from "./slices/admin/colorDataSlice";
import modelByIdDataSlice from "./slices/admin/modelByIdDataSlice";
import modelDataSlice from "./slices/admin/modelDataSlice";
import userAllDataSlice from "./slices/admin/userAllDataSlice";
import sliderDataSlice from "./slices/admin/sliderDataSlice";
import campaignsByIdDataSlice from "./slices/admin/campaignsByIdDataSlice";
import campaignsDataSlice from "./slices/admin/campaignsDataSlice";
import contactsDataSlice from "./slices/admin/contactsDataSlice";
import contactsByIdDataSlice from "./slices/admin/contactsByIdDataSlice";




export const store = configureStore({
    reducer: {
        carAllData: carDataSlice,
        carDetail: carDetailSlice,
        userDetail: userDataSlice,
        userAllData: userAllDataSlice,
        userUpdate: userDataUpdateSlice,
        userPhoto: userPhotoUpdateSlice,
        rentalDetail: rentalDetailSlice,
        allRentals: allRentalsSlice,
        brandAllData: brandDataSlice,
        sliderAllData: sliderDataSlice,
        brandById: brandByIdDataSlice,
        colorAllData: colorDataSlice,
        colorById: colorByIdDataSlice,
        modelAllData: modelDataSlice,
        modelById: modelByIdDataSlice,
        campaignsAllData: campaignsDataSlice,
        campaignsById: campaignsByIdDataSlice,
        contactAllData: contactsDataSlice,
        contactById: contactsByIdDataSlice,
    }
})