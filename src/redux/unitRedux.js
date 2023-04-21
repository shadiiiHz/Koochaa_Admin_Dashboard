import { createSlice } from "@reduxjs/toolkit";

export const unitSlice = createSlice({
  name: "unit",
  initialState: {
    units: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getUnitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUnitSuccess: (state, action) => {
      state.isFetching = false;
      state.units = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getUnitFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageUnit: (state, action) => {
      state.lastPage = action.payload;
    },
    //DELETE
    deleteUnitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUnitSuccess: (state, action) => {
      state.isFetching = false;
      state.units.splice(
        state.units.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteUnitFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //activate
    activeUnitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    activeUnitSuccess: (state, action) => {
      state.isFetching = false;
      
      state.units.findIndex((item) =>
        item.id === action.payload ? (item.is_active = 1) : ""
      );
    },
    activeUnitFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //deactive
    deactiveUnitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deactiveUnitSuccess: (state, action) => {
      state.isFetching = false;
      
      state.units.findIndex((item) =>
        item.id === action.payload ? (item.is_active = 0) : ""
      );
    },
    deactiveUnitFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUnitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUnitSuccess: (state, action) => {
      state.isFetching = false;
      state.units[
        state.units.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.unit;
    },
    updateUnitFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Create
    addUnitStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUnitSuccess: (state, action) => {
      state.isFetching = false;
      state.units.push(action.payload);
    },
    addUnitFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUnitStart,
  getUnitSuccess,
  getUnitFailure,
  deleteUnitStart,
  deleteUnitSuccess,
  deleteUnitFailure,
  updateUnitStart,
  updateUnitSuccess,
  updateUnitFailure,
  addUnitStart,
  addUnitSuccess,
  addUnitFailure,
  getPageUnit,
  activeUnitStart,
  activeUnitFailure,
  activeUnitSuccess,
  deactiveUnitStart,
  deactiveUnitFailure,
  deactiveUnitSuccess,
} = unitSlice.actions;

export default unitSlice.reducer;
