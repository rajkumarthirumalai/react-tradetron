import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import AppBarComp from "./AppBarComp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ExtensionData() {
  const [theArray, setTheArray] = useState([]);
  const [theArrayOfvalues, setTheArrayOfvalues] = useState([]);
  useEffect(() => {
    raj();
  }, []);
  const groupBy = (items, key) =>
    items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item],
      }),
      []
    );
  async function raj() {
    const p = await new Parse.Query("WebUrlDom");
    const q = p.subscribe();
    // let subscription = q.subscribe();
    const query2 = new Parse.Query("WebUrlDom");
    query2.descending("createdAt");
    query2
      .find()
      .then((res) => {
        let resultantArray = res.map((val) => {
          const person = new Object();
          person.id = val.id;
          person.createdAt = val.createdAt;
          person.updatedAt = val.updatedAt;
          person.userId = val.get("userId");
          person.weburl = val.get("weburl");
          person.orders = val.get("orders");
          person.holdings = val.get("holdings");
          person.positions = val.get("positions");
          person.funds = val.get("funds");
          person.ExecutedOrders = val.get("ExecutedOrders");
          person.HoldingsTab = val.get("HoldingsTab");
          person.totalInvestment = val.get("totalInvestment");
          person.currentValue = val.get("currentValue");
          person.DayPL = val.get("DayPL");
          person.TotalPL = val.get("TotalPL");
          person.positionsTab1 = val.get("positionsTab1");
          person.positionsTab2 = val.get("positionsTab2");
          person.AvailableMargin = val.get("AvailableMargin");
          person.usedmargin = val.get("usedmargin");
          person.AvailableCash = val.get("AvailableCash");
          person.openingBalance = val.get("openingBalance");
          person.Payin = val.get("Payin");
          person.Payout = val.get("Payout");
          person.spanu = val.get("spanu");
          person.DeliveryMargin = val.get("DeliveryMargin");
          person.Exposure = val.get("Exposure");
          person.OptionsPremium = val.get("OptionsPremium");
          person.CollateralLiquidfunds = val.get("CollateralLiquidfunds");
          person.CollateralEquity = val.get("CollateralEquity");
          person.TotalCollateral = val.get("TotalCollateral");
          return person;
        });
        let newArray = groupBy(resultantArray, "userId");

        setTheArray(Object.keys(newArray));
        setTheArrayOfvalues(Object.values(newArray));
      })(await q)
      .on("create", (obj) => {
        console.log("object created...." + obj);
        const query2 = new Parse.Query("WebUrlDom");
        query2.descending("createdAt");
        query2
          .find()
          .then((response) =>
            response.map((res) => {
              return {
                res,
              };
            })
          )
          .then((res) => setTheArray(res));
      });
  }
  console.log(
    theArray && theArray,
    theArrayOfvalues && theArrayOfvalues,
    "array is"
  );
  return (
    <div>
      <AppBarComp />

      {theArrayOfvalues?.map((ev, i) => {
        return (
          <div key={i}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: 2,
                    backgroundColor: "black",
                    fontWeight: 700,
                    p: 1,
                  }}
                >
                  {theArray[i]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {ev?.map((e) => (
                  <Typography
                  sx={{
                    m: 2,
                    fontFamily: "monospace",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: 2,
                    backgroundColor: "primary blue",
                    fontWeight: 700,
                    p: 1,
                  }}
                  >{(e.weburl)}</Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default ExtensionData;
