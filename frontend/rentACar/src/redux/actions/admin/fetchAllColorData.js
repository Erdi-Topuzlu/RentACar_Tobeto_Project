import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllColorData = createAsyncThunk("data/fetchAllColorData", async () => {
  const response = await axiosInstance.get("api/v1/admin/colors");
  return response.data;
});

export default fetchAllColorData;