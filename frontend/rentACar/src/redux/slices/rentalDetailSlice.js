import {createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../utilities/status";
import fetchByUserIdRental from "../actions/fetchByUserIdRental";

const rentalDetailSlice = createSlice({
  name: "rentalDetails",
  initialState: {
    rentalDetails: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByUserIdRental.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchByUserIdRental.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.rentalDetails = action.payload;
      })
      .addCase(fetchByUserIdRental.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {rentalDetailSlice};
export default rentalDetailSlice.reducer;
