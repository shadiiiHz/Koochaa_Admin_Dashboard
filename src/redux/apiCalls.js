import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, publicRequest2, userRequest } from "../requestMethods";
import {
  getContinentFailure,
  getContinentStart,
  getContinentSuccess,
  updateContinentStart,
  updateContinentSuccess,
  updateContinentFailure,
  getIdStart,
  getIdFailure,
  getIdSuccess,
} from "./continentRedux";
import {
  getCountryFailure,
  getCountryStart,
  getCountrySuccess,
  deleteCountryFailure,
  deleteCountryStart,
  deleteCountrySuccess,
  getCountryIdStart,
  getCountryIdSuccess,
  getCountryIdFailure,
  updateCountryStart,
  updateCountrySuccess,
  updateCountryFailure,
  getPage,
} from "./countryRedux";
import {
  getCityFailure,
  getCityStart,
  getCitySuccess,
  deleteCityFailure,
  deleteCityStart,
  deleteCitySuccess,
  addCityFailure,
  addCityStart,
  addCitySuccess,
  updateCityStart,
  updateCitySuccess,
  updateCityFailure,
  getPageCity,
} from "./cityRedux";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  activeCategoryFailure,
  activeCategoryStart,
  activeCategorySuccess,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  getPageCategory,
  deactiveCategorySuccess,
  deactiveCategoryFailure,
  deactiveCategoryStart,
} from "./categoryRedux";
import {
  getTypeFailure,
  getTypeStart,
  getTypeSuccess,
  getPageType,
  clear,
} from "./typesRedux";
import {
  getUnitFailure,
  getUnitStart,
  getUnitSuccess,
  deleteUnitFailure,
  deleteUnitStart,
  deleteUnitSuccess,
  activeUnitFailure,
  activeUnitStart,
  activeUnitSuccess,
  updateUnitStart,
  updateUnitSuccess,
  updateUnitFailure,
  getPageUnit,
  deactiveUnitSuccess,
  deactiveUnitFailure,
  deactiveUnitStart,
} from "./unitRedux";
import {
  getLogoFailure,
  getLogoStart,
  getLogoSuccess,
  deleteLogoFailure,
  deleteLogoStart,
  deleteLogoSuccess,
} from "./logoRedux";
import {
  getImageFailure,
  getImageStart,
  getImageSuccess,
  deleteImageFailure,
  deleteImageStart,
  deleteImageSuccess,
} from "./imageRedux";
import {
  getUserListFailure,
  getUserListStart,
  getUserListSuccess,
  deleteUserListFailure,
  deleteUserListStart,
  deleteUserListSuccess,
  activeUserListFailure,
  activeUserListStart,
  activeUserListSuccess,
  updateUserListStart,
  updateUserListSuccess,
  updateUserListFailure,
  getPageUserList,
  deactiveUserListSuccess,
  deactiveUserListFailure,
  deactiveUserListStart,
  activeUserStart,
  activeUserSuccess,
  activeUserFailure,
  deactiveUserFailure,
  deactiveUserSuccess,
  deactiveUserStart,
  deleteUserOfListFailure,
  deleteUserOfListSuccess,
  deleteUserOfListStart,
} from "./userListRedux";
import { getEmailFailure, getEmailStart, getEmailSuccess, getPageEmail } from "./emailRedux";
import { getFirstNameFailure, getFirstNameStart, getFirstNameSuccess, getPageFirstName } from "./fNameRedux.js";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signin", user);
    // console.log(res.data.body.access_token);
    dispatch(loginSuccess(res.data.body.access_token));
  } catch (err) {
    dispatch(loginFailure());
  }
};
///////////////////////////////Continent///////////////////////////////////////////
export const getContinents = async (dispatch, configuration, page) => {
  dispatch(getContinentStart());
  try {
    const res = await publicRequest2.get(
      `/locations/continents?page=${page}`,
      configuration
    );
    // console.log(res.data.data);
    dispatch(getContinentSuccess(res.data.data));
  } catch (err) {
    dispatch(getContinentFailure());
  }
};
export const getContinentIdByName = async (dispatch, configuration, name) => {
  dispatch(getIdStart());
  try {
    const res = await publicRequest2.get(
      `/locations/continents?name=${name}`,
      configuration
    );
    // console.log(res.data.data[0].id);
    dispatch(getIdSuccess(res.data.data[0].id));
  } catch (err) {
    dispatch(getIdFailure());
  }
};
export const updateContinent = async (id, continent, dispatch) => {
  dispatch(updateContinentStart());
  try {
    // update
    dispatch(updateContinentSuccess({ id, continent }));
  } catch (err) {
    dispatch(updateContinentFailure());
  }
};
/////////////////////////country//////////////////////////////////////
export const getCountries = async (dispatch, configuration, page) => {
  dispatch(getCountryStart());
  try {
    const res = await publicRequest2.get(
      `/locations/countries?page=${page}`,
      configuration
    );
    // console.log(res.data.body.data);
    dispatch(getCountrySuccess(res.data.body.data));
    dispatch(getPage(res.data.body.last_page));
  } catch (err) {
    dispatch(getCountryFailure());
  }
};
export const getCountriesByName = async (dispatch, configuration, name) => {
  dispatch(getCountryStart());
  try {
    const res = await publicRequest2.get(
      `/locations/countries?page=1&name=${name}`,
      configuration
    );
    console.log(res.data.body.data);
    dispatch(getCountrySuccess(res.data.body.data));
    dispatch(getPage(res.data.body.last_page));
  } catch (err) {
    dispatch(getCountryFailure());
  }
};
export const deleteCountry = async (id, dispatch, configuration) => {
  dispatch(deleteCountryStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(
      `/locations/countries/${id}`,
      configuration
    );
    // console.log(res);
    dispatch(deleteCountrySuccess(id));
  } catch (err) {
    dispatch(deleteCountryFailure());
  }
};
export const updateCountry = async (id, country, dispatch) => {
  dispatch(updateCountryStart());
  try {
    // update
    dispatch(updateCountrySuccess({ id, country }));
  } catch (err) {
    dispatch(updateCountryFailure());
  }
};
// export const getCountryIdByName = async (dispatch, configuration, name) => {
//   dispatch(getCountryIdStart());
//   try {
//     const res = await publicRequest2.get(
//       `/locations/countries?name=${name}`,
//       configuration
//     );
//     // console.log(res.data.body.data[0].id);
//     dispatch(getCountryIdSuccess(res.data.body.data[0].id));
//   } catch (err) {
//     dispatch(getCountryIdFailure());
//   }
// };
///////////////////////city//////////////////////////
export const getCities = async (dispatch, configuration, page) => {
  dispatch(getCityStart());
  try {
    const res = await publicRequest2.get(
      `/locations/cities?page=${page}`,
      configuration
    );
    // console.log(res.data.body.data);
    dispatch(getCitySuccess(res.data.body.data));
    dispatch(getPageCity(res.data.body.last_page));
  } catch (err) {
    dispatch(getCityFailure());
  }
};
// export const getCitiesByName = async (dispatch, configuration, name) => {
//   dispatch(getCityStart());
//   try {
//     const res = await publicRequest2.get(
//       `/locations/cities?page=1&name=${name}`,
//       configuration
//     );
//     // console.log(res.data);
//     dispatch(getCitySuccess(res.data.body.data));
//     dispatch(getPageCity(res.data.body.last_page))
//   } catch (err) {
//     dispatch(getCityFailure());
//   }
// };
export const deleteCity = async (id, dispatch, configuration) => {
  dispatch(deleteCityStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(
      `/locations/cities/${id}`,
      configuration
    );
    // console.log(res);
    dispatch(deleteCitySuccess(id));
  } catch (err) {
    dispatch(deleteCityFailure());
  }
};
export const updateCity = async (id, city, dispatch) => {
  dispatch(updateCityStart());
  try {
    // update
    dispatch(updateCitySuccess({ id, city }));
  } catch (err) {
    dispatch(updateCityFailure());
  }
};
export const getCitiesByCountryId = async (dispatch, configuration, id) => {
  dispatch(getCityStart());
  try {
    const res = await publicRequest2.get(
      `/locations/cities?country_id=${id}`,
      configuration
    );
    // console.log(id)
    
    dispatch(getCitySuccess(res.data.body.data));
    // dispatch(getPageCity(res.data.body.last_page));
  } catch (err) {
    dispatch(getCityFailure());
  }
};
///////////////category//////////////////////
export const getCategories = async (dispatch, configuration, page) => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest2.get(
      `/units/a/categories?page=${page}`,
      configuration
    );
    // console.log(res.data.body.data);
    dispatch(getCategorySuccess(res.data.body.data));
    dispatch(getPageCategory(res.data.body.last_page));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};

