/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addQuizzesData = createAsyncThunk(
  "addQuizzesSlice/addQuizzesData",
  async (data) => {
    const token = localStorage.getItem("UserToken");

    const dataCollection = {
      title: data?.title,
      description: data?.description,
      group: data?.group,
      questions_number: data?.questions_number,
      difficulty: data?.difficulty,
      type: data?.type,
      schadule: `${data?.schadule}T${data?.time}`,
      duration: data?.duration,
      score_per_question: data?.score_per_question,
    };
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3005/api/quiz`,
        dataCollection,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const serializedHeaders = {
        contentLength: response.headers["content-length"],
        contentType: response.headers["content-type"],
      };
      toast.success(response?.data?.message);
      return { data: response.data, headers: serializedHeaders };
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };

const addQuizzesSlice = createSlice({
  name: "addQuizzesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addQuizzesData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      addQuizzesData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      addQuizzesData.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload.message;
      }
    );
  },
});

export default addQuizzesSlice.reducer;
