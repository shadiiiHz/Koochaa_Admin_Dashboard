import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  activeCategory,
  deactiveCategory,
  deleteCategory,
  getCategories,
  getTypes,
  statusCategory,
} from "../../../redux/apiCalls";
import { mobile } from "../../../responsive";

const SearchCategory = styled.div`
  flex: 9;
  margin: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
const Status = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;
const ProductListItem = styled.div`
  display: flex;
  align-items: center;
`;
const SrchCategory = () => {
  //   const [categories, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [pageCount, setpageCount] = useState(0);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const lastPage = useSelector((state) => state.category.lastPage);

  const lastPage2 = useSelector((state) => state.type.lastPage);
  const types = useSelector((state) => state.type.types);
  const [pageCount2, setpageCount2] = useState(0);
  const [page2, setPage2] = useState(1);

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
    getCategories(dispatch, configuration, page);
  }, [dispatch, page ]);

  useEffect(() => {
    getTypes(dispatch, configuration, type, page2);
    setpageCount2(lastPage2);
  }, [type, lastPage2, page2 ]);

  const handleDelete = (id) => {
    deleteCategory(id, dispatch, configuration);
  };
  const handleActivate = (e,id) => {
    e.preventDefault();
    activeCategory(id, dispatch, configuration);
  };
  const handleDectivate = (e,id) => {
    e.preventDefault();
    deactiveCategory(id, dispatch, configuration);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    ,
    {
      field: "title",
      headerName: "title",
      width: 120,
      renderCell: (params) => {
        return <ProductListItem>{params.row.title}</ProductListItem>;
      },
    },
    {
      field: "latin_title",
      headerName: "latin_title",
      width: 180,
      renderCell: (params) => {
        return <ProductListItem>{params.row.latin_title}</ProductListItem>;
      },
    },

    {
      field: "type",
      headerName: "type",
      width: 180,
      renderCell: (params) => {
        return <ProductListItem>{params.row.type}</ProductListItem>;
      },
    },
    {
      field: "is_active",
      headerName: "status",
      width: 200,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.is_active ? (
              <Status
                color="3bb077"
                onClick={(e)=>{handleDectivate(e,params.row.id)}}
              >
                Active
              </Status>
            ) : (
              <Status
                color="ff0000"
                onClick={(e)=>{handleActivate(e,params.row.id)}}
              >
                deactive
              </Status>
            )}
          </ProductListItem>
        );
      },
    },

    {
      field: "update",
      headerName: "UPDATE",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category_update/" + params.row.id}>
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
  const handlePageClick2 = async (data) => {
    let currentPage2 = data.selected + 1;
    setPage2(currentPage2);
  };
  return (
    <SearchCategory>
      <ProductTitleContainer>
        <ProductTitle>categories</ProductTitle>
      </ProductTitleContainer>
      <ProductInput>
        <TopSearchIcon className="fas fa-search" />
        <ProductInputInfo
          placeholder="Enter category type..."
          type="text"
          onChange={(e) => setType(e.target.value)}
        />
      </ProductInput>

      <Link to="/createCategory">
        <Btn color="deb887" margin="30">
          Create
        </Btn>
      </Link>
      {type && (
        <>
          <DataGrid
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
            }}
            rows={types}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            {...types}
          />

          <PaginationStyle>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount2}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick2}
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
        </>
      )}
      {!type && (
        <>
          <DataGrid
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
            }}
            rows={categories}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            {...categories}
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
        </>
      )}
    </SearchCategory>
  );
};

export default SrchCategory;
