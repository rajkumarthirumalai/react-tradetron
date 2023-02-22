import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRef, useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Parse from "parse/dist/parse.min.js";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Slide from "@mui/material/Slide";
import { Settings } from "@mui/icons-material";

const theme = createTheme();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignInSide() {
  const history = useHistory();
  const urlLinkinput = useRef(null);
  const token = useRef(null);
  const [loading, setLoading] = useState(true);
  const [formFields, setFormFields] = useState([{ key: "", value: "" }]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [template, setTemplate] = useState("");
  const [fetchedtemp, setFetchedtemp] = useState([]);
  const [urll, setUrll] = useState("");
  const [tokenu, setTokenu] = useState("");
  const [delId, setdelId] = useState("");

  const loadData = async () => {
    await new Promise((r) => setTimeout(r, 300));
    setLoading((loading) => !loading);
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    fetchhing();
  }, [open1, delId, open]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = (id) => {
    setdelId(id);
    setOpen1(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const ob2 = { token: data.get("token"), ...formFields };
    if (data.get("urlLink") && data.get("token")) {
      await axios
        .post("http://localhost:8000/about", {
          Urlll:data.get("urlLink"),
          innerData:ob2
        })
        .then(async (res) => {
          console.log(res,"resssssssssss");
          try {
            // create a new Parse Object instance
            const Person = new Parse.Object("apiInformation");
            // define the attributes you want for your Object

            if (res.status == 201) {
              console.log(formFields, "formfields@");
              console.log(res.data.createdAt, "created@");
              console.log(data.get("urlLink"), "urlLink@");
              console.log(data.get("token"), "token@");

              let some = JSON.stringify(formFields);
              console.log(some, "i am going");
              Person.set("datas", some);
              Person.set("url", data.get("urlLink"));
              Person.set("token", data.get("token"));
              Person.set("Status", res.status);
              await Person.save().then(
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
            } else {
              toast.error("please enter vaild Url!",res.code, {
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
            // save it on Back4App Data Store
       
            console.log("OBJECT saved!");
          } catch (error) {
            toast.error(`error is : ${error.message}`, {
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

        .catch((err) =>
          toast.error(`${err.message}`, {
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
    } else {
      if (data.get("urlLink") == "") {
        toast.error("please enter the Input!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (data.get("token") == "") {
        toast.error("please enter the Auth Token!", {
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
    }
  };

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      key: "",
      value: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  const getTemplate = async (id) => {
    setFormFields([]);
    const tempInformation1 = await new Parse.Query("tempInformation");
    const tt2 = await tempInformation1.get(id);
    setFormFields(tt2.get("templateForm"));
    setUrll(tt2.get("templateUrl"));
    setTokenu(tt2.get("templateToken"));
    setTemplate(tt2.get("templateName"));
    // console.log(formFields, "formFieldsformFieldsformFields");
    console.log(tt2.get("templateUrl"), "tt2tt2tt2");
  };

  const deletetemplate = async (id) => {
    const tempInformation1 = await new Parse.Query("tempInformation");
    const tt2 = await tempInformation1.get(id);
    tt2.destroy();
    setTimeout(() => {
      setdelId("");
      setOpen1(false);
    }, 500);
  };

  const fetchhing = async () => {
    const tempInformation1 = new Parse.Query("tempInformation");
    let dde = await tempInformation1.find();
    setFetchedtemp(dde);
  };
  const getMethod = async () => {
    const Link = `${urll}?auth-token=${tokenu}`;
    const mappedArr = formFields
      .map((e, i) => {
        const string1 = JSON.stringify(e)
          .replaceAll(":", "=")
          .replaceAll("{", "")
          .replaceAll("}", "")
          .replaceAll('"', "")
          .split(",");
        if (i == 0) {
          let i = "";
          const string2 = `&${string1[0].slice(0, 3) + string1[0].slice(3)}&${
            string1[1].slice(0, 5) + string1[1].slice(5)
          }`;
          return string2;
        } else {
          const string2 = `&${
            string1[0].slice(0, 3) + i + string1[0].slice(3)
          }&${string1[1].slice(0, 5) + i + string1[1].slice(5)}`;
          return string2;
        }
      })
      .toString()
      .replaceAll(",", "");
    const resultUrl = Link + mappedArr;
    axios
      .post(urll, formFields)
      .then(async (res) => {
        const Person = new Parse.Object("apiInformation");
        let some = JSON.stringify(formFields);
        Person.set("datas", some);
        Person.set("url", urll);
        Person.set("token", tokenu);
        Person.set("Status", "succesful");
        await Person.save()
          .then(
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
          )
          .catch((er) =>
            toast.error(`${er}`, {
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
      .catch(async (err) => {
        toast.error(`Error ${err}`, {
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
    // window.open(
    //   resultUrl,
    //   "_blank" // <- This is what makes it open in a new window.
    // );
    console.log(resultUrl);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (template != "") {
      if (urll && tokenu) {
        const query = new Parse.Query("tempInformation");
        console.log(
          template,
          "templatetemplatetemplatetemplatetemplatetemplatetemplate"
        );
        query.equalTo("templateName", template.trim());
        await query.first().then(async (e) => {
          if (e) {
            console.log("Updated");
            e.set("templateUrl", urll);
            e.set("templateToken", tokenu);
            e.set("templateForm", formFields);
            await e.save().then((msg) => {
              console.log(msg, "Updated");
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
          } else {
            console.log("created");
            const tempInformation2 = new Parse.Object("tempInformation");
            tempInformation2.set("templateName", template.trim());
            tempInformation2.set("templateUrl", urll);
            tempInformation2.set("templateToken", tokenu);
            tempInformation2.set("templateForm", formFields);
            await tempInformation2.save().then((msg) => {
              console.log(msg, "created");
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
        toast.error(
          "please enter the Url and Auth Token to save the template!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        setOpen(false);
        setTemplate("");
      }
    } else {
      toast.error("please enter the name to save the template!", {
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
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {loading ? (
        // <div style={{margin:"300px auto",textAlign:"center"}}>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ThemeProvider theme={theme}>
          <Dialog
            open={open1}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose1}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Are you sure wanna delete?"}</DialogTitle>
            <DialogActions>
              <Button onClick={() => handleClose1()}>Cancel</Button>
              <Button onClick={() => deletetemplate(delId)}>Delete</Button>
            </DialogActions>
          </Dialog>
          <Grid
            container
            style={{ width: "100%", maxWidth: "100%", height: 700 }}
          >
            <Grid item xs={3} md={3} container>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                <Typography component="h1" variant="h5">
                  Templates
                </Typography>
                <nav aria-label="main mailbox folders">
                  <List>
                    {fetchedtemp?.map((row) => (
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ width: 90, marginLeft: 5 }}
                          onClick={() => getTemplate(row.id)}
                        >
                          <ListItemIcon>
                            <InboxIcon sx={{ color: "green" }} />
                          </ListItemIcon>
                          <ListItemText primary={row.get("templateName")} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ width: 2 }}
                          onClick={() => handleClickOpen1(row.id)}
                        >
                          <ListItemIcon>
                            <DeleteRoundedIcon sx={{ color: "red" }} />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </nav>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} style={{ borderRadius: 5 }}>
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Post Api
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    ref={urlLinkinput}
                    margin="normal"
                    required
                    fullWidth
                    id="urlLink"
                    label="Url Link"
                    name="urlLink"
                    autoFocus
                    onChange={(e) => setUrll(e.target.value)}
                    value={urll}
                    defaultValue={urll}
                  />
                  <TextField
                    ref={token}
                    margin="normal"
                    required
                    fullWidth
                    name="token"
                    label="Auth Token"
                    id="token"
                    autoComplete="current-password"
                    onChange={(e) => setTokenu(e.target.value)}
                    value={tokenu}
                    defaultValue={tokenu}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 3 }}
                  >
                    Post
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    sx={{ mt: 3, mb: 2, mr: 3 }}
                  >
                    {" "}
                    Save as template
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => getMethod()}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {" "}
                    Get
                  </Button>

                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Url Template</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Enter a template name to save
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Template Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={template}
                        onChange={(e) => {
                          setTemplate(e.target.value);
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleSave}>save</Button>
                    </DialogActions>
                  </Dialog>
                </Box>
                <Box>
                  <form>
                    {formFields?.map((form, index) => {
                      return (
                        <Box key={index}>
                          <TextField
                            sx={{ mr: 3 }}
                            margin="normal"
                            name="key"
                            label="Key"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.name}
                            defaultValue={form.key}
                          />
                          {}
                          <TextField
                            sx={{ mr: 3 }}
                            margin="normal"
                            name="value"
                            label="Value"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.age}
                            defaultValue={form.value}
                          />
                          <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => removeFields(index)}
                          >
                            Remove
                          </Button>
                        </Box>
                      );
                    })}
                  </form>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={addFields}
                  >
                    Add More..
                  </Button>
                  <br />
                  <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => history.push("./home")}
                  >
                    View info
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3} md={3} container></Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
}

// const tempInformation1 = new Parse.Query("tempInformation");
// let dde = await tempInformation1.find();
// for (let i = 0; i < dde.length; i++) {
//     // This does not require a network access.
//     const post = dde[i].get("templateName");
//     console.log(post,i);
//   }

