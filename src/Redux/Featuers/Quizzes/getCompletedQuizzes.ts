/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getCompletedQuizzesData = createAsyncThunk(
  "getCompletedSlice/getIncomingQuizzesData",
  async () => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.get(`/api/quiz/completed`, {
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

const getCompletedSlice = createSlice({
  name: "getCompletedSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompletedQuizzesData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getCompletedQuizzesData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getCompletedQuizzesData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getCompletedSlice.reducer;
