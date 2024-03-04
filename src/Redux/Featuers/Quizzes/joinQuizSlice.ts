/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAllJoinData = createAsyncThunk(
  "getJoinSlice/getAllJoinData",
  async (data) => {
    console.log(data)
    const token = localStorage.getItem("UserToken");
    try {
      const response = await baseUrl.post(`/api/quiz/join`,data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const serializedHeaders = {
        contentLength: response.headers["content-length"],
        contentType: response.headers["content-type"],
      };
      return { data: response.data, headers: serializedHeaders };
    } catch (error) {
      return error;
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };
const getJoinSlice = createSlice({
  name: "getJoinSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllJoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllJoinData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getAllJoinData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getJoinSlice.reducer;
