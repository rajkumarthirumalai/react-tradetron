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

const CEAndPE = [
  {
    value: "CE",
    label: "CE",
  },
  {
    value: "PE",
    label: "PE",
  },
];
const BuyAndSell = [
  {
    value: "BUY",
    label: "BUY",
  },
  {
    value: "SELL",
    label: "SELL",
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Tradetron() {
  const [loading, setLoading] = useState(true);
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
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [fetchedArr, setFetchedArr] = useState([]);
  const [fetchedArr1, setFetchedArr1] = useState([]);
  const [currtoken, setCurrToken] = useState({});
  const [singleObj, setSingleObj] = useState({
    CEPE: "",
    BuySell: "",
    strike: "",
    expiry: null,
    lot: "",
    qty: "",
  });

  const getMethod = async () => {
    if (
      Auth.tokenName &&
      Auth.authToken &&
      values.CEPE &&
      values.BuySell &&
      values.strike &&
      values.expiry &&
      values.lot &&
      values.qty !== ""
    ) {
    const cepebuysell = values.CEPE + values.BuySell;
    const Link = `https://api.tradetron.tech/?auth-token=${Auth.authToken}`;
    const some = new Parse.Query("AuthtokenDetails");
    if (singleObj.id) {
      const tt2 = await some.get(singleObj.id);
      const resultUrl = `&key=${cepebuysell}totallots&value=${
        values.lot
      }&key1=${cepebuysell}strike&value1=${
        values.strike
      }&key2=${cepebuysell}exp&value2=${values.expiry
        .toLocaleString()
        .slice(0, 10)}&key3=${cepebuysell}qty&value3=${
        values.qty
      }&key4=${cepebuysell}entry&value4=${"1"}`;
      console.log(resultUrl, "resultUrlresultUrl");
    }
    let lots;
    const parseQuery = new Parse.Query("BrokerOrder").equalTo(
      "authToken",
      Auth.authToken
    );
    parseQuery.find().then(async (results) => {
      results.forEach((user) => {
        console.log(user.get("tokenName"), "overhere");
      });
      let lots = parseInt(values.qty);
      lots =
        lots +
        results.map((e) => parseInt(e.get("qty"))).reduce((a, b) => a + b, 0);
      console.log(lots, "Total Quantity");
      const Person = new Parse.Object("BrokerOrder");
      Person.set("tokenName", Auth.tokenName);
      Person.set("authToken", Auth.authToken);
      Person.set("CEPE", values.CEPE + values.BuySell);
      Person.set("method", "GET");
      Person.set("expiry", values.expiry);
      Person.set("strike", values.strike);
      Person.set("lot", lots.toString());
      Person.set("qty", values.qty);
      await Person.save().then(
        setTimeout(() => {
          fetchToken();
          setValues({
            CEPE: "",
            BuySell: "",
            strike: "",
            expiry: null,
            lot: "",
            qty: "",
          });
          setAuth({
            tokenName: "",
            authToken: "",
          });
        }, 1000),
        toast.success("posted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
    });}
  };
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
    if (
      Auth.tokenName &&
      Auth.authToken &&
      values.CEPE &&
      values.BuySell &&
      values.strike &&
      values.expiry &&
      values.lot &&
      values.qty !== ""
    ) {
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
    }, 1000);}
  };

  const SaveSingleObj = async () => {
    if (
      Auth.tokenName &&
      Auth.authToken &&
      values.CEPE &&
      values.BuySell &&
      values.strike &&
      values.expiry &&
      values.lot &&
      values.qty !== ""
    ) {
      console.log(singleObj.id);
      const some = new Parse.Query("AuthtokenDetails");
      const tt2 = await some.get(singleObj.id);
      // const some2 = new Parse.Object("AuthtokenDetails");
      console.log(values, "values", Auth, "auth");
      tt2.set("tokenName", Auth.tokenName);
      tt2.set("authToken", Auth.authToken);
      tt2.set("CEPE", values.CEPE);
      tt2.set("BuySell", values.BuySell);
      tt2.set("strike", values.strike);
      tt2.set("expiry", values.expiry);
      tt2.set("lot", values.lot);
      tt2.set("qty", values.qty);
      await tt2.save();
      setTimeout(() => {
        fetchToken();
        setValues({
          CEPE: "",
          BuySell: "",
          strike: "",
          expiry: null,
          lot: "",
          qty: "",
        });
        setAuth({
          tokenName: "",
          authToken: "",
        });
      }, 1000);
    }
  };
  const PosingSingleObj = async () => {
    if (
      Auth.tokenName &&
      Auth.authToken &&
      values.CEPE &&
      values.BuySell &&
      values.strike &&
      values.expiry &&
      values.lot &&
      values.qty !== ""
    ) {
    await axios
      .post("http://localhost:8000/about2", {
        innerData: values,
      })
      .then(async (res) => {
        let lots = parseInt(values.qty);
        if (res.data === "Sent") {
          const parseQuery = new Parse.Query("BrokerOrder").equalTo(
            "authToken",
            Auth.authToken
          );
          parseQuery
            .find()
            .then(async (results) => {
              results.forEach((user) => {
                console.log(user.get("tokenName"), "overhere");
              });
              lots =
                lots +
                results
                  .map((e) => parseInt(e.get("qty")))
                  .reduce((a, b) => a + b, 0);
              console.log(lots, "Total Quantity");
              const Person = new Parse.Object("BrokerOrder");
              Person.set("tokenName", Auth.tokenName);
              Person.set("authToken", Auth.authToken);
              Person.set("CEPE", values.CEPE + values.BuySell);
              Person.set("method", "POST");
              Person.set("expiry", values.expiry);
              Person.set("strike", values.strike);
              Person.set("lot", lots.toString());
              Person.set("qty", values.qty);
              await Person.save().then(
                setTimeout(() => {
                  fetchToken();
                  setValues({
                    CEPE: "",
                    BuySell: "",
                    strike: "",
                    expiry: null,
                    lot: "",
                    qty: "",
                  });
                  setAuth({
                    tokenName: "",
                    authToken: "",
                  });
                }, 1000),
                toast.success("posted successfully!", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                })
              );
            })

            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error(res.data, {
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
      })
      .catch(async (err) => {
        console.log(err, "error is ");
      });}
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
  const fetchToken = async () => {
    const some = new Parse.Query("AuthtokenDetails");
    some.descending("createdAt");
    let dde = await some.find();
    setFetchedArr(dde);

    const some2 = new Parse.Query("BrokerOrder");
    some2.descending("createdAt");
    let dde2 = await some2.find();
    setFetchedArr1(dde2);
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

  const disableRandomDates = (e) => {
    return e.getDay() !== 4;
  };
  const loadData = async () => {
    await new Promise((r) => setTimeout(r, 200));
    setLoading((loading) => !loading);
  };
  useEffect(() => {}, [open, values, Auth, fetchedArr]);
  useEffect(() => {
    fetchToken();
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
          <Grid
            item={true}
            container
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <Grid
              item={true}
              sx={{ display: "block" }}
              xs={12}
              md={12}
              container
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid item={true} container>
                  <Grid item={true} xs={12}>
                    <AppBarComp />
                  </Grid>

                  <Grid item={true} xs={12} md={5}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component="form"
                        noValidate
                        //   onSubmit={handleSubmit}
                        sx={{
                          display: "block",
                          mt: 1,
                          ml: 5,
                          boxShadow: 4,
                          borderRadius: 4,
                          width: "100%",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "darkBlue",
                              textAlign: "center",
                              mt: 3,
                            }}
                            component="h1"
                            variant="h2"
                          >
                            Tradetron
                          </Typography>

                          {/* the Auth toke values tag  */}

                          <Box display="inline">
                            <FormControl sx={{ m: 2, width: "70%" }}>
                              <InputLabel
                                size="small"
                                id="demo-simple-select-label"
                              >
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
                                    {`${r.get("tokenName")}-${r.get(
                                      "authToken"
                                    )}`}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <IconButton onClick={() => handleClickOpen("save")}>
                              <AddCircleOutlineIcon
                                sx={{
                                  m: 1,
                                  color: "rgb(25,118,210)",
                                  fontSize: 40,
                                }}
                              />
                            </IconButton>
                            <IconButton onClick={() => handleClickOpen("edit")}>
                              <EditIcon
                                sx={{
                                  m: 1,
                                  color: "rgb(25,118,210)",
                                  fontSize: 40,
                                }}
                              />
                            </IconButton>
                          </Box>

                          <TextField
                            size="small"
                            sx={{ mt: 2, ml: 2, mr: 2, width: "20ch" }}
                            select
                            label="Select"
                            value={values.CEPE}
                            onChange={handleChange("CEPE")}
                            helperText="Please select CE/PE"
                          >
                            {CEAndPE.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            size="small"
                            sx={{ m: 2, ml: 2, mr: 2, width: "20ch" }}
                            select
                            label="Select"
                            value={values.BuySell}
                            onChange={handleChange("BuySell")}
                            helperText="Please select Buy/Sell"
                          >
                            {BuyAndSell.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>

                          <Box sx={{ display: "block" }}>
                            <TextField
                              size="small"
                              sx={{ width: "90%", m: 2 }}
                              label="Strike"
                              value={values.strike}
                              onChange={handleChange("strike")}
                            />
                          </Box>

                          <Box sx={{ display: "block" }}>
                            <TextField
                              size="small"
                              sx={{ width: "90%", m: 2 }}
                              label="Lot"
                              value={values.lot}
                              onChange={handleChange("lot")}
                            />
                          </Box>

                          <Box sx={{ display: "block", m: 2 }}>
                            <DatePicker
                              label="expiry"
                              minDate={new Date()}
                              shouldDisableDate={(e) => disableRandomDates(e)}
                              value={values.expiry}
                              onChange={(e) => {
                                setValues({ ...values, expiry: e });
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Box>
                          <Box sx={{ display: "block" }}>
                            <TextField
                              size="small"
                              sx={{ width: "90%", m: 2 }}
                              label="qty"
                              value={values.qty}
                              onChange={handleChange("qty")}
                              type="number"
                            />
                          </Box>
                          <Button
                            variant="contained"
                            sx={{
                              width: 100,
                              ml: 3,
                            }}
                            onClick={() => getMethod()}
                          >
                            Get
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              width: 100,
                              ml: 2,
                            }}
                            onClick={() => PosingSingleObj()}
                          >
                            Post
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              width: 100,
                              ml: 2,
                            }}
                            onClick={() => SaveSingleObj()}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              width: 100,
                              ml: 2,
                            }}
                          >
                            Exit
                          </Button>
                        </Box>
                        <Box sx={{ p: 1, m: 1 }}></Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item={true} xs={12} md={7}>
                    <div
                      style={{
                        maxWidth: "90%",
                        textAlign: "center",
                        margin: "10px auto",
                      }}
                    >
                      <TableContainer
                        sx={{ height: 650, width: "100%" }}
                        component={Paper}
                      >
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>
                                <b>Time</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b>Method</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b>Auth-Token</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b>Token Name</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b>CE/PE</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b>Strike</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b> Quantity</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b> Lots</b>
                              </StyledTableCell>
                              <StyledTableCell>
                                <b>expiry</b>
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {fetchedArr1
                              ?.filter((e, i) => {
                                return e.get("CEPE") !== undefined;
                              })
                              .filter((e) => {
                                return (
                                  e.createdAt.getDate() === new Date().getDate()
                                );
                              })
                              .map((e, i) => (
                                <TableRow
                                  key={e.id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <StyledTableCell component="th" scope="row">
                                    {e.createdAt.toLocaleString()}
                                  </StyledTableCell>
                                  <StyledTableCell component="th" scope="row">
                                    {e.get("method")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("authToken")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("tokenName")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("CEPE")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("strike")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("qty")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("lot")}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    {e.get("expiry").toString()}
                                  </StyledTableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </Grid>
                  {/* {resultUrl} */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default Tradetron;

