import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utilities/interceptors/axiosInterceptors';


const fetchByUserIdRental = createAsyncThunk("data/fetchByUserIdRental", async (id) => {
    const response = await axiosInstance.get(`api/v1/rentals/byUser/${id}`);
    return response.data;
  });

export default fetchByUserIdRental;