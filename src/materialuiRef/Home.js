import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell,{ tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Parse from "parse/dist/parse.min.js";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBarComp from "./AppBarComp";

// import { RotatingLines } from  'react-loader-spinner'
import { Margin } from "@mui/icons-material";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../App.css"
function Home() {
  const [Person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("apiInformation");
    console.log(query,"queryqueryquery");
    query.descending("createdAt");
    let Person = await query.find();
    // access the Parse Object attributes
    setPerson(Person);
    console.log(Person, "______person_________");

    let newp = Person.map((e) =>
      console.log(e.createdAt.toLocaleDateString("en-US"))
    );
  }

  const loadData = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setLoading((loading) => !loading);
  };
  useEffect(() => {
    fetchPerson();

    loadData();

  }, []);

  return (
      <>
      {loading ? (
        // <div style={{margin:"300px auto",textAlign:"center"}}>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          {" "}
          <AppBarComp />
          <div
            style={{
              maxWidth: "90%",
              textAlign: "center",
              margin: "10px auto",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      <b>Object (ID</b>)
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>Auth-Token</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>Sent Data</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>Url</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>Status</b>
                    </StyledTableCell>
                    <StyledTableCell>
                      <b>created At</b>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Person?.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell>{row.get("token")}</StyledTableCell>
                      <StyledTableCell>{row.get("datas")}</StyledTableCell>
                      <StyledTableCell>{row.get("url")}</StyledTableCell>
                      <StyledTableCell>{row.get("Status")}</StyledTableCell>
                      <StyledTableCell>
                        {row.createdAt.toString()}
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button variant="contained" onClick={() => history.push("./")}>
              Back
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;

