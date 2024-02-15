import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/interceptors/axiosInterceptors';


const fetchAllUserData = createAsyncThunk("data/fetchAllUserData", async () => {
    const response = await axiosInstance.get(`api/v1/admin/users/getAll`);
    return response.data;
  });

export default fetchAllUserData;