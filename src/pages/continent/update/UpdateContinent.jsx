import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../../responsive";

const UpdateCont = styled.div`
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
  height: 50px;
  width: 50px;

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
    <UpdateCont>
      <Product>
        <ProductTitleContainer>
          <ProductTitle>update continent</ProductTitle>
        </ProductTitleContainer>
        <Idcontainer>
          <IdKey>id:</IdKey>
          <IdValue>{continentId}</IdValue>
        </Idcontainer>
        <ProductForm>
          <Label1>name</Label1>
          <Input
            defaultValue={continent.name}
            required
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* {!allow ? <Error>This country already exists!!</Error> : " "} */}
          {name ? " " : <Error>"name is required"</Error>}
          <Label1>latin_name</Label1>
          <Input
            defaultValue={continent.latin_name}
            required
            type="text"
            name="latin_name"
            onChange={(e) => setLatin_name(e.target.value)}
          />
          {latin_name ? " " : <Error>"latin name is required"</Error>}

          <ProductFormRight>
            <ProductButton onClick={handleClick}>update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </Product>
    </UpdateCont>
  );
};

export default UpdateContinent;
