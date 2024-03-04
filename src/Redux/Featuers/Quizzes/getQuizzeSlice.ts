/** @format */

import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import baseUrl from "@/Utils/Custom/Custom";

// Thunk to fetch a single quiz by ID
export const getQuizById = createAsyncThunk(
  "getQuizzeSlice/getQuizById",
  async (quizId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("UserToken");
      const response = await baseUrl.get(`/api/quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllQuizzesData = createAsyncThunk(
  "getQuizzeSlice/getAllQuizzesData",
  async (quizId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("UserToken");
      const response = await baseUrl.get(`/api/quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

// Selector to extract quiz data from the Redux store
export const selectQuizData = (state) => state.getQuizzeSlice.data;

const initialState = { data: {}, isLoading: false, error: null };

const getQuizzeSlice = createSlice({
  name: "getQuizzeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllQuizzesData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllQuizzesData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllQuizzesData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // Add extra reducers for getQuizById
    builder.addCase(getQuizById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getQuizById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getQuizzeSlice.reducer;
