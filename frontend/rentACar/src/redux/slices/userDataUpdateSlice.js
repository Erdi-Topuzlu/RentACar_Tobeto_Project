import {createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../utilities/status";
import fetchUserUpdateData from "../actions/fetchUserUpdateData";

const userDetailUpdateSlice = createSlice({
  name: "userDetailUpdate",
  initialState: {
    details: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserUpdateData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUserUpdateData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.details = action.payload;
      })
      .addCase(fetchUserUpdateData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {userDetailUpdateSlice};
export default userDetailUpdateSlice.reducer;
