import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllContactData = createAsyncThunk("data/fetchAllContactData", async () => {
  const response = await axiosInstance.get("api/v1/admin/contacts/getAll");
  return response.data;
});

export default fetchAllContactData;