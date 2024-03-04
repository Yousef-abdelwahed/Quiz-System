import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ResetData = createAsyncThunk(
  "ResetSlice/ResetData",
  async (data) => {
    try {
      const response = await baseUrl.post(`/api/auth/reset-password`, data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };

export const ResetSlice = createSlice({
  name: "ResetSlice",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
     builder.addCase(ResetData.pending,(state)=>{
        state.isLoading=true
     })
     builder.addCase(ResetData.fulfilled,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.data=action.payload;
     })
     builder.addCase(ResetData.rejected,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.error=action.payload.message
     })
  },
});
