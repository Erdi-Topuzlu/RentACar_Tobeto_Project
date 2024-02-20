import {createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../utilities/status";
import fetchUserData from "../actions/fetchUserData";

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    details: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.details = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {userDetailSlice};
export default userDetailSlice.reducer;
