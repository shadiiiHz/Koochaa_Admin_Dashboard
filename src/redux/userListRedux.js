import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
  name: "userList",
  initialState: {
    userList: [],
    isFetching: false,
    error: false,
    lastPage: 0,
  },
  reducers: {
    //GET ALL
    getUserListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.userList = action.payload;
      // state.lastPage = action.payload.last_page;
    },
    getUserListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPageUserList: (state, action) => {
      state.lastPage = action.payload;
    },
    //DELETE
    deleteUserOfListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserOfListSuccess: (state, action) => {
      state.isFetching = false;
      state.userList.splice(
        state.userList.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteUserOfListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //activate
    activeUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    activeUserSuccess: (state, action) => {
      state.isFetching = false;
      
      state.userList.findIndex((item) =>
        item.id === action.payload ? (item.is_active = 1) : ""
      );
    },
    activeUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //deactive
    deactiveUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deactiveUserSuccess: (state, action) => {
      state.isFetching = false;
      
      state.userList.findIndex((item) =>
        item.id === action.payload ? (item.is_active = 0) : ""
      );
    },
    deactiveUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.userList[
        state.userList.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.userList;
    },
    updateUserListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Create
    addUserListStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserListSuccess: (state, action) => {
      state.isFetching = false;
      state.userList.push(action.payload);
    },
    addUserListFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUserListStart,
  getUserListSuccess,
  getUserListFailure,
  deleteUserOfListStart,
  deleteUserOfListSuccess,
  deleteUserOfListFailure,
  updateUserListStart,
  updateUserListSuccess,
  updateUserListFailure,
  addUserListStart,
  addUserListSuccess,
  addUserListFailure,
  getPageUserList,
  activeUserStart,
  activeUserFailure,
  activeUserSuccess,
  deactiveUserStart,
  deactiveUserFailure,
  deactiveUserSuccess,
} = userListSlice.actions;

export default userListSlice.reducer;
