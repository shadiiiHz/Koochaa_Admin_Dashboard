import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({
  name: "city",
  initialState: {
    cities: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getCityStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCitySuccess: (state, action) => {
      state.isFetching = false;
      state.cities = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getCityFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageCity: (state, action) => {
      state.lastPage = action.payload;

    },
    //DELETE
    deleteCityStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCitySuccess: (state, action) => {
      state.isFetching = false;
      state.cities.splice(
        state.cities.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteCityFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateCityStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCitySuccess: (state, action) => {
      state.isFetching = false;
      state.cities[
        state.cities.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.city;
    },
    updateCityFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Create
    addCityStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCitySuccess: (state, action) => {
      state.isFetching = false;
      state.cities.push(action.payload);
    },
    addCityFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCityStart,
  getCitySuccess,
  getCityFailure,
  deleteCityStart,
  deleteCitySuccess,
  deleteCityFailure,
  updateCityStart,
  updateCitySuccess,
  updateCityFailure,
  addCityStart,
  addCitySuccess,
  addCityFailure,
  getPageCity,
} = citySlice.actions;

export default citySlice.reducer;
