import {createSlice } from "@reduxjs/toolkit";
import fetchCarDetail from "../actions/fetchCarDetailData";
import {STATUS} from "../utilities/status";

const carDetailSlice = createSlice({
  name: "carDetail",
  initialState: {
    details: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarDetail.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchCarDetail.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.details = action.payload;
      })
      .addCase(fetchCarDetail.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchCarDetail};
export default carDetailSlice.reducer;
