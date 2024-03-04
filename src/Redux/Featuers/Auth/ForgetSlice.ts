import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ForgetData = createAsyncThunk(
  "ForgetSlice/ForgetData",
  async (data) => {
    try {
      const response = await baseUrl.post(`/api/auth/forgot-password`, data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };

export const ForgetSlice = createSlice({
  name: "ForgetSlice",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
     builder.addCase(ForgetData.pending,(state)=>{
        state.isLoading=true
     })
     builder.addCase(ForgetData.fulfilled,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.data=action.payload;
     })
     builder.addCase(ForgetData.rejected,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.error=action.payload.message
     })
  },
});
