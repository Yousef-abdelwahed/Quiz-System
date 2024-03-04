import baseUrl from "@/Utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const deleteQuestion = createAsyncThunk(
  "DeleteQuestions/deleteQuestion",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const fetchData = await baseUrl.delete(`/api/question/${id}`, {
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
const DeleteQuestionsSlice = createSlice({
  name: "deleteCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default DeleteQuestionsSlice.reducer;
