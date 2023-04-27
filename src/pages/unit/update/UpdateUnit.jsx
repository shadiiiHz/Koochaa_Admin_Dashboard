import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../../responsive";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import {
  getCitiesByCountryId,
  getContinentIdByName,
  getContinents,
  getCountriesByName,
  getTypeAndNameForUnit,
} from "../../../redux/apiCalls";
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
const UpdateUnit = () => {
  const history = useNavigate();
  const location = useLocation();
  const unitId = location.pathname.split("/")[2];

  const unit = useSelector((state) => {
    return state.unit.units.find((unit) => unit.id == unitId);
  });

  const [isShownInstagram, setIsShownInstagram] = useState(false);
  const [isShownTelegram, setIsShownTelegram] = useState(false);
  const [isShownWhatsApp, setIsShownWhatsApp] = useState(false);
  const [isShownFacebook, setIsShownFacebook] = useState(false);

  const [title, setTitle] = useState(unit.title);
  const [description, setDescription] = useState(unit.description);
  const [web_site, setWeb_site] = useState(unit.description);
  const [telephone, setTelephone] = useState(unit.telephone);
  const [mobile, setMobile] = useState(unit.mobile);

  const [email, setEmail] = useState(unit.email);

  const [telegram, setTelegram] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [social, setSocial] = useState(unit.social);
  // const [social, setSocial] = useState({})

  const [address, setAddress] = useState(unit.address);
  const [post_code, setPost_code] = useState(unit.post_code);

  const [unit_category_id, setUnit_category_id] = useState(
    unit.unit_category_id
  );
  const [continent_id, setContinent_id] = useState(unit.continent_id);
  const [country_id, setCountry_id] = useState(unit.country_id);
  const [city_id, setCity_id] = useState(unit.city_id);
  const [is_active, setIs_active] = useState(unit.is_active);
  // const [logo, setLogo] = useState(unit.logo);
  // const [images, setImages] = useState([]);
  const [latitude, setLatitude] = useState(unit.latitude);
  const [longitude, setLongitude] = useState(unit.longitude);

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

  // const [file, setFile] = useState(null);
  // const [imageFile, setImageFile] = useState(null);

  const [cityList, setCityList] = useState([]);
  // const [suggestion, setSuggestion] = useState([]);
  const [cityName, setCityName] = useState("");
  const [permission, setPermission] = useState(1);
  const token = useSelector((state) => state.user.currentUser);
  const categories = useSelector((state) => state.category.categories);
  const continents = useSelector((state) => state.continent.continents);
  const countries = useSelector((state) => state.country.countries);
  const cities = useSelector((state) => state.city.cities);
  // const logoPath = useSelector((state) => state.logo.logo);
  // const imagePath = useSelector((state) => state.image.images);
  const continentId = useSelector((state) => state.continent.id);
  // const types = useSelector((state) => state.type.types);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  useEffect(() => {
    getContinents(dispatch, configuration, 1);
    setOptionList(continents);
  }, []);
  useEffect(() => {
    getContinentIdByName(dispatch, configuration, select);
    setContinent_id(continentId);
  }, [dispatch, select]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/locations/continents/${continent_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body)
        setSelected(response.data.body.name);
      })
      .catch((error) => {
        // handle error
      });
  }, []);
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
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/units/a/categories/${unit_category_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body)
        setType(response.data.body.type);
        setName(response.data.body.title);
      })
      .catch((error) => {
        // handle error
      });
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
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/locations/countries/${country_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body);
        setCountryName(response.data.body.name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            title: "select valid country",
            icon: "warning",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top",
          });
        }
      });
  }, []);
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
  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/admin/dashboard/locations/cities/${city_id}`,
        configuration
      )
      .then((response) => {
        // console.log(response.data.body.name);
        setCityName(response.data.body.name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            title: "select valid city",
            icon: "warning",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: "top",
          });
        }
      });
  }, []);

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
      // logo,
      // images,
      latitude,
      longitude,
    };

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/admin/dashboard/units/${unitId}`,
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
  const onOptionChange = (e) => {
    setType(e.target.value);
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
  // const handelDeleteLogo = () => {
  //   setLogo("");
  // };
  // const handelDeleteImages = () => {
  //   setImages([]);
  // };
  return (
    <>
      <Createcity>
        {/* {images.map((m)=>{
        console.log("image",m)
      })} */}

        <Product>
          <ProductTitleContainer>
            <ProductTitle>update unit</ProductTitle>
          </ProductTitleContainer>

          <ProductForm>
            <Label1>title</Label1>
            <Input
              defaultValue={unit.title}
              required
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {title ? " " : <Error>"title is required"</Error>}
            <Label1>description</Label1>
            <Input
              defaultValue={unit.description}
              required
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Label1>web_site</Label1>
            <Input
              defaultValue={unit.web_site}
              required
              type="url"
              placeholder="https://example.com"
              name="web_site"
              onChange={(e) => setWeb_site(e.target.value)}
            />
            <Label1>email</Label1>
            <Input
              defaultValue={unit.email}
              required
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label1>post code</Label1>
            <Input
              defaultValue={unit.post_code}
              required
              type="text"
              name="post_code"
              onChange={(e) => setPost_code(e.target.value)}
            />
            <Label1>address</Label1>
            <Input
              defaultValue={unit.address}
              required
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Label1>status</Label1>
            <Input
              defaultValue={unit.is_active}
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

                  <SocialInput
                    defaultValue={
                      unit.social && unit.social.instagram
                        ? unit.social.instagram
                        : ""
                    }
                    type="text"
                    name="instagram"
                    onChange={(e) => {
                      setInstagram(e.target.value);
                      setSocial({ ...social, instagram: instagram });
                    }}
                  />
                </SocialIcon>
                <SocialIcon>
                  <TelegramIcon
                    onClick={handleClickTelegram}
                    style={{ marginBottom: "3px" }}
                  />

                  <SocialInput
                    defaultValue={
                      unit.social && unit.social.telegram
                        ? unit.social.telegram
                        : ""
                    }
                    type="text"
                    name="telegram"
                    onChange={(e) => {
                      setTelegram(e.target.value);
                      setSocial({ ...social, telegram: telegram });
                    }}
                  />
                </SocialIcon>
                <SocialIcon>
                  <WhatsAppIcon
                    onClick={handleClickWhatsApp}
                    style={{ marginBottom: "3px" }}
                  />

                  <SocialInput
                    defaultValue={
                      unit.social && unit.social.whatsApp
                        ? unit.social.whatsApp
                        : ""
                    }
                    type="text"
                    name="whatsApp"
                    onChange={(e) => {
                      setWhatsApp(e.target.value);
                      setSocial({ ...social, whatsApp: whatsApp });
                    }}
                  />
                </SocialIcon>
                <SocialIcon>
                  <FacebookIcon
                    onClick={handleClickFacebook}
                    style={{ marginBottom: "3px" }}
                  />

                  <SocialInput
                    defaultValue={unit.social && unit.social.facebook? unit.social.facebook : ""}
                    type="text"
                    name="facebook"
                    onChange={(e) => {
                      setFacebook(e.target.value);
                      setSocial({ ...social, facebook: facebook });
                    }}
                  />
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
                  defaultValue={unit.longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  type="text"
                />
              </LanLatInfo>
              <LanLatInfo>
                <Label2>Enter Latitude</Label2>
                <Input
                  defaultValue={unit.latitude}
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
      </Createcity>
    </>
  );
};

export default UpdateUnit;
