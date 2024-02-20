import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utilities/interceptors/axiosInterceptors";


const fetchAllCampaignsData = createAsyncThunk("data/fetchAllCampaignsData", async () => {
  const response = await axiosInstance.get("api/v1/admin/campaigns/getAll");
  return response.data;
});

export default fetchAllCampaignsData;