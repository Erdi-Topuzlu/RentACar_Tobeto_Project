import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/interceptors/axiosInterceptors";

const fetchAllRental = createAsyncThunk("data/fetchAllRental", async () => {
  const response = await axiosInstance.get("api/v1/rentals");
  return response.data;
});

export default fetchAllRental;
