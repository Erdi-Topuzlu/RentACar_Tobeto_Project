import {createSlice } from "@reduxjs/toolkit";
import fetchCarDetail from "../actions/fetchCarDetailData";

const carDetailSlice = createSlice({
  name: "carDetail",
  initialState: {
    details: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetail.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCarDetail.fulfilled, (state, action) => {
        state.status = "Success";
        state.details = action.payload;
      })
      .addCase(fetchCarDetail.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
  },
});

export {fetchCarDetail};
export default carDetailSlice.reducer;
