import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    countries: [],
    isFetching: false,
    error: false,
    lastPage: 0,
    id: 0,
  },
  reducers: {
    //GET ALL
    getCountryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCountrySuccess: (state, action) => {
      state.isFetching = false;
      state.countries = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getCountryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPage: (state, action) => {
      state.lastPage = action.payload;
    },
    //DELETE
    deleteCountryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCountrySuccess: (state, action) => {
      state.isFetching = false;
      state.countries.splice(
        state.countries.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteCountryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //get ID by name
    getCountryIdStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCountryIdSuccess: (state, action) => {
      state.isFetching = false;
      state.id = action.payload;
    },
    getCountryIdFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCountryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCountrySuccess: (state, action) => {
      state.isFetching = false;
      state.countries[
        state.countries.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.country;
    },
    updateCountryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Create
    addCountryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCountrySuccess: (state, action) => {
      state.isFetching = false;
      state.countries.push(action.payload);
    },
    addCountryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCountryStart,
  getCountrySuccess,
  getCountryFailure,
  deleteCountryStart,
  deleteCountrySuccess,
  deleteCountryFailure,
  updateCountryStart,
  updateCountrySuccess,
  updateCountryFailure,
  addCountryStart,
  addCountrySuccess,
  addCountryFailure,
  getPage,
  getCountryIdStart,
  getCountryIdSuccess,
  getCountryIdFailure
} = countrySlice.actions;

export default countrySlice.reducer;
