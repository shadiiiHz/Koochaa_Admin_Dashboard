import { createSlice } from "@reduxjs/toolkit";

export const firstNameSlice = createSlice({
  name: "firstName",
  initialState: {
    firstNames: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getFirstNameStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getFirstNameSuccess: (state, action) => {
      state.isFetching = false;
      state.firstNames = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getFirstNameFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageFirstName: (state, action) => {
      state.lastPage = action.payload;

    },
    clear : (state) => {
      state.lastPage = 0;
      state.firstNames = [];
    },
  
  },
});

export const {
  getFirstNameStart,
  getFirstNameSuccess,
  getFirstNameFailure,
  deleteFirstNameStart,
  getPageFirstName,
  clear
} = firstNameSlice.actions;

export default firstNameSlice.reducer;