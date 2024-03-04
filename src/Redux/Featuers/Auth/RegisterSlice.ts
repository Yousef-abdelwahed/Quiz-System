import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const RegisterData = createAsyncThunk(
  "RegisterSlice/RegisterData",
  async (data) => {
    try {

      const response = await baseUrl.post(`/api/auth/register`, data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };

export const RegisterSlice = createSlice({
  name: "RegisterSlice",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
     builder.addCase(RegisterData.pending,(state)=>{
        state.isLoading=true
     })
     builder.addCase(RegisterData.fulfilled,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.data=action.payload;
     })
     builder.addCase(RegisterData.rejected,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.error=action.payload.message
     })
  },
});
