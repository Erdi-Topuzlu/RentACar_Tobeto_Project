import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/interceptors/axiosInterceptors';


const fetchByIdModelData = createAsyncThunk("data/fetchByIdModelData", async (id) => {
    const response = await axiosInstance.get(`api/v1/admin/models/${id}`);
    return response.data;
  });

export default fetchByIdModelData;


