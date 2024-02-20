import {createSlice } from "@reduxjs/toolkit";
import fetchAllCarData from "../actions/fetchAllCarData";
import {STATUS} from "../utilities/status";

const carDataSlice = createSlice({
  name: "carData",
  initialState: {
    items: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllCarData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchAllCarData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllCarData};
export default carDataSlice.reducer;
