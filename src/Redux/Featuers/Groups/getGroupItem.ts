/** @format */

import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getGroupData = createAsyncThunk(
  "getGroupItem/getGroupData",
  async (id) => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.get(`/api/group/${id}`, {
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

const getGroupItem = createSlice({
  name: "getGroupItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getGroupData.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      getGroupData.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default getGroupItem.reducer;
