import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utilities/interceptors/axiosInterceptors';


const fetchUserUpdateData = createAsyncThunk("data/fetchUserUpdateData", async () => {
    const response = await axiosInstance.put(`api/v1/users/`);
    return response.data;
  });

export default fetchUserUpdateData;