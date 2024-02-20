import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllSliderData = createAsyncThunk("data/fetchAllSliderData", async () => {
  const response = await axiosInstance.get("api/v1/admin/slider/getAll");
  return response.data;
});

export default fetchAllSliderData;