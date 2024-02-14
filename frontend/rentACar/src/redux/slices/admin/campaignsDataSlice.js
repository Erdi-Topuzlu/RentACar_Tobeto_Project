import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utilities/status";
import fetchAllCampaignsData from "../../actions/admin/fetchAllCampaignsData";


const campaignsDataSlice = createSlice({
  name: "campaignsData",
  initialState: {
    campaigns: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCampaignsData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllCampaignsData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.campaigns = action.payload;
      })
      .addCase(fetchAllCampaignsData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllCampaignsData};
export default campaignsDataSlice.reducer;
