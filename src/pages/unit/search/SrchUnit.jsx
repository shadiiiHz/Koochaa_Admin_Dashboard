import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteUnit, getByTitle, getUnits } from "../../../redux/apiCalls";
import { mobile } from "../../../responsive";
import img from "../../../images/Dashboard1.png";

const SearchUnit = styled.div`
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
`;
const Telephone = styled.div`
  flex: 1;
  padding-left: 0px;
`;
const ProductListImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;
const SrchUnit = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [pageCount, setpageCount] = useState(0);
  const dispatch = useDispatch();
  const units = useSelector((state) => state.unit.units);
  const lastPage = useSelector((state) => state.unit.lastPage);

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
    getUnits(dispatch, configuration, page);
  }, [dispatch, page]);
  useEffect(() => {
    getByTitle(dispatch, configuration, title, page2);
    setpageCount2(lastPage2);
  }, [title, lastPage2, page2]);

  const handleDelete = (id) => {
    deleteUnit(id, dispatch, configuration);
  };
  const handleActivate = (e, id) => {
    e.preventDefault();
    // activeCategory(id, dispatch, configuration);
  };
  const handleDectivate = (e, id) => {
    e.preventDefault();
    // deactiveCategory(id, dispatch, configuration);
  };
  const handlePageClick2 = async (data) => {
    let currentPage2 = data.selected + 1;
    setPage2(currentPage2);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    ,
    {
      field: "logo",
      headerName: "logo",
      width: 80,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg src={img} alt="" />
          </ProductListItem>
        );
      },
    },
    {
      field: "title",
      headerName: "title",
      width: 200,
      renderCell: (params) => {
        return <ProductListItem>{params.row.title}</ProductListItem>;
      },
    },
    {
      field: "description",
      headerName: "description",
      width: 180,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.description ? params.row.description : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "post_code",
      headerName: "post_code",
      width: 100,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.post_code ? params.row.post_code : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "email",
      headerName: "email",
      width: 210,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.email ? params.row.email : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "telephone",
      headerName: "telephone",
      width: 130,
      renderCell: (params) => {
        if (params.row.telephone) {
          return (
            <ProductListItem
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Telephone>
                {params.row.telephone[0] ? params.row.telephone[0] : ""}
              </Telephone>
              <Telephone>
                {params.row.telephone[1] ? params.row.telephone[1] : ""}
              </Telephone>
            </ProductListItem>
          );
        }
      },
    },
    {
      field: "is_active",
      headerName: "status",
      width: 80,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.is_active ? (
              <Status
                color="3bb077"
                onClick={(e) => {
                  handleDectivate(e, params.row.id);
                }}
              >
                Active
              </Status>
            ) : (
              <Status
                color="ff0000"
                onClick={(e) => {
                  handleActivate(e, params.row.id);
                }}
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
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/unit_update/" + params.row.id}>
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
    <SearchUnit>
      <ProductTitleContainer>
        <ProductTitle>units</ProductTitle>
      </ProductTitleContainer>
      <ProductInput>
        <TopSearchIcon className="fas fa-search" />
        <ProductInputInfo
          placeholder="Enter title..."
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </ProductInput>

      <Link to="/createUnit">
        <Btn color="deb887" margin="30">
          Create
        </Btn>
      </Link>
      {title && (
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
      {!title && (
        <>
          <DataGrid
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
            }}
            rows={units}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            {...units}
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
    </SearchUnit>
  );
};

export default SrchUnit;
