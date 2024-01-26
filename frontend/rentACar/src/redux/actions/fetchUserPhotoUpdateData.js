import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utilities/interceptors/axiosInterceptors';


const fetchUserPhotoUpdateData = createAsyncThunk("data/fetchUserPhotoUpdateData", async (formData) => {
    const response = await axiosInstance.put(`api/v1/users/userImage/`, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });

export default fetchUserPhotoUpdateData;