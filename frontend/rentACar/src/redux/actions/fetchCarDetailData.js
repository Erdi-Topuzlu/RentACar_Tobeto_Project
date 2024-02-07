import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utilities/interceptors/axiosInterceptors';


const fetchCarDetailData = createAsyncThunk("data/fetchCarDetailData", async (id) => {
    const response = await axiosInstance.get(`api/v1/cars/getByCar/${id}`);
    return response.data;
  });

export default fetchCarDetailData;