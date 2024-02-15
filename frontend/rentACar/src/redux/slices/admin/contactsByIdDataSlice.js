import {createSlice } from "@reduxjs/toolkit";
import fetchByIdContactData from "../../actions/admin/fetchByIdContactData";
import { STATUS } from "../../utilities/status";

const contactByIdDataSlice = createSlice({
  name: "contactById",
  initialState: {
    contactDetails: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIdContactData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchByIdContactData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.contactDetails = action.payload;
      })
      .addCase(fetchByIdContactData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchByIdContactData};
export default contactByIdDataSlice.reducer;
