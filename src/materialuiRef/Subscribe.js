import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, HiloSeries, Inject, DateTime,CandleSeries,
  Tooltip, Crosshair } from '@syncfusion/ej2-react-charts';

function SubscribeComp() {
  const [theArray, setTheArray] = useState([]);
  useEffect(() => {
    raj();
  }, []);
  async function raj() {
    const p = await new Parse.Query("randomvalues");
    const q = p.subscribe();
    // let subscription = q.subscribe();

    (await q).on("create", (obj) => {
      console.log("object created...." + obj);
      const query2 = new Parse.Query("randomvalues");
      query2.descending("createdAt");
      query2.limit(50);
      query2.find().then((response) =>
        response.map((res) => {
          return {
            date: res.createdAt,
            high: res.get("high"),
            low: res.get("low"),
            open: res.get("open"),
            close: res.get("close"),
          };
        })
      ).then(res => setTheArray(res))
    });
  }

  console.log(theArray, "theArraytheArraytheArray");
  return (
    <div>
        <ChartComponent
        primaryXAxis={{
          valueType: "DateTime",
          title: "Month",
          crosshairTooltip: { enable: true },
        }}
        title="AAPL historical"
        primaryYAxis={{ title: "Price" }}
        tooltip={{ enable: true }}
        crosshair={{ enable: true, lineType: "Vertical" }}
      >
        <Inject
          services={[CandleSeries, DateTime, Tooltip, Crosshair]}
        ></Inject>
        <SeriesCollectionDirective>
          {/* To create a Hilo Open Close series, import HiloOpenCloseSeries from the chart package and inject it into chart services. Then change the series type to HiloOpenClose*/}
          {/* To create a CandleSeries,import CandleSeries from chart package and inject it into chart series. Then change services type to Candle*/}
          <SeriesDirective
            type="Candle"
            name="Randomvalue"
            dataSource={theArray}
            xName="date"
            high="high"
            low="low"
            open="open"
            close="close"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>

    </div>
  );
}

export default SubscribeComp;
