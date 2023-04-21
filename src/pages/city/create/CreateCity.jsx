import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getCountries,
  getCountriesByName,
  getCountryIdByName,
} from "../../../redux/apiCalls";
import { mobile } from "../../../responsive";

const Createcity = styled.div`
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
// const SelectContainer = styled.div`
//   width: 100%;
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   box-shadow: 0px 0px 8px #ddd;
//   border-radius: 10px;
//   margin-top: 1rem;
//   max-height: 300px;
//   overflow-y: auto;
// `;
const Suggestion = styled.div`
  width: 20%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 8px #ddd;
  padding: 3px;
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  cursor: pointer;
  &:hover {
    background-color: #909066;
  }
`;
const CreateCity = () => {
  const history = useNavigate();
  const [allow, setAllow] = useState(1);
  const [suggestion, setSuggestion] = useState([]);
  const [name, setName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [latin_name, setLatin_name] = useState("");
  const [country_id, setCountry_id] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const countryId = useSelector((state) => state.country.id);
  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  useEffect(() => {
    if (allow == 1) {
      setSuggestion([]);
    }

    if (allow == 0) {
      getCountriesByName(dispatch, configuration, countryName);
      setSuggestion(countries);
      setAllow(1);
    }
  }, [countryName]);
  // useEffect(() => {
  //   getCountryIdByName(dispatch, configuration, countryName);
  //   setCountry_id(countryId);

  // }, [dispatch, countryName]);
  const handleClick = async (e) => {
    e.preventDefault();

    const form = { name, latin_name, country_id, latitude, longitude };

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/admin/dashboard/locations/cities`,
        form,
        configuration
      );

      history(`/city`);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  const clickHandeler = (text) => {
    setCountryName(text);
    setAllow(1);
    setSuggestion([]);
    console.log(suggestion);
  };
  return (
    <Createcity>
      <Product>
        <ProductTitleContainer>
          <ProductTitle>new city</ProductTitle>
        </ProductTitleContainer>

        <ProductForm>
          <Label1>name</Label1>

          <Input
            required
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {name ? " " : <Error>"name is required"</Error>}
          <Label1>latin_name</Label1>
          <Input
            required
            type="text"
            name="latin_name"
            onChange={(e) => setLatin_name(e.target.value)}
          />
          {latin_name ? " " : <Error>"latin name is required"</Error>}
          <Label1>country name</Label1>
          {/* <Input
            type="text"
            name="continent_id"
            onChange={(e) => setCountry_id(e.target.value)}
          /> */}
          <Input 
            type="text"
            name="country_id"
            onChange={(e) => {
              setCountryName(e.target.value);
              setAllow(0);
            }}
            value={countryName}
            onBlur={() => {
              setTimeout(() => {
                setAllow(1);
                setSuggestion([]);
              }, 200);
            }}
          />
          {suggestion.map((suggestion) => {
            return (
              <Suggestion
                onClick={() => {
                  clickHandeler(suggestion.name);
                  setCountry_id(suggestion.id);
                }}
              >
                {suggestion.name}
              </Suggestion>
            );
          })}

          {/* <SelectContainer style={{ cursor: "pointer" }}> */}

          {/* </SelectContainer> */}

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
                onChange={(e) => setLongitude(e.target.value)}
                type="text"
              />
            </LanLatInfo>
            <LanLatInfo>
              <Label2>Enter Latitude</Label2>
              <Input
                onChange={(e) => setLatitude(e.target.value)}
                type="text"
              />
            </LanLatInfo>
          </LanLat>
          <ProductFormRight>
            <ProductButton onClick={handleClick}>create</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </Product>
    </Createcity>
  );
};

export default CreateCity;
