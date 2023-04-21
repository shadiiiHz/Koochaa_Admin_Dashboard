import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteCountry,
  getCountries,
  getCountriesByName,
} from "../../../redux/apiCalls";
import { mobile } from "../../../responsive";

const SearchCountry = styled.div`
  flex: 4;
  margin: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
// ${mobile({ overflowX: "scroll", width: "100vw", marginLeft: "50px" })}
const ProductTitleContainer = styled.div`
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
const Btn = styled.button`
  background-color: #${(props) => props.color};
  color: white;
  padding: 5px 10px;
  margin-bottom: ${(props) => props.margin}px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  &:hover {
    color: black;
  }
`;
const ProductInput = styled.div`
  margin: 20px;
  width: 50%;
  height: 40px;
  /* background-color: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e9967a;
  border-radius: 20px;
  /* background-color: black; */
  ${mobile({ margin: "20px" })}
`;
const TopSearchIcon = styled.i`
  flex: 0.5;
  font-size: 18px;
  color: #666;
  cursor: pointer;
  padding: 9px;
`;
const ProductInputInfo = styled.input`
  border: none;
  flex: 8.5;
  width: 80%;
  border-radius: 20px;
  margin: 5px;
  outline: none;
`;
const PaginationStyle = styled.div`
  margin: 20px;
`;
const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;
const SrchCountry = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.country.countries);
  const lastPage = useSelector((state) => state.country.lastPage);
  console.log(lastPage);

  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  useEffect(() => {
    setpageCount(lastPage);
    getCountries(dispatch, configuration, page);

    setLoading(false);
  }, [dispatch, page]);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:8000/api/v1/admin/dashboard/locations/countries?page=1${name}`,
  //       configuration
  //     )
  //     .then(function (response) {
  //       // console.log(response.data.body.last_page);
  //       setpageCount(response.data.body.last_page);
  //     });
  // }, [page,name]);
  useEffect(() => {
    getCountriesByName(dispatch, configuration, name);
    setpageCount(lastPage);
  }, [name, lastPage]);
  const handleDelete = (id) => {
    deleteCountry(id, dispatch, configuration);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    ,
    {
      field: "name",
      headerName: "name",
      width: 120,
      renderCell: (params) => {
        return <ProductListItem>{params.row.name}</ProductListItem>;
      },
    },
    {
      field: "latin_name",
      headerName: "latin_name",
      width: 180,
      renderCell: (params) => {
        return <ProductListItem>{params.row.latin_name}</ProductListItem>;
      },
    },

    {
      field: "continent_id",
      headerName: "Continent_id",
      width: 180,
      renderCell: (params) => {
        return <ProductListItem>{params.row.continent_id}</ProductListItem>;
      },
    },
    {
      field: "latitude",
      headerName: "Latitude",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.latitude ? params.row.latitude : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "longitude",
      headerName: "Longitude",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.longitude ? params.row.longitude : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "update",
      headerName: "UPDATE",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/country_update/" + params.row.id}>
              <Btn color="d5c8a9">update</Btn>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "DELETE",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link>
              <Btn color="e9967a" onClick={() => handleDelete(params.row.id)}>
                delete
              </Btn>
            </Link>
          </>
        );
      },
    },
  ];
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  return (
    <SearchCountry>
      <ProductTitleContainer>
        <ProductTitle>countries</ProductTitle>
      </ProductTitleContainer>
      <ProductInput>
        <TopSearchIcon className="fas fa-search" />
        <ProductInputInfo
          placeholder="Enter country name..."
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </ProductInput>

      <Link to="/createCountry">
        <Btn color="deb887" margin="30">
          Create
        </Btn>
      </Link>

      <DataGrid
        sx={{
          width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
        }}
        rows={countries}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        {...countries}
      />

      <PaginationStyle>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </PaginationStyle>
    </SearchCountry>
  );
};

export default SrchCountry;
