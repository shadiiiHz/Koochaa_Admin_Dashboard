import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import CreateCategory from "./pages/category/create/CreateCategory";
import SrchCategory from "./pages/category/Search/SrchCategory";
import UpdateCategory from "./pages/category/update/UpdateCategory";
import CreateCity from "./pages/city/create/CreateCity";
import SrchCity from "./pages/city/search/SrchCity";
import UpdateCity from "./pages/city/update/UpdateCity";
import SrchContinent from "./pages/continent/search/SrchContinent";
import UpdateContinent from "./pages/continent/update/UpdateContinent";
import CreateCountry from "./pages/country/create/CreateCountry";
import SrchCountry from "./pages/country/search/SrchCountry";
import UpdateCountry from "./pages/country/update/UpdateCountry";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CreateUnit from "./pages/unit/create/CreateUnit";
import SrchUnit from "./pages/unit/search/SrchUnit";
import UpdateUnit from "./pages/unit/update/UpdateUnit";
import NewUser from "./pages/user/newUser/NewUser";
import UpdateUser from "./pages/user/update/UpdateUser";
import UserList from "./pages/user/userList/UserList";


function App() {
  const admin = useSelector((state) => state.user.isAdmin);
  // console.log(admin);
  let isAdmin = admin;

  return (
    <Router>
      {/* <Route path="/login" element={isAdmin ?  <Navigate to="/" /> : <Login /> } /> */}

      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            path="/login"
            element={isAdmin ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/" element={isAdmin ? <Home /> : <Login />} />
          <Route path="/continents" element={isAdmin ? <SrchContinent /> : <Login />} />
          <Route path="/continent_update/:continentId" element={isAdmin ? <UpdateContinent /> : <Login />} />
          <Route path="/country" element={isAdmin ? <SrchCountry/> : <Login />} />
          <Route path="/createCountry" element={isAdmin ? <CreateCountry/> : <Login />} />
          <Route path="/country_update/:countryId" element={isAdmin ? <UpdateCountry/> : <Login />} />
          <Route path="/city" element={isAdmin ? <SrchCity/> : <Login />} />
          <Route path="/createCity" element={isAdmin ? <CreateCity/> : <Login />} />
          <Route path="/city_update/:cityId" element={isAdmin ? <UpdateCity /> : <Login />} />
          <Route path="/category" element={isAdmin ? <SrchCategory/> : <Login />} />
          <Route path="/createCategory" element={isAdmin ? <CreateCategory/> : <Login />} />
          <Route path="/category_update/:categoryId" element={isAdmin ? <UpdateCategory /> : <Login />} />
          <Route path="/unit" element={isAdmin ? <SrchUnit/> : <Login />} />
          <Route path="/createUnit" element={isAdmin ? <CreateUnit/> : <Login />} />
          <Route path="/unit_update/:unitId" element={isAdmin ? <UpdateUnit /> : <Login />} />
          <Route path="/users" element={isAdmin ? <UserList/> : <Login />} />
          <Route path="/newUser" element={isAdmin ? <NewUser/> : <Login />} />
          <Route path="/user_update/:userId" element={isAdmin ? <UpdateUser /> : <Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
