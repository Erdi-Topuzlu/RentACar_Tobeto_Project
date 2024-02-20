import {createSlice } from "@reduxjs/toolkit";
import fetchByIdCampaignsData from "../../actions/admin/fetchByIdCampaignsData";
import { STATUS } from "../../utilities/status";

const campaignsByIdDataSlice = createSlice({
  name: "campaignsById",
  initialState: {
    campaignsDetails: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIdCampaignsData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchByIdCampaignsData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.campaignsDetails = action.payload;
      })
      .addCase(fetchByIdCampaignsData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchByIdCampaignsData};
export default campaignsByIdDataSlice.reducer;
