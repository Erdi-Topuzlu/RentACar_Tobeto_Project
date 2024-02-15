import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utilities/status";
import fetchAllContactData from "../../actions/admin/fetchAllContactData";


const contactsDataSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    status: STATUS.IDLE,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContactData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchAllContactData.fulfilled, (state, action) => {
        state.status= STATUS.SUCCESS;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContactData.rejected, (state, action) => {
        state.status = STATUS.FAIL;
        state.error = action.error.message;
      });
  },
});

export {fetchAllContactData};
export default contactsDataSlice.reducer;
