import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/";

const fetchAllCarData = createAsyncThunk("data/fetchAllCarData", async () => {
    const response = await axios.get("api/v1/cars");
    return response.data;
  });

export default fetchAllCarData;

