import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utilities/status";
import fetchAllColorData from "../../actions/admin/fetchAllColorData";


const colorDataSlice = createSlice({
  name: "colorData",
  initialState: {
    colors: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllColorData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllColorData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.colors = action.payload;
      })
      .addCase(fetchAllColorData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllColorData};
export default colorDataSlice.reducer;
