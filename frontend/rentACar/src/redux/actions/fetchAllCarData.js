import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/interceptors/axiosInterceptors";



const fetchAllCarData = createAsyncThunk("data/fetchAllCarData", async () => {
    console.log("İstek Car listingden atıldı.")
    const response = await axiosInstance.get("api/v1/cars");
    console.log("cevap listing e ulaştı.")
    return response.data;
  });

export default fetchAllCarData;

