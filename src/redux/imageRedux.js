import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
  name: "image",
  initialState: {
    images: "",
    isFetching: false,
    error: false,
  
  },
  reducers: {
    //GET ALL
    getImageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getImageSuccess: (state, action) => {
      state.isFetching = false;
      state.images = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getImageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  
    //DELETE
    deleteImageStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteImageSuccess: (state) => {
      state.isFetching = false;
     
    },
    deleteImageFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // //get ID by name
    // getImageIdStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // getImageIdSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.id = action.payload;
    // },
    // getImageIdFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    //UPDATE
    // updateImageStart: (state) => {
    //   state.isFetching = true;
    //   state.error = false;
    // },
    // updateImageSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.image[
    //     state.image.findIndex((item) => item.id === action.payload.id)
    //   ] = action.payload.image;
    // },
    // updateImageFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    
  },
});

export const {
  getImageStart,
  getImageSuccess,
  getImageFailure,
  deleteImageStart,
  deleteImageSuccess,
  deleteImageFailure,

} = imageSlice.actions;

export default imageSlice.reducer;
