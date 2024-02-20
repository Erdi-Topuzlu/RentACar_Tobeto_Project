import {createSlice } from "@reduxjs/toolkit";
import fetchByIdBrandData from "../../actions/admin/fetchByIdBrandData";
import { STATUS } from "../../utilities/status";

const brandByIdDataSlice = createSlice({
  name: "brandById",
  initialState: {
    brandDetails: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIdBrandData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchByIdBrandData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.brandDetails = action.payload;
      })
      .addCase(fetchByIdBrandData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchByIdBrandData};
export default brandByIdDataSlice.reducer;
