import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/interceptors/axiosInterceptors";

const fetchAllCarData = createAsyncThunk("data/fetchAllCarData", async () => {
  const response = await axiosInstance.get("api/v1/cars");
  return response.data;
});

export default fetchAllCarData;
