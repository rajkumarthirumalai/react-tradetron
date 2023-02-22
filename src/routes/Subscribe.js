import React, { useState,useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { Button, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

Parse.initialize("123");
Parse.serverURL = "http://localhost:1337/parse";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
let temporaryArray = []
function SubscribeComp() {
  const [theArray, setTheArray] = useState([]);
  useEffect(() => {
    raj();
  }, []);


  async function raj() {
    const q = await new Parse.Query("randomvalues").subscribe();
    // let subscription = q.subscribe();

    (await q).on("create", (obj) => {
      console.log("object created...." + obj);
      setTheArray([...theArray, obj.get("randomnumber")]);
      temporaryArray = [...temporaryArray, obj.get("randomnumber")]
    });
  }

  const data = {
    labels: temporaryArray.map((e, i) => i),
    datasets: [
      {
        label: "the value is",
        data: temporaryArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
    ],
  };
  console.log(theArray,"theArraytheArraytheArray");
  console.log(temporaryArray,"temporaryArray");
  return (
    <div>
      <Typography
        sx={{
          color: "darkBlue",
          textAlign: "center",
          mt: 3,
        }}
        component="h1"
        variant="h6"
      >
        {JSON.stringify(temporaryArray)}
      </Typography>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "random value",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default SubscribeComp;
