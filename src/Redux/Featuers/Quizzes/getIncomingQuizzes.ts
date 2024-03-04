/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getIncomingQuizzesData = createAsyncThunk(
  "getQuizzesSlice/getIncomingQuizzesData",
  async () => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.get(`/api/quiz/incomming`, {
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

const getQuizzeSlice = createSlice({
  name: "getQuizzeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncomingQuizzesData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getIncomingQuizzesData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getIncomingQuizzesData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getQuizzeSlice.reducer;
