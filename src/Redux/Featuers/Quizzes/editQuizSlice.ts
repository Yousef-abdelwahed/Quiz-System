/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface Props {
  data: any[];
  loading: boolean;
  error: null | string;
}

export const editQuizzes = createAsyncThunk<any, void>(
  "editQuizzesSlice/editQuizzes",
  async ({quizId, data}) => {
    console.log(quizId, data)
    const dataCollection = {
      title: data?.title,
      description: data?.description,
      score_per_question: data?.score_per_question,
      duration: data?.duration,
      schadule: `${data?.schadule}T${data?.time}`,
    };
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.put(
        `/api/quiz/${quizId}`,
        dataCollection,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const serializedHeaders = {
        contentLength: response.headers["content-length"],
        contentType: response.headers["content-type"],
      };
      toast.success("edd Quiz successfully");

      return { data: response.data, headers: serializedHeaders };
    } catch (error) {
      console.log(error);
      // rejectWithValue(error);
    }
  }
);

const initialState: Props = {
  data: [],
  loading: false,
  error: null,
};

const editQuizzesSlice = createSlice({
  name: "editQuizzesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editQuizzes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editQuizzes.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      editQuizzes.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default editQuizzesSlice.reducer;
