
import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const createNewGroup = createAsyncThunk(
  "addNewGroupSlice/createNewGroup",
  async (data) => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.post(`/api/group`, data,{
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

const addNewGroupSlice = createSlice({
  name: "addNewGroupSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewGroup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      createNewGroup.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      createNewGroup.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default addNewGroupSlice.reducer;
