import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllSliderData = createAsyncThunk("data/fetchAllSliderData", async (formData) => {
  const response = await axiosInstance.get("api/v1/admin/slider");
  return response.data;
});

export default fetchAllSliderData;