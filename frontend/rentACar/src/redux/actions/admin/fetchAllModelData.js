import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllModelData = createAsyncThunk("data/fetchAllModelData", async () => {
  const response = await axiosInstance.get("api/v1/admin/models");
  return response.data;
});

export default fetchAllModelData;