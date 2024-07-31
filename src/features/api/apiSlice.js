import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;
// console.log("URL is ",import.meta.env.VITE_SERVER_DOMAIN)

export const fetchUserData = createAsyncThunk(
  "api/fetchUserData",
  async (email, { rejectWithValue }) => {
    try {
      
      console.log("API data ", email);
      const response = await axios.get(`/api/user/${email}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    isLoading: false,
    apiData: null,
    status: null,
    serverError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.serverError = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apiData = action.payload;
        state.status = 201;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.serverError = action.payload;
      });
  },
});

export default apiSlice.reducer;
