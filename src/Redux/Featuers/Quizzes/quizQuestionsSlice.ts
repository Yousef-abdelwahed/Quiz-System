import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getAllQuestionsData = createAsyncThunk(
  "getQuestionsSlice/getAllQuestionsData",
  async (quizId) => {
    const token = localStorage.getItem("UserToken");
    try {
      const response = await baseUrl.get(`/api/quiz/without-answers/${quizId}` ,{
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
const getQuestionsSlice = createSlice({
  name: "getQuestionsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllQuestionsData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getAllQuestionsData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getAllQuestionsData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getQuestionsSlice.reducer;