export const getTypes = async (dispatch, configuration, type, page) => {
  dispatch(getTypeStart());
  try {
    if (page == 1) {
      const res = await publicRequest2.get(
        `/units/a/categories?type=${type}&page=1`,
        configuration
      );
      // console.log(res.data.body.data);
      dispatch(getTypeSuccess(res.data.body.data));
      dispatch(getPageType(res.data.body.last_page));
    } else {
      const res = await publicRequest2.get(
        `/units/a/categories?type=${type}&page=${page}`,
        configuration
      );
      // console.log(res.data.body.data);
      dispatch(getTypeSuccess(res.data.body.data));
      dispatch(getPageType(res.data.body.last_page));
    }
  } catch (err) {
    dispatch(getTypeFailure());
  }
};
//
export const getTypeAndNameForUnit = async (
  dispatch,
  configuration,
  type,
  name
) => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest2.get(
      `/units/a/categories?title=${name}&type=${type}`,
      configuration
    );
    // console.log(res.data.body.data);
    dispatch(getCategorySuccess(res.data.body.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};
export const deleteCategory = async (id, dispatch, configuration) => {
  dispatch(deleteCategoryStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(
      `/units/a/categories/${id}`,
      configuration
    );
    // console.log(res);
    dispatch(deleteCategorySuccess(id));
  } catch (err) {
    dispatch(deleteCategoryFailure());
  }
};
export const updateCategory = async (id, category, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    // update
    dispatch(updateCategorySuccess({ id, category }));
  } catch (err) {
    dispatch(updateCategoryFailure());
  }
};
export const activeCategory = async (id, dispatch, configuration) => {
  dispatch(activeCategoryStart());
  try {
    // console.log(id);
    const res = await publicRequest2.post(
      `/units/a/categories/activate/${id}`,
      "",
      configuration
    );
    // console.log("res", res);
    dispatch(activeCategorySuccess(id));
  } catch (err) {
    dispatch(activeCategoryFailure());
  }
};
export const deactiveCategory = async (id, dispatch, configuration) => {
  dispatch(deactiveCategoryStart());
  try {
    // console.log(id);
    const res = await publicRequest2.post(
      `/units/a/categories/deactivate/${id}`,
      "",
      configuration
    );
    console.log("res", res);
    dispatch(deactiveCategorySuccess(id));
  } catch (err) {
    dispatch(deactiveCategoryFailure());
  }
};
///////////////////unit/////////////////////////////////
export const getUnits = async (dispatch, configuration, page) => {
  dispatch(getUnitStart());
  try {
    const res = await publicRequest2.get(`/units?page=${page}`, configuration);
    // console.log(res.data.body.data);
    dispatch(getUnitSuccess(res.data.body.data));
    dispatch(getPageUnit(res.data.body.last_page));
  } catch (err) {
    dispatch(getUnitFailure());
  }
};
export const getByTitle = async (dispatch, configuration, title, page) => {
  dispatch(getTypeStart());
  try {
    if (page == 1) {
      const res = await publicRequest2.get(
        `/units?title=${title}&page=1`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getTypeSuccess(res.data.body.data));
      dispatch(getPageType(res.data.body.last_page));
    } else {
      const res = await publicRequest2.get(
        `/units?title=${title}&page=${page}`,
        configuration
      );
      // console.log(res.data.body.data);
      dispatch(getTypeSuccess(res.data.body.data));
      dispatch(getPageType(res.data.body.last_page));
    }
  } catch (err) {
    dispatch(getTypeFailure());
  }
};
export const deleteUnit = async (id, dispatch, configuration) => {
  dispatch(deleteUnitStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(`/units/${id}`, configuration);
    // console.log(res);
    dispatch(deleteUnitSuccess(id));
  } catch (err) {
    dispatch(deleteUnitFailure());
  }
};
export const activeUnit = async (id, dispatch, configuration) => {
  dispatch(activeUnitStart());
  try {
    // console.log(id);
    const res = await publicRequest2.post(
      `/units/activate/${id}`,
      "",
      configuration
    );
    // console.log("res", res);
    dispatch(activeUnitSuccess(id));
  } catch (err) {
    dispatch(activeUnitFailure());
  }
};
export const deactiveUnit = async (id, dispatch, configuration) => {
  dispatch(deactiveUnitStart());
  try {
    // console.log(id);
    const res = await publicRequest2.post(
      `/units/deactivate/${id}`,
      "",
      configuration
    );
    console.log("res", res);
    dispatch(deactiveUnitSuccess(id));
  } catch (err) {
    dispatch(deactiveUnitFailure());
  }
};
///////////////logo///////////////////
export const getLogo = async (dispatch, configuration , file) => {
  dispatch(getLogoStart());
  try {
    const res = await publicRequest2.post(
      `/units/images/upload/logo`,
      file,
      configuration
    );
    // console.log(res.data.body.path);
    dispatch(getLogoSuccess(res.data.body.path));
  } catch (err) {
    dispatch(getLogoFailure());
  }
};
export const deleteLogo = async (unitId, dispatch, configuration) => {
  dispatch(deleteLogoStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(`/units/images/delete/logo/${unitId}`, configuration);
    // console.log(res);
    dispatch(deleteLogoSuccess());
  } catch (err) {
    dispatch(deleteLogoFailure());
  }
};
export const uploadLogo = async (unitId,dispatch, configuration , file) => {
  dispatch(getLogoStart());
  try {
    const res = await publicRequest2.post(
      `/units/images/upload/logo/${unitId}`,
      file,
      configuration
    );
    // console.log(res);
    dispatch(getLogoSuccess(res.data.body.path));
  } catch (err) {
    dispatch(getLogoFailure());
  }
};
///////////////////images//////////////////
export const getImage = async (dispatch, configuration , file) => {
  dispatch(getImageStart());
  try {
    const res = await publicRequest2.post(
      `http://localhost:8000/api/v1/admin/dashboard/units/images/upload/other`,
      file,
      configuration
    );
    // console.log("server",res.data.body.path);
    dispatch(getImageSuccess(res.data.body.path));
  } catch (err) {
    dispatch(getImageFailure());
  }
};
export const deleteImages = async (imageId, dispatch, configuration) => {
  dispatch(deleteImageStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(`/units/images/delete/other/${imageId}`, configuration);
    console.log(res);
    dispatch(deleteImageSuccess());
  } catch (err) {
    dispatch(deleteImageFailure());
  }
};
////////////////userlist/////////////////
export const getUserList = async (dispatch, configuration, page) => {
  dispatch(getUserListStart());
  try {
    const res = await publicRequest2.get(`/users?page=${page}`, configuration);
    console.log(res.data.body.data);
    dispatch(getUserListSuccess(res.data.body.data));
    dispatch(getPageUserList(res.data.body.last_page));
  } catch (err) {
    dispatch(getUserListFailure());
  }
};
export const getByGender = async (dispatch, configuration, gender, page) => {
  // dispatch(clear());
  dispatch(getTypeStart());
  try {
    
    if (page == 1) {
      const res = await publicRequest2.get(
        `/users?gender=${gender}&page=1`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getTypeSuccess(res.data.body.data));
      dispatch(getPageType(res.data.body.last_page));
    } else {
      const res = await publicRequest2.get(
        `/users?gender=${gender}&page=${page}`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getTypeSuccess(res.data.body.data));
      dispatch(getPageType(res.data.body.last_page));
    }
  } catch (err) {
    dispatch(getTypeFailure());
  }
};
export const getByEmail = async (dispatch, configuration, email, page) => {
  // dispatch(clear());
  dispatch(getEmailStart());
  try {
   
    if (page == 1) {
      const res = await publicRequest2.get(
        `/users?email=${email}&page=1`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getEmailSuccess(res.data.body.data));
      dispatch(getPageEmail(res.data.body.last_page));
    } else {
      const res = await publicRequest2.get(
        `/users?email=${email}&page=${page}`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getEmailSuccess(res.data.body.data));
      dispatch(getPageEmail(res.data.body.last_page));
    }
  } catch (err) {
    dispatch(getEmailFailure());
  }
};
export const getByFirstName = async (dispatch, configuration, firstName, page) => {
  // dispatch(clear());
  dispatch(getFirstNameStart());
  try {
   
    if (page == 1) {
      const res = await publicRequest2.get(
        `/users?first_name=${firstName}&page=1`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getFirstNameSuccess(res.data.body.data));
      dispatch(getPageFirstName(res.data.body.last_page));
    } else {
      const res = await publicRequest2.get(
        `/users?first_name=${firstName}&page=${page}`,
        configuration
      );
      console.log(res.data.body.data);
      dispatch(getFirstNameSuccess(res.data.body.data));
      dispatch(getPageFirstName(res.data.body.last_page));
    }
  } catch (err) {
    dispatch(getFirstNameFailure());
  }
};
export const activeUser = async (id, dispatch, configuration) => {
  dispatch(activeUserStart());
  try {
    // console.log(id);
    const res = await publicRequest2.post(
      `/users/activate/${id}`,
      "",
      configuration
    );
    // console.log("res", res);
    dispatch(activeUserSuccess(id));
  } catch (err) {
    dispatch(activeUserFailure());
  }
};
export const deactiveUser = async (id, dispatch, configuration) => {
  dispatch(deactiveUserStart());
  try {
    // console.log(id);
    const res = await publicRequest2.post(
      `/users/deactivate/${id}`,
      "",
      configuration
    );
    // console.log("res", res);
    dispatch(deactiveUserSuccess(id));
  } catch (err) {
    dispatch(deactiveUserFailure());
  }
};
export const deleteUserOfList = async (id, dispatch, configuration) => {
  dispatch(deleteUserOfListStart());
  try {
    // console.log(id);
    const res = await publicRequest2.delete(`/users/${id}`, configuration);
    // console.log(res);
    dispatch(deleteUserOfListSuccess(id));
  } catch (err) {
    dispatch(deleteUserOfListFailure());
  }
};