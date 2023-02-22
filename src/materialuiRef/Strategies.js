import Parse from "parse/dist/parse.min.js";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableCell,
  tableCellClasses,
  Paper,
  IconButton,
  DialogTitle,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios, { Axios } from "axios";
import AppBarComp from "./AppBarComp";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Strategies() {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [currtoken, setCurrToken] = useState({});
  const [fetchedArr, setFetchedArr] = useState([]);
  const [values, setValues] = useState({
    CEPE: "",
    BuySell: "",
    strike: "",
    expiry: null,
    lot: "",
    qty: "",
  });
  const [Auth, setAuth] = useState({
    tokenName: "",
    authToken: "",
  });
  const [singleObj, setSingleObj] = useState({
    CEPE: "",
    BuySell: "",
    strike: "",
    expiry: null,
    lot: "",
    qty: "",
  });

  const saveNewToken = async () => {
    if (Auth.authToken && Auth.tokenName !== "") {
      console.log(Auth.authToken, Auth.tokenName, "rightn here");
      const query = new Parse.Query("AuthtokenDetails");
      query.equalTo("tokenName", Auth.tokenName.trim());
      await query.first().then(async (e) => {
        if (e) {
          console.log("already exists", e.get("authToken"));
          if (e.get("authToken") === Auth.authToken) {
            toast.error("Token value is unchanged", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            e.set("authToken", Auth.authToken);
            await e.save().then((msg) => {
              toast.success("Template updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
          }
        } else {
          console.log("created");
          const tempInformation2 = new Parse.Object("AuthtokenDetails");
          tempInformation2.set("tokenName", Auth.tokenName.trim());
          tempInformation2.set("authToken", Auth.authToken);
          await tempInformation2.save().then((msg) => {
            toast.success("Template created successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
        }
      });
    } else {
      toast.error("enter the details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  const saveNewToken1 = async () => {
    // if (Auth.authToken && Auth.tokenName !== "") {
    console.log(Auth.authToken, Auth.tokenName, "rightn here");
    const query = new Parse.Query("AuthtokenDetails");
    await query
      .notEqualTo("tokenName", Auth.tokenName.trim())
      .first()
      .then(async (e) => {
        if (e) {
          console.log(e);
          e.set("tokenName", Auth.tokenName);
          e.set("authToken", Auth.authToken);
          await e.save().then(
            toast.success(" tokenName is updated", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }),
            setTimeout(() => {
              setOpen1(false);
            }, 1000)
          );
        }
      });
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };
  const handleClickOpen = (i) => {
    if (i == "save") return setOpen(true);
    if (i == "edit") return setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChange2 = (prop) => (event) => {
    setAuth({ ...Auth, [prop]: event.target.value });
  };
  const getSingleObject = async (id) => {
    console.log(id);
    const some = new Parse.Query("AuthtokenDetails");
    const tt2 = await some.get(id);
    setSingleObj(tt2);

    if (tt2.get("CEPE")) {
      setValues({
        CEPE: tt2.get("CEPE"),
        BuySell: tt2.get("BuySell"),
        strike: tt2.get("strike"),
        expiry: tt2.get("expiry"),
        lot: tt2.get("lot"),
        qty: tt2.get("qty"),
      });
      setAuth({
        tokenName: tt2.get("tokenName"),
        authToken: tt2.get("authToken"),
      });
    } else {
      setValues({
        CEPE: "",
        BuySell: "",
        strike: "",
        expiry: new Date(),
        lot: "",
        qty: "",
      });
      setAuth({
        tokenName: tt2.get("tokenName"),
        authToken: tt2.get("authToken"),
      });
    }
  };
  return (
    <>
      <AppBarComp />
      <Box sx={{ flexGrow: 1, m: "10px auto", width: "60%" }}>
        <Grid container spacing={1}>
          <Grid container item spacing={2}>
            {/* <Grid item xs={6}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={6}>
              <Item
                
              >
                Item
              </Item>
            </Grid> */}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create New Token </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your Auth-Token and Token Name
                </DialogContentText>
                <TextField
                  size="small"
                  sx={{ m: 2, display: "block" }}
                  label="tokenName"
                  onChange={handleChange2("tokenName")}
                />
                <TextField
                  size="small"
                  sx={{ m: 2, display: "block" }}
                  label="authToken"
                  onChange={handleChange2("authToken")}
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => saveNewToken()}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={open1} onClose={handleClose}>
              <DialogTitle>Edit Your Token </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your Auth-Token and Token Name
                </DialogContentText>
                <TextField
                  size="small"
                  sx={{ m: 2, display: "block" }}
                  label="tokenName"
                  value={Auth.tokenName}
                  onChange={handleChange2("tokenName")}
                />
                <TextField
                  size="small"
                  sx={{ m: 2, display: "block" }}
                  label="authToken"
                  value={Auth.authToken}
                  onChange={handleChange2("authToken")}
                />
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => saveNewToken1()}>
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={12}>
              <Item
                sx={{
                  display: "block",
                  boxShadow: 4,
                  borderRadius: 4,
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "darkBlue",
                    textAlign: "center",
                  }}
                  component="h3"
                  variant="h4"
                >
                  <b>Strategies</b>
                </Typography>

                <Box display="inline">
                  <FormControl sx={{ m: 2, width: "70%" }}>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Token
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={currtoken}
                      label="Age"
                      size="small"
                      onChange={(e) => setCurrToken(e.target.value)}
                    >
                      {fetchedArr.map((r, i) => (
                        <MenuItem
                          key={i}
                          value={r.get("tokenName")}
                          onClick={() => getSingleObject(r.id)}
                        >
                          {`${r.get("tokenName")}-${r.get("authToken")}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => handleClickOpen("save")}>
                    <AddCircleOutlineIcon
                      sx={{ m: 1, color: "rgb(25,118,210)", fontSize: 40 }}
                    />
                  </IconButton>
                  <IconButton onClick={() => handleClickOpen("edit")}>
                    <EditIcon sx={{ m: 1, color: "rgb(25,118,210)", fontSize: 40 }} />
                  </IconButton>
                </Box>
              </Item>
            </Grid>
          </Grid>
          {/* <Grid container item spacing={2}>
            <Grid item xs={6}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Item</Item>
            </Grid>
            <Grid item xs={12}>
              <Item>Item</Item>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default Strategies;

