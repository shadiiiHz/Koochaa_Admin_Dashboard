import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageCategory: (state, action) => {
      state.lastPage = action.payload;
    },
    //DELETE
    deleteCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories.splice(
        state.categories.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //activate
    activeCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    activeCategorySuccess: (state, action) => {
      state.isFetching = false;
      
      state.categories.findIndex((item) =>
        item.id === action.payload ? (item.is_active = 1) : ""
      );
    },
    activeCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //deactive
    deactiveCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deactiveCategorySuccess: (state, action) => {
      state.isFetching = false;
      
      state.categories.findIndex((item) =>
        item.id === action.payload ? (item.is_active = 0) : ""
      );
    },
    deactiveCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories[
        state.categories.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.category;
    },
    updateCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Create
    addCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories.push(action.payload);
    },
    addCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
  getPageCategory,
  activeCategoryStart,
  activeCategoryFailure,
  activeCategorySuccess,
  deactiveCategoryStart,
  deactiveCategoryFailure,
  deactiveCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;
