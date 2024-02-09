import {createSlice } from "@reduxjs/toolkit";
import fetchByIdModelData from "../../actions/admin/fetchByIdModelData";
import { STATUS } from "../../utilities/status";

const modelByIdDataSlice = createSlice({
  name: "modelById",
  initialState: {
    modelDetails: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIdModelData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchByIdModelData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.modelDetails = action.payload;
      })
      .addCase(fetchByIdModelData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchByIdModelData};
export default modelByIdDataSlice.reducer;
