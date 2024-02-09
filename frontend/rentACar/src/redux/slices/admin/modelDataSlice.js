import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utilities/status";
import fetchAllModelData from "../../actions/admin/fetchAllModelData";


const modelDataSlice = createSlice({
  name: "modelData",
  initialState: {
    models: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllModelData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllModelData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.models = action.payload;
      })
      .addCase(fetchAllModelData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllModelData};
export default modelDataSlice.reducer;
