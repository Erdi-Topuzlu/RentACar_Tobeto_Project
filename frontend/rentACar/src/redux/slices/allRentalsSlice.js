import {createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../utilities/status";
import fetchAllRentals from "../actions/fetchAllRentals";

const allRentalsSlice = createSlice({
  name: "allRentalData",
  initialState: {
    rentals: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRentals.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllRentals.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.rentals = action.payload;
      })
      .addCase(fetchAllRentals.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {allRentalsSlice};
export default allRentalsSlice.reducer;
