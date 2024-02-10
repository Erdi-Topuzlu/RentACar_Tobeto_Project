import {createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../../utilities/status";
import fetchAllUserData from "../../actions/admin/fetchAllUserData";

const userAllDataSlice = createSlice({
  name: "userDetail",
  initialState: {
    users: [],    
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllUserData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.users = action.payload;
      })
      .addCase(fetchAllUserData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {userAllDataSlice};
export default userAllDataSlice.reducer;
