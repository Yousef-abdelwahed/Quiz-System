/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getStudentData = createAsyncThunk(
  "setStudent/getStudentData",
  async () => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.get(`/api/student`, {
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

const setStudent = createSlice({
  name: "setStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getStudentData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getStudentData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default setStudent.reducer;
