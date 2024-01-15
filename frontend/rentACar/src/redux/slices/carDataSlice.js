import {createSlice } from "@reduxjs/toolkit";
import fetchAllCarData from "../actions/fetchAllCarData";

const carDataSlice = createSlice({
  name: "carData",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarData.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllCarData.fulfilled, (state, action) => {
        state.status = "Success";
        state.items = action.payload;
      })
      .addCase(fetchAllCarData.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});

export {fetchAllCarData};
export default carDataSlice.reducer;
