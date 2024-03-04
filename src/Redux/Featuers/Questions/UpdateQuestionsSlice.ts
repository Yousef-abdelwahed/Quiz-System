import baseUrl from "@/Utils/Custom/Custom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

export const updateQuestions = createAsyncThunk(
  "UpdateQuestions/updateQuestions",
  async ({ id, data }, thunkAPI) => {
    console.log("data id =", data._id);
    const { rejectWithValue } = thunkAPI;
    try {
      const fetchData = await baseUrl.put(`/api/question/${id}`, data, {
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
const UpdateQuestionsSlice = createSlice({
  name: "updateQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(updateQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default UpdateQuestionsSlice.reducer;
