/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const addQuestion = createAsyncThunk(
  "AddCategories/addQuestion",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const fetchData = await baseUrl.post(`/api/question`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      });
      return fetchData;
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }
);
const AddQuestionSlice = createSlice({
  name: "addQuestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default AddQuestionSlice.reducer;
