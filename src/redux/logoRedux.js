import { createSlice } from "@reduxjs/toolkit";

export const logoSlice = createSlice({
  name: "logo",
  initialState: {
    logo: [],
    isFetching: false,
    error: false,
  
  },
  reducers: {
    //GET ALL
    getLogoStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getLogoSuccess: (state, action) => {
      state.isFetching = false;
      state.logo = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getLogoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  
    //DELETE
    deleteLogoStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteLogoSuccess: (state) => {
      state.isFetching = false;
      state.logo = [];
    },
    deleteLogoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // //get ID by name
    // getLogoIdStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // getLogoIdSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.id = action.payload;
    // },
    // getLogoIdFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    //UPDATE
    // updateLogoStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // updateLogoSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.logo[
    //     state.logo.findIndex((item) => item.id === action.payload.id)
    //   ] = action.payload.logo;
    // },
    // updateLogoFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    
  },
});

export const {
  getLogoStart,
  getLogoSuccess,
  getLogoFailure,
  deleteLogoStart,
  deleteLogoSuccess,
  deleteLogoFailure,

} = logoSlice.actions;

export default logoSlice.reducer;
