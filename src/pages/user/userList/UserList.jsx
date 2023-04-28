import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../../responsive";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    activeUser,
    deactiveUser,
  deleteUserOfList,
  getByEmail,
  getByFirstName,
  getByGender,
  getUserList,
} from "../../../redux/apiCalls";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const SearchUsers = styled.div`
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
  flex: 1;
  /* background-color: black; */
  ${mobile({ margin: "20px" })}
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
const UserList = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setfirstname] = useState("");

  const [pageCount, setpageCount] = useState(0);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList.userList);
  const lastPage = useSelector((state) => state.userList.lastPage);

  const lastPage2 = useSelector((state) => state.type.lastPage);
  const types = useSelector((state) => state.type.types);
  const [pageCount2, setpageCount2] = useState(0);
  const [page2, setPage2] = useState(1);

  const [pageCount3, setpageCount3] = useState(0);
  const [page3, setPage3] = useState(1);
  const emails = useSelector((state) => state.email.emails);
  const lastPage3 = useSelector((state) => state.type.lastPage);

  const [pageCount4, setpageCount4] = useState(0);
  const [page4, setPage4] = useState(1);
  const firstNames = useSelector((state) => state.firstName.firstNames);
  const lastPage4 = useSelector((state) => state.firstName.lastPage);

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
    getUserList(dispatch, configuration, page);
  }, [dispatch, page]);

  useEffect(() => {
    getByGender(dispatch, configuration, gender, page2);
    setpageCount2(lastPage2);
  }, [gender, lastPage2, page2]);

  useEffect(() => {
    getByEmail(dispatch, configuration, email, page3);
    setpageCount3(lastPage3);
  }, [email, lastPage3, page3]);

  useEffect(() => {
    getByFirstName(dispatch, configuration, firstName, page4);
    setpageCount4(lastPage4);
    console.log(lastPage4)
  }, [firstName, lastPage4, page4]);
  const handleDelete = (id) => {
    deleteUserOfList(id, dispatch, configuration);
  };
  const handleActivate = (e, id) => {
    e.preventDefault();
    activeUser(id, dispatch, configuration);
  };
  const handleDectivate = (e, id) => {
    e.preventDefault();
    deactiveUser(id, dispatch, configuration);
  };
  const handlePageClick2 = async (data) => {
    let currentPage2 = data.selected + 1;
    setPage2(currentPage2);
  };
  const handlePageClick3 = async (data) => {
    let currentPage3 = data.selected + 1;
    setPage3(currentPage3);
  };
  const handlePageClick4 = async (data) => {
    let currentPage4 = data.selected + 1;
    setPage4(currentPage4);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    ,
    {
      field: "avatar",
      headerName: "avatar",
      width: 80,
      renderCell: (params) => {
        return (
          <ProductListItem>
            <ProductListImg
              src={`http://localhost:8000/storage/image/user/${params.row.id}/${params.row.avatar}`}
              alt=""
            />
          </ProductListItem>
        );
      },
    },
    {
      field: "first_name",
      headerName: "first_name",
      width: 100,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.first_name ? params.row.first_name : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "last_name",
      headerName: "last_name",
      width: 100,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.last_name ? params.row.last_name : "_"}
          </ProductListItem>
        );
      },
    },
    {
      field: "gender",
      headerName: "gender",
      width: 100,
      renderCell: (params) => {
        return (
          <ProductListItem>
            {params.row.gender ? params.row.gender : "_"}
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
      field: "role_id",
      headerName: "role_id",
      width: 130,
      renderCell: (params) => {
        if (params.row.role_id) {
          return (
            <ProductListItem>
              {params.row.role_id === 2 ? "user" : "admin"}
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
            <Link to={"/user_update/" + params.row.id}>
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
    <SearchUsers>
      <ProductTitleContainer>
        <ProductTitle>userlist</ProductTitle>
      </ProductTitleContainer>
      <InputContainer>
        <ProductInput>
          <TopSearchIcon className="fas fa-search" />
          <ProductInputInfo
            placeholder="Enter gender..."
            type="text"
            onChange={(e) => setGender(e.target.value)}
          />
        </ProductInput>
        <ProductInput>
          <TopSearchIcon className="fas fa-search" />
          <ProductInputInfo
            placeholder="Enter firstname..."
            type="text"
            onChange={(e) => setfirstname(e.target.value)}
          />
        </ProductInput>
        <ProductInput>
          <TopSearchIcon className="fas fa-search" />
          <ProductInputInfo
            placeholder="Enter email..."
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </ProductInput>
      </InputContainer>

      <Link to="/createUnit">
        <Btn color="deb887" margin="30">
          new user
        </Btn>
      </Link>
      {firstName && !gender && !email && (
        <>
          <DataGrid
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
            }}
            rows={firstNames}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            {...firstNames}
          />

          <PaginationStyle>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount4}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick4}
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
      {gender && !email && !firstName && (
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
      {email && !gender && !firstName && (
        <>
          <DataGrid
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
            }}
            rows={emails}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            {...emails}
          />

          <PaginationStyle>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount3}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick3}
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
      {!gender && !email && !firstName && (
        <>
          <DataGrid
            sx={{
              width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
            }}
            rows={userList}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            {...userList}
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
    </SearchUsers>
  );
};

export default UserList;
