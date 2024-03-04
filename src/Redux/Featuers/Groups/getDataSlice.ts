/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getQuizzesData = createAsyncThunk(
  "getDataSLice/getQuizzesData",
  async () => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.get(`/api/group`, {
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

const getDataSLice = createSlice({
  name: "getDataSLice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuizzesData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getQuizzesData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getQuizzesData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getDataSLice.reducer;
