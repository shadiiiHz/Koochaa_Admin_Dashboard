import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TagsInput } from "react-tag-input-component";
import { mobile } from "../../../responsive";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRef } from "react";
import {
  getCitiesByCountryId,
  getContinentIdByName,
  getContinents,
  getCountriesByName,
  getImage,
  getLogo,
  getTypeAndNameForUnit,
  getTypes,
} from "../../../redux/apiCalls";
import Swal from "sweetalert2";
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
const Label3 = styled.label`
  margin-right: 10px;
  font-family: "Delicious Handrawn", cursive;
  font-size: 20px;
  ${mobile({ marginBottom: "5px" })}
`;
const Input = styled.input`
  height: 42px;
  border: 1px solid #dcdcdc;
  padding: 5px;
  border-radius: 5px;
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
const ProductFormCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const PhoneContainer = styled.div`
  flex: 1;
  margin-left: 8px;
  ${mobile({ margin: "10px" })}
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

  cursor: pointer;
  &:hover {
    background-color: #909066;
  }
`;
// overflow-y: auto;
const SocialMedia = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SocialTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  font-family: "Delicious Handrawn", cursive;
`;
const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const SocialIcon = styled.div`
  cursor: pointer;
  background-color: white;
  border: none;
  margin: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ margin: "10px" })}
`;
const SocialInput = styled.input`
  height: 42px;
  border: 1px solid gray;
  padding: 5px;
  border-radius: 5px;
  outline: none;
  &:hover {
    outline: none;
    padding: 5px;
  }
`;
const Search = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({ alignItems: "center" })}
`;
const SearchLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${mobile({ flexDirection: "column" })}
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
const SelectContainer = styled.div`
  height: 42px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 10px;
  &:focus {
    border: none;
    outline: none;
  }
`;
const LableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InputContainer = styled.div`
  margin: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
  ${mobile({
    marginBottom: "20px",
    justifyContent: "center",

    marginRight: "auto",
    marginLeft: "auto",
  })}
