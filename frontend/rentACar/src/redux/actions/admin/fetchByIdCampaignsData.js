import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/interceptors/axiosInterceptors';


const fetchByIdCampaignsData = createAsyncThunk("data/fetchByIdCampaignsData", async (id) => {
    const response = await axiosInstance.get(`api/v1/admin/campaigns/${id}`);
    return response.data;
  });

export default fetchByIdCampaignsData;


