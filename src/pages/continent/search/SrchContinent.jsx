import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getContinents } from "../../../redux/apiCalls";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
const SearchContinent = styled.div`
  flex: 9;
  margin: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const PaginationStyle = styled.div`
  margin: 20px;
`;
const ProductTitleContainer = styled.div`
  margin-bottom: 25px;
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
const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;
const SrchContinent = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setpageCount] = useState(0);
  const dispatch = useDispatch();
  const continents = useSelector((state) => state.continent.continents);

  const token = useSelector((state) => state.user.currentUser);
  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ContentType: "application/json",
    },
  };
  useEffect(() => {
    getContinents(dispatch, configuration, page);
    setLoading(false);
  }, [dispatch, page]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/v1/admin/dashboard/locations/continents?id=1",
        configuration
      )
      .then(function (response) {
        // console.log(response.data.last_page);
        setpageCount(response.data.last_page);
      });
  });
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    ,
    {
      field: "name",
      headerName: "name",
      width: 100,
      renderCell: (params) => {
        return <ProductListItem>{params.row.name}</ProductListItem>;
      },
    },
    {
      field: "latin_name",
      headerName: "latin_name",
      width: 150,
      renderCell: (params) => {
        return <ProductListItem>{params.row.latin_name}</ProductListItem>;
      },
    },

    {
      field: "created_at",
      headerName: "created_at",
      width: 220,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.created_at ? params.row.created_at : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "updated_at",
      headerName: "updated_at",
      width: 250,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.updated_at ? params.row.updated_at : "_"}
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
            <Link to={"/continent_update/" + params.row.id}>
              <Btn color="d5c8a9">update</Btn>
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
  // console.log(page)
  return (
    <>
      <SearchContinent>
        <ProductTitleContainer>
          <ProductTitle>continents</ProductTitle>
        </ProductTitleContainer>

        <DataGrid
          sx={{
            width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
          }}
          rows={continents}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          {...continents}
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
      </SearchContinent>
    </>
  );
};

export default SrchContinent;
