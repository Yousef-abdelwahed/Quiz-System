/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export interface Props {
  data: any;
  loading: boolean;
  error: null | string;
}

export const getQuestions: any = createAsyncThunk(
  "GetAllQuestions/getQuestions",
  async (__, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await baseUrl.get(`/api/question`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: 1,
        },
      });
      const serializedHeaders = {
        contentLength: response.headers["content-length"],
        contentType: response.headers["content-type"],
      };
      return { data: response.data, headers: serializedHeaders };
    } catch (error) {
      return rejectWithValue("Error from server");
    }
  }
);
const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};
const GetAllQuestionsSlice = createSlice({
  name: "Questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.loading = false;
      //   state.error = action.payload.message;
    });
  },
});

export default GetAllQuestionsSlice.reducer;
