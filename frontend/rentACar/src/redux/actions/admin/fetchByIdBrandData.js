import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/interceptors/axiosInterceptors';


const fetchByIdBrandData = createAsyncThunk("data/fetchByIdBrandData", async (id) => {
    const response = await axiosInstance.get(`api/v1/admin/brands/${id}`);
    return response.data;
  });

export default fetchByIdBrandData;