`;
const InputContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
  })}
`;
const InputContainer2 = styled.div`
  flex: 1;
  ${mobile({
    display: "flex",
  })}
`;
const CreateUnit = () => {
  const history = useNavigate();

  const [isShownInstagram, setIsShownInstagram] = useState(false);
  const [isShownTelegram, setIsShownTelegram] = useState(false);
  const [isShownWhatsApp, setIsShownWhatsApp] = useState(false);
  const [isShownFacebook, setIsShownFacebook] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [web_site, setWeb_site] = useState("");
  const [telephone, setTelephone] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [email, setEmail] = useState("");

  const [telegram, setTelegram] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [social, setSocial] = useState({});
  // const [social, setSocial] = useState({})

  const [address, setAddress] = useState("");
  const [post_code, setPost_code] = useState(0);

  const [unit_category_id, setUnit_category_id] = useState(0);
  const [continent_id, setContinent_id] = useState(0);
  const [country_id, setCountry_id] = useState(0);
  const [city_id, setCity_id] = useState(0);
  const [is_active, setIs_active] = useState(0);
  const [logo, setLogo] = useState("");
  const [images, setImages] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [allow, setAllow] = useState(1);

  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState([]);

  const [suggestion, setSuggestion] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [controller, setController] = useState(1);

  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [cityList, setCityList] = useState([]);
  // const [suggestion, setSuggestion] = useState([]);
  const [cityName, setCityName] = useState("");
  const [permission, setPermission] = useState(1);

  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.user.currentUser);
  const categories = useSelector((state) => state.category.categories);
  const continents = useSelector((state) => state.continent.continents);
  const countries = useSelector((state) => state.country.countries);
  const cities = useSelector((state) => state.city.cities);
  const logoPath = useSelector((state) => state.logo.logo);
  const imagePath = useSelector((state) => state.image.images);
  const continentId = useSelector((state) => state.continent.id);
  // const types = useSelector((state) => state.type.types);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };

  const onOptionChange = (e) => {
    setType(e.target.value);
  };
  useEffect(() => {
    getContinentIdByName(dispatch, configuration, select);
    setContinent_id(continentId);
  }, [dispatch, select]);
  useEffect(() => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      getLogo(dispatch, configuration, formData);
      setLogo(logoPath);
    }
  }, [file]);

  useEffect(() => {
    if (imageFile) {
      let arr = Array.from(imageFile);
      arr.map((image) => {
        // console.log("image", image)
        const formData = new FormData();
        formData.append("image", image);
        axios
          .post(
            `http://localhost:8000/api/v1/admin/dashboard/units/images/upload/other`,
            formData,
            configuration
          )
          .then((response) => {
            setImages((prevArray) => [...prevArray, response.data.body.path]);
          })
          .catch((error) => {
            // handle error
          });

        // console.log("image path:",imagePath)
      });
    }
  }, [imageFile, dispatch]);
  useEffect(() => {
    if (allow == 1) {
      setResult([]);
    }

    if (allow == 0) {
      getTypeAndNameForUnit(dispatch, configuration, type, name);
      setResult(categories);
      setAllow(1);
    }
  }, [type, name, dispatch]);
  useEffect(() => {
    getContinents(dispatch, configuration, 1);
    setOptionList(continents);
  }, []);
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

  useEffect(() => {
    if (permission == 1) {
      setCityList([]);
    }

    if (permission == 0) {
      getCitiesByCountryId(dispatch, configuration, country_id);
      console.log(country_id);
      setCityList(cities);
      setPermission(1);
    }
  }, [cityName, countryName, country_id, dispatch]);

  const handleClick = async (e) => {
    e.preventDefault();

    const form = {
      title,
      description,
      web_site,
      telephone,
      mobile,
      email,
      social,
      address,
      post_code,
      unit_category_id,
      continent_id,
      country_id,
      city_id,
      is_active,
      logo,
      images,
      latitude,
      longitude,
    };

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/admin/dashboard/units`,
        form,
        configuration
      );

      history(`/unit`);
      // console.log(res);
    } catch (err) {
      console.log();
      if (err.response.status === 422) {
        Swal.fire({
          title: "Please complete the information correctly",
          icon: "warning",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
          toast: true,
          position: "top",
        });
      }
    }
  };

  const handleClickInstagram = () => {
    setIsShownInstagram((current) => !current);
  };
  const handleClickTelegram = () => {
    setIsShownTelegram((current) => !current);
  };
  const handleClickWhatsApp = () => {
    setIsShownWhatsApp((current) => !current);
  };
  const handleClickFacebook = () => {
    setIsShownFacebook((current) => !current);
  };
  const clickHandeler = (text) => {
    setName(text);
    setAllow(1);
    setResult([]);
    console.log("result", result);
  };
  const clickHandelerCountry = (text) => {
    setCountryName(text);
    setController(1);
    setSuggestion([]);
  };
  const clickHandelerCity = (text) => {
    setCityName(text);
    setPermission(1);
    setCityList([]);
  };
  const handelDeleteLogo = () => {
    setLogo("");
  };
  const handelDeleteImages = () => {
    setImages([]);
  };
  return (
    <Createcity>
      {/* {images.map((m)=>{
        console.log("image",m)
      })} */}

      <Product>
        <ProductTitleContainer>
          <ProductTitle>new unit</ProductTitle>
        </ProductTitleContainer>

        <ProductForm>
          <Label1>title</Label1>
          <Input
            required
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {title ? " " : <Error>"title is required"</Error>}
          <Label1>description</Label1>
          <Input
            required
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Label1>web_site</Label1>
          <Input
            required
            type="url"
            placeholder="https://example.com"
            name="web_site"
            onChange={(e) => setWeb_site(e.target.value)}
          />
          <Label1>email</Label1>
          <Input
            required
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label1>post code</Label1>
          <Input
            required
            type="text"
            name="post_code"
            onChange={(e) => setPost_code(e.target.value)}
          />
          <Label1>address</Label1>
          <Input
            required
            type="text"
            name="address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Label1>status</Label1>
          <Input
            required
            type="text"
            name="is_active"
            onChange={(e) => setIs_active(e.target.value)}
          />
          <ProductFormCenter>
            <PhoneContainer>
              <Label1>telephone</Label1>
              {/* <pre>{JSON.stringify(telephone)}</pre> */}
              <TagsInput
                value={telephone}
                onChange={setTelephone}
                name="telephone"
                placeHolder="enter telephone"
              />
              <em
                style={{
                  fontSize: "20px",
                  fontFamily: "Delicious Handrawn, cursive",
                }}
              >
                press enter to add new telephone number
              </em>
            </PhoneContainer>

            <PhoneContainer>
              <Label1>mobile</Label1>
              {/* <pre>{JSON.stringify(telephone)}</pre> */}
              <TagsInput
                value={mobile}
                onChange={setMobile}
                name="mobile"
                placeHolder="enter mobile"
              />

              <em
                style={{
                  fontSize: "20px",
                  fontFamily: "Delicious Handrawn, cursive",
                }}
              >
                {" "}
                press enter to add new mobile number
              </em>
            </PhoneContainer>
          </ProductFormCenter>
          <SocialMedia>
            <SocialTitle>
              Press icon and enter your Id's in social media
              <FavoriteIcon style={{ marginLeft: "2px" }} />
            </SocialTitle>
            <SocialIconsContainer>
              <SocialIcon>
                <InstagramIcon
                  onClick={handleClickInstagram}
                  style={{ marginBottom: "3px" }}
                />
                {isShownInstagram && (
                  <SocialInput
                    type="text"
                    name="instagram"
                    onChange={(e) => {
                      setInstagram(e.target.value);
                      setSocial({ ...social, instagram: instagram });
                    }}
                  />
                )}
              </SocialIcon>
              <SocialIcon>
                <TelegramIcon
                  onClick={handleClickTelegram}
                  style={{ marginBottom: "3px" }}
                />
                {isShownTelegram && (
                  <SocialInput
                    type="text"
                    name="telegram"
                    onChange={(e) => {
                      setTelegram(e.target.value);
                      setSocial({ ...social, telegram: telegram });
                    }}
                  />
                )}
              </SocialIcon>
              <SocialIcon>
                <WhatsAppIcon
                  onClick={handleClickWhatsApp}
                  style={{ marginBottom: "3px" }}
                />
                {isShownWhatsApp && (
                  <SocialInput
                    type="text"
                    name="whatsApp"
                    onChange={(e) => {
                      setWhatsApp(e.target.value);
                      setSocial({ ...social, whatsApp: whatsApp });
                    }}
                  />
                )}
              </SocialIcon>
              <SocialIcon>
                <FacebookIcon
                  onClick={handleClickFacebook}
                  style={{ marginBottom: "3px" }}
                />
                {isShownFacebook && (
                  <SocialInput
                    type="text"
                    name="facebook"
                    onChange={(e) => {
                      setFacebook(e.target.value);
                      setSocial({ ...social, facebook: facebook });
                    }}
                  />
                )}
              </SocialIcon>
            </SocialIconsContainer>
          </SocialMedia>

          <Search>
            <SearchInfo>
              <Label2>category Type:</Label2>
              <input
                type="radio"
                name="type"
                value="مشاغل"
                id="مشاغل"
                checked={type === "مشاغل"}
                onChange={onOptionChange}
              />
              <Label2 htmlFor="مشاغل" style={{ marginLeft: "5px" }}>
                jobs
              </Label2>

              <input
                style={{ marginLeft: "30px" }}
                type="radio"
                name="type"
                value="جوامع"
                id="جوامع"
                checked={type === "جوامع"}
                onChange={onOptionChange}
              />
              <Label2 htmlFor="جوامع" style={{ marginLeft: "5px" }}>
                societies
              </Label2>
            </SearchInfo>
            <SearchInfo>
              <Label2>category title:</Label2>
              <SearchBar>
                <Input
                  style={{ direction: "rtl", padding: "8px", flex: "1" }}
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setAllow(0);
                  }}
                  value={name}
                  onBlur={() => {
                    setTimeout(() => {
                      setAllow(1);
                      setResult([]);
                    }, 200);
                  }}
                />
                {result.map((result) => {
                  return (
                    <Suggestion
                      onClick={() => {
                        clickHandeler(result.title);
                        setUnit_category_id(result.id);
                      }}
                    >
                      {result.title}
                    </Suggestion>
                  );
                })}
              </SearchBar>
            </SearchInfo>
          </Search>

          <SelectContainer>
            <Label1 style={{ marginRight: "10px" }}>continent</Label1>
            <select
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #dcdcdc",
              }}
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
          <SearchInfo>
            <Label2>country name:</Label2>
            <SearchBar>
              <Input
                style={{ direction: "rtl" }}
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
          <SearchInfo>
            <Label2>city name:</Label2>
            <SearchBar>
              <Input
                style={{ direction: "rtl" }}
                type="text"
                name="city_id"
                onChange={(e) => {
                  setCityName(e.target.value);
                  setPermission(0);
                }}
                value={cityName}
                onBlur={() => {
                  setTimeout(() => {
                    setPermission(1);
                    setCityList([]);
                  }, 200);
                }}
              />
              {cityList.map((city) => {
                return (
                  <Suggestion
                    onClick={() => {
                      clickHandelerCity(city.name);
                      setCity_id(city.id);
                    }}
                  >
                    {city.name}
                  </Suggestion>
                );
              })}
            </SearchBar>
          </SearchInfo>

          <SearchLogo>
            <SearchInfo>
              <LableContainer>
                {" "}
                <Label2 htmlFor="fileInput">
                  press to upload logo :
                  <AddToPhotosIcon style={{ margin: "10px" }} />
                  {logo ? (
                    <em style={{ color: "gray" }}>file uploaded</em>
                  ) : (
                    <em style={{ color: "gray" }}>Choose File</em>
                  )}
                </Label2>
                <Label2 onClick={handelDeleteLogo}>
                  press to delete logo:
                  <DeleteForeverIcon />{" "}
                </Label2>
              </LableContainer>

              <SearchBar>
                <Input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </SearchBar>
            </SearchInfo>
            <InputContainer>
              <InputContainer1>
                <Label3>
                  Upload images:
                  {/* <AddToPhotosIcon style={{ margin: "10px" }} /> */}
                </Label3>

                {/* <pre>{JSON.stringify(images)}</pre> */}

                <form encType="multipart/form-data">
                  <Input
                    type="file"
                    name="imagefile"
                    multiple
                    onChange={(e) => setImageFile(e.target.files)}
                  />
                </form>
              </InputContainer1>
              <InputContainer2>
                <Label2
                  onClick={handelDeleteImages}
                  style={{ marginTop: "10px" }}
                >
                  Delete images:
                  <DeleteForeverIcon />
                </Label2>
              </InputContainer2>
              {/* {images.length === 0 ? (
                <em style={{ color: "gray", display: "none" }}>choose file</em>
              ) : (
                <span style={{ color: "gray" }}>file uploaded</span>
              )} */}
            </InputContainer>
          </SearchLogo>
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

export default CreateUnit;
