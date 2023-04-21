import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getContinentIdByName, getContinents } from "../../../redux/apiCalls";
import { mobile } from "../../../responsive";

const CreateCntry = styled.div`
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
const SelectContainer = styled.div`

  display: flex;
  justify-content: start;
  
`;
const CreateCountry = () => {
  const history = useNavigate();

  const [name, setName] = useState("");
  const [latin_name, setLatin_name] = useState("");
  const [continent_id, setContinent_id] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const dispatch = useDispatch();

  const continentId = useSelector((state) => state.continent.id);
  const continents = useSelector((state) => state.continent.continents);

  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);
  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };


  useEffect(() => {
    // fetchData();
    getContinents(dispatch, configuration, 1);
    setOptionList(continents);
  }, []);
  //
  useEffect(() => {
    getContinentIdByName(dispatch, configuration, select);
    setContinent_id(continentId);
  }, [dispatch, select]);
  const handleClick = async (e) => {
    e.preventDefault();

    const form = { name, latin_name, continent_id, latitude, longitude };
    // if (allow) {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/admin/dashboard/locations/countries`,
        form,
        configuration
      );
      // setContinent_id(" ");

      history(`/country`);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
    // }
  };

  return (
    <CreateCntry>
      <Product>
        <ProductTitleContainer>
          <ProductTitle>new country</ProductTitle>
        </ProductTitleContainer>

        <ProductForm>
          <Label1>name</Label1>

          <Input
            required
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* {!allow ? <Error>This country already exists!!</Error> : " "} */}
          {name ? " " : <Error>"name is required"</Error>}
          <Label1>latin_name</Label1>
          <Input
            required
            type="text"
            name="latin_name"
            onChange={(e) => setLatin_name(e.target.value)}
          />
          {latin_name ? " " : <Error>"latin name is required"</Error>}
          <Label1>continent</Label1>
          {/* <Input
            type="text"
            name="continent_id"
            onChange={(e) => setContinent_id(e.target.value)}
          /> */}
          <SelectContainer>
            <select
              style={{ padding: "5px", borderRadius: "15px" }}
              disabled={false}
              value={select}
              onChange={(e) => setSelected(e.currentTarget.value)}
            >
              {optionList.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </SelectContainer>

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
    </CreateCntry>
  );
};

export default CreateCountry;
