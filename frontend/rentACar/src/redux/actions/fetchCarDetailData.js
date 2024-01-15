import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080/";

const fetchCarDetailData = createAsyncThunk("data/fetchCarDetailData", async (id) => {
    const response = await axios.get(`api/v1/cars/${id}`);
    return response.data;
  });

export default fetchCarDetailData;