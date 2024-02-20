import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utilities/status";
import fetchAllBrandData from "../../actions/admin/fetchAllBrandData";


const brandDataSlice = createSlice({
  name: "brandData",
  initialState: {
    brands: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrandData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllBrandData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.brands = action.payload;
      })
      .addCase(fetchAllBrandData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllBrandData};
export default brandDataSlice.reducer;
