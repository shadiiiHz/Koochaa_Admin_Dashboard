import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCountriesByName } from "../../../redux/apiCalls";
import { mobile } from "../../../responsive";
const Updatecity = styled.div`
  flex: 9;
  /* height: 100vh; */
  width: 100vh;
  margin-left: 40px;
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ProductTitleContainer = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: center;
`;

const ProductTitle = styled.h1`
  font-size: 18px;
  text-align: center;
  color: #909066;
  font-family: "Delicious Handrawn", cursive;
  font-size: 40px;
`;
const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mobile({ alignItems: "center" })}
`;

const Label1 = styled.label`
  /* line-height: 15px; */
  margin-bottom: 10px;
  margin-top: 15px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
`;

const LanLat = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const LanLatInfo = styled.div`
  flex: 1;
  ${mobile({ marginBottom: "20px" })}
`;
const Label2 = styled.label`
  margin-right: 10px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
`;
const Input = styled.input`
  border: 1px solid gray;
  padding: 5px;
  border-radius: 15px;
  outline: none;
  &:hover {
    outline: none;
    padding: 5px;
  }
`;
const ProductFormRight = styled.div`
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ProductButton = styled.button`
  background-color: #909066;
  color: white;
  padding: 5px 10px;
  margin: 10px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  &:hover {
    color: black;
  }
`;
const Error = styled.span`
  color: red;
`;
const Idcontainer = styled.div`
  height: 70px;
  width: 70px;

  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f0;
  border-radius: 50%;
`;
const IdKey = styled.div`
  color: #909066;
  margin-right: 5px;
  font-weight: bold;
`;
const IdValue = styled.div`
  color: #090908;
  font-weight: bold;
`;
const SearchInfo = styled.div`
  margin: 10px;
  display: flex;
  flex: 1;

  ${mobile({
    marginBottom: "20px",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  })}
`;
const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Suggestion = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px #ddd;
  padding: 3px;
  margin-top: 0.5rem;
  max-height: 300px;
  font-family: "Vazir", sans-serif;
  cursor: pointer;
  &:hover {
    background-color: #909066;
  }
`;
const UpdateCity = () => {
  const location = useLocation();
  const cityId = location.pathname.split("/")[2];

  const history = useNavigate();
  const city = useSelector((state) => {
    return state.city.cities.find((city) => city.id == cityId);
  });
  const [name, setName] = useState(city.name.toString());
  const [latin_name, setLatin_name] = useState(city.latin_name.toString());
  const [country_id, setCountry_id] = useState(city.country_id);
  const [latitude, setLatitude] = useState(city.latitude);
  const [longitude, setLongitude] = useState(city.longitude);

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const [suggestion, setSuggestion] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [controller, setController] = useState(1);

  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  useEffect(() => {
    if (controller == 1) {
      setSuggestion([]);
    }

    if (controller == 0) {
      getCountriesByName(dispatch, configuration, countryName);
      setSuggestion(countries);
      setController(1);
    }
  }, [countryName]);
  const clickHandelerCountry = (text) => {
    setCountryName(text);
    setController(1);
    setSuggestion([]);
  };
  const handleClick = async (e) => {
    e.preventDefault();

    const form = { name, latin_name, country_id, latitude, longitude };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/admin/dashboard/locations/cities/${cityId}`,
        form,
        configuration
      );
      history(`/city`);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <Updatecity>
      <Product>
        <ProductTitleContainer>
          <ProductTitle>update city</ProductTitle>
        </ProductTitleContainer>
        <Idcontainer>
          <IdKey>id:</IdKey>
          <IdValue>{cityId}</IdValue>
        </Idcontainer>
        <ProductForm>
          <Label1>name</Label1>
          <Input
            defaultValue={city.name}
            required
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* {!allow ? <Error>This country already exists!!</Error> : " "} */}
          {name ? " " : <Error>"name is required"</Error>}
          <Label1>latin_name</Label1>
          <Input
            defaultValue={city.latin_name}
            required
            type="text"
            name="latin_name"
            onChange={(e) => setLatin_name(e.target.value)}
          />
          {latin_name ? " " : <Error>"latin name is required"</Error>}
          <SearchInfo>
            <Label2>country name:</Label2>
            <SearchBar>
              <Input
                style={{ direction: "rtl", fontFamily: " 'Vazir', sans-serif" }}
                type="text"
                name="country_id"
                onChange={(e) => {
                  setCountryName(e.target.value);
                  setController(0);
                }}
                value={countryName}
                onBlur={() => {
                  setTimeout(() => {
                    setController(1);
                    setSuggestion([]);
                  }, 200);
                }}
              />
              {suggestion.map((suggestion) => {
                return (
                  <Suggestion
                    onClick={() => {
                      clickHandelerCountry(suggestion.name);
                      setCountry_id(suggestion.id);
                    }}
                  >
                    {suggestion.name}
                  </Suggestion>
                );
              })}
            </SearchBar>
          </SearchInfo>

          <div className="row m-2 mt-5">
            <div className="col-md-12 ">
              {" "}
              <iframe
                id="locmap"
                className="w-100"
                height="200"
                src="https://maps.google.com/maps?q=university%20of%20san%20francisco&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              ></iframe>
            </div>
          </div>

          <LanLat>
            <LanLatInfo>
              <Label2>Enter Longitude</Label2>
              <Input
                defaultValue={city.longitude}
                onChange={(e) => setLongitude(e.target.value)}
                type="text"
              />
            </LanLatInfo>
            <LanLatInfo>
              <Label2>Enter Latitude</Label2>
              <Input
                defaultValue={city.latitude}
                onChange={(e) => setLatitude(e.target.value)}
                type="text"
              />
            </LanLatInfo>
          </LanLat>
          <ProductFormRight>
            <ProductButton onClick={handleClick}>update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </Product>
    </Updatecity>
  );
};

export default UpdateCity;
