
import baseUrl from "@/Utils/Custom/Custom";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const editGroup = createAsyncThunk(
  "editGroupSlice/editGroup",
  async (AllData) => {
    const token = localStorage.getItem("UserToken");

    try {
      const response = await baseUrl.put(`/api/group/${AllData?.id}`, {
        name: AllData?.name,
        students: AllData.students
      }, {
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

const editGroupSlice = createSlice({
  name: "editGroupSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editGroup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      editGroup.fulfilled,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.data = action.payload);
      }
    );
    builder.addCase(
      editGroup.rejected,
      (state, action: PayloadAction<any>) => {
        (state.isLoading = false), (state.error = action.payload.message);
      }
    );
  },
});
export default editGroupSlice.reducer;
