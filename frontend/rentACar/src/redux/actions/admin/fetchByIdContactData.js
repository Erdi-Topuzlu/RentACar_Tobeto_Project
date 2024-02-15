import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utilities/interceptors/axiosInterceptors';


const fetchByIdContactData = createAsyncThunk("data/fetchByIdContactData", async (id) => {
    const response = await axiosInstance.get(`api/v1/admin/contacts/getById/${id}`);
    return response.data;
  });

export default fetchByIdContactData;


