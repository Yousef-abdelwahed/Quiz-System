/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getStudentDataDetails = createAsyncThunk(
  "StudentDetailsSlice/getStudentDataDetails",
  async (studentId) => {
    const token = localStorage.getItem("UserToken");
    
    try {
      const response = await baseUrl.get(`/api/student/${studentId}`, {
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

const StudentDetailsSlice = createSlice({
  name: "StudentDetailsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentDataDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getStudentDataDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getStudentDataDetails.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default StudentDetailsSlice.reducer;
