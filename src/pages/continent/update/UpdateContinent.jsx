import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./updateContinent.css";
const UpdateContinent = () => {
  const location = useLocation();
  const continentId = location.pathname.split("/")[2];

  const history = useNavigate();

  const continent = useSelector((state) => {
    return state.continent.continents.find(
      (continent) => continent.id == continentId
    );
  });
  //fill inputs with prev name and latin_name data
  const [name, setName] = useState(continent.name.toString());
  const [latin_name, setLatin_name] = useState(continent.latin_name.toString());

  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  // const handleChange = (e) => {
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };
  const handleClick = async (e) => {
    e.preventDefault();

    const form = { name, latin_name };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/admin/dashboard/locations/continents/${continentId}`,
        form,
        configuration
      );
      history(`/continents`);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="updateContinent">
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Continent</h1>
        </div>
        <div className="productTop">
          <div className="productInfoKey">id:</div>
          <div className="productInfoValue">{continent.id}</div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>name</label>
              <input
                type="text"
                name="name"
                defaultValue={continent.name}
                // onChange={handleChange}
                onChange={(e) => setName(e.target.value)}
              />
              <label>latin_name</label>
              <input
                type="text"
                name="latin_name"
                defaultValue={continent.latin_name}
                // onChange={handleChange}
                onChange={(e) => setLatin_name(e.target.value)}
              />
            </div>
            <div className="productFormRight">
              <button className="productButton" onClick={handleClick}>
                update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateContinent;
