import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllBrandData = createAsyncThunk("data/fetchAllBrandData", async () => {
  const response = await axiosInstance.get("api/v1/admin/brands");
  return response.data;
});

export default fetchAllBrandData;