import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const LoginData = createAsyncThunk(
  "LoginSlice/LoginData",
  async (data) => {
    try {
      const response = await baseUrl.post(`/api/auth/login`, data);
      return response;
    } catch (error) {
      return error
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };

const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoginData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(LoginData.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false,
        state.data = action.payload;

    })
    builder.addCase(LoginData.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false,
        state.error = action.payload.message
    })
  },
});

export default LoginSlice.reducer;