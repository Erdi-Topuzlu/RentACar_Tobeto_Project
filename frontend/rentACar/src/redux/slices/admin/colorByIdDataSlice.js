import {createSlice } from "@reduxjs/toolkit";
import fetchByIdColorData from "../../actions/admin/fetchByIdColorData";
import { STATUS } from "../../utilities/status";

const colorByIdDataSlice = createSlice({
  name: "colorById",
  initialState: {
    colorDetails: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIdColorData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchByIdColorData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.brandDetails = action.payload;
      })
      .addCase(fetchByIdColorData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchByIdColorData};
export default colorByIdDataSlice.reducer;
