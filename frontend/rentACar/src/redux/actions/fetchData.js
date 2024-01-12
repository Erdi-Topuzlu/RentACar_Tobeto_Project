import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/";

const fetchData = createAsyncThunk("data/fetchData", async () => {
    const response = await axios.get("api/v1/cars");
    return response.data;
  });

export default fetchData;