import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/auth/";
const BASE_URL2 = "http://localhost:8000/api/v1/admin/dashboard/";
// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    ContentType: "application/json",
    AcceptLanguage: "de",
  },
});
export const publicRequest2 = axios.create({
  baseURL: BASE_URL2
});

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });
