import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';
import { initializeParse } from '@parse/react';
import Home from "./materialuiRef/Home";
import Main from "./materialuiRef/Main";
import Tradetron from "./materialuiRef/Tradetron";
import Strategies from "./materialuiRef/Strategies";
import ExtensionData from "./materialuiRef/ExtensionData";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SubscribeComp from './materialuiRef/Subscribe';
// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = '123';
const PARSE_HOST_URL = 'http://207.244.108.206:1338/parse';
const PARSE_MASTER_KEY = '123';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_MASTER_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <div className="App">
      <header className="App-header">
      </header>
    <Router>
        <Switch>
          <Route path="/Postdetails">
            <Home />
          </Route>
          <Route path="/tradetron">
            <Tradetron />
          </Route>
          <Route path="/tradetronStrategy">
            <Strategies />
          </Route>
          <Route path="/stockgraph">
            <SubscribeComp />
          </Route>
          <Route path="/extension">
            <ExtensionData />
          </Route>
          <Route path="/">
          <Main/>
          </Route>
        </Switch>
      </Router>
    </div>
    </LocalizationProvider>
  );
}

export default App;
