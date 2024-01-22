import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utilities/interceptors/axiosInterceptors';


const fetchUserData = createAsyncThunk("data/fetchUserData", async (id) => {
    const response = await axiosInstance.get(`api/v1/users/${id}`);
    return response.data;
  });

export default fetchUserData;