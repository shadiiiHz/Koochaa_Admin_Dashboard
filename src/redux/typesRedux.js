import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
  name: "type",
  initialState: {
    types: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getTypeStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getTypeSuccess: (state, action) => {
      state.isFetching = false;
      state.types = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getTypeFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageType: (state, action) => {
      state.lastPage = action.payload;

    },
  
  },
});

export const {
  getTypeStart,
  getTypeSuccess,
  getTypeFailure,
  deleteTypeStart,
  getPageType,
} = typeSlice.actions;

export default typeSlice.reducer;