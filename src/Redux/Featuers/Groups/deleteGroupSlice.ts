
import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const deleteGroup = createAsyncThunk(
  "deleteGroupSlice/deleteGroup",
  async (id) => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.delete(`/api/group/${id}`,{
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

const deleteGroupSlice = createSlice({
  name: "deleteGroupSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteGroup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      deleteGroup.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      deleteGroup.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default deleteGroupSlice.reducer;
