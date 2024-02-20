import {createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../utilities/status";
import fetchUserUpdateData from "../actions/fetchUserUpdateData";

const userPhotoUpdateSlice = createSlice({
  name: "userPhotoUpdate",
  initialState: {
    updatePhoto: [],    
    updatePhotoStatus: STATUS.IDLE,
    updatePhotoError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserUpdateData.pending, (state) => {
        state.updatePhotoStatus = STATUS.LOADING;
      })
      .addCase(fetchUserUpdateData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.updatePhoto = action.payload;
      })
      .addCase(fetchUserUpdateData.rejected, (state, action) => {
        state.updatePhotoStatus = STATUS.FAIL;
        state.updatePhotoError = action.error.message;
      });
  },
});

export {userPhotoUpdateSlice};
export default userPhotoUpdateSlice.reducer;
