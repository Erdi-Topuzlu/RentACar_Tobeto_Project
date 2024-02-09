import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/interceptors/axiosInterceptors';


const fetchByIdColorData = createAsyncThunk("data/fetchByIdColorData", async (id) => {
    const response = await axiosInstance.get(`api/v1/admin/colors/${id}`);
    return response.data;
  });

export default fetchByIdColorData;


