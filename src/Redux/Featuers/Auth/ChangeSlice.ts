import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ChangeData = createAsyncThunk(
  "ChangeSlice/ChangeData",
  async (data) => {
    const token = localStorage.getItem("UserToken");
    try {
      const response = await baseUrl.post(`/api/auth/change-password`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }
);

const initialState = { data: {}, isLoading: false, error: null };

export const ChangeSlice = createSlice({
  name: "ChangeSlice",
  initialState,
  reducers: {},
  extraReducers:(builder)=> {
     builder.addCase(ChangeData.pending,(state)=>{
        state.isLoading=true
     })
     builder.addCase(ChangeData.fulfilled,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.data=action.payload;
     })
     builder.addCase(ChangeData.rejected,(state,action:PayloadAction<any>)=>{
        state.isLoading=false,
        state.error=action.payload.message
     })
  },
});
