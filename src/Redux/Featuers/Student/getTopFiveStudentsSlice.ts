/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getTopFiveStudents = createAsyncThunk(
  "getTopFiveStudentsSlice/getTopFiveStudents",
  async () => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.get(`/api/student/top-five`, {
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

const getTopFiveStudentsSlice = createSlice({
  name: "getTopFiveStudentsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopFiveStudents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getTopFiveStudents.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getTopFiveStudents.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getTopFiveStudentsSlice.reducer;
