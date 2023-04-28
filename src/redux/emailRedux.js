import { createSlice } from "@reduxjs/toolkit";

export const emailSlice = createSlice({
  name: "email",
  initialState: {
    emails: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getEmailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getEmailSuccess: (state, action) => {
      state.isFetching = false;
      state.emails = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getEmailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageEmail: (state, action) => {
      state.lastPage = action.payload;

    },
    clear : (state) => {
      state.lastPage = 0;
      state.emails = [];
    },
  
  },
});

export const {
  getEmailStart,
  getEmailSuccess,
  getEmailFailure,
  deleteEmailStart,
  getPageEmail,
  clear
} = emailSlice.actions;

export default emailSlice.reducer;