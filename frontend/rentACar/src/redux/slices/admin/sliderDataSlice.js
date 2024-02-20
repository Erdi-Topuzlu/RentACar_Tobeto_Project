import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utilities/status";
import fetchAllSliderData from "../../actions/admin/fetchAllSliderData";


const sliderDataSlice = createSlice({
  name: "sliderData",
  initialState: {
    sliders: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSliderData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllSliderData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.sliders = action.payload;
      })
      .addCase(fetchAllSliderData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllSliderData};
export default sliderDataSlice.reducer;
