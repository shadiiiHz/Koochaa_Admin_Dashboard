import { createSlice } from "@reduxjs/toolkit";

export const continentSlice = createSlice({
  name: "continent",
  initialState: {
    continents: [],
    isFetching: false,
    error: false,
    id: 0,
  },
  reducers: {
    //GET ALL
    getContinentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getContinentSuccess: (state, action) => {
      state.isFetching = false;
      state.continents = action.payload;
    },
    getContinentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //get ID by name
    getIdStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getIdSuccess: (state, action) => {
      state.isFetching = false;
      state.id = action.payload;
    },
    getIdFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteContinentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteContinentSuccess: (state, action) => {
      state.isFetching = false;
      state.continents.splice(
        state.continents.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteContinentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateContinentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateContinentSuccess: (state, action) => {
      state.isFetching = false;
      state.continents[
        state.continents.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.continent;
    },
    updateContinentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Create
    addContinentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addContinentSuccess: (state, action) => {
      state.isFetching = false;
      state.continents.push(action.payload);
    },
    addContinentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getContinentStart,
  getContinentSuccess,
  getContinentFailure,
  deleteContinentStart,
  deleteContinentSuccess,
  deleteContinentFailure,
  updateContinentStart,
  updateContinentSuccess,
  updateContinentFailure,
  addContinentStart,
  addContinentSuccess,
  addContinentFailure,
  getIdStart,
  getIdSuccess,
  getIdFailure,
} = continentSlice.actions;

export default continentSlice.reducer;
