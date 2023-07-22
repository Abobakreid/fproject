import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { Loading, Navbar } from "../../Components";

const AnalysisStadium = () => {
  const [load, setLaod] = useState(false);
  const { stad_Id } = useParams();
  const [statelo, setstatelo] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [0, 0],
      },
    },
    series: [
      {
        name: "reservedByWebsite",
        data: [0, 0],
      },
      {
        name: "reservedByOwner",
        data: [0, 0],
      },
    ],
  });

  const getMyReservations = async () => {
    try {
      setLaod(true);
      const res = await fetch(
        `https://a7gezlyapi.azurewebsites.net/api/Stadium/GetStadiumAnalysis?id=${stad_Id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (data) {
        console.log(data);
        let allwithday = [];
        let allwith_reservedByWebsite = [];
        let allwith_reservedByOwner = [];
        await data.forEach((el) => {
          allwithday.push(el.day.split("T")[0]);
          allwith_reservedByWebsite.push(el.reservedByWebsite);
          allwith_reservedByOwner.push(el.reservedByOwner);
        });
        setstatelo({
          options: {
            colors: ["#E91E63", "#FF9800"],
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: allwithday,
            },
          },
          series: [
            {
              name: "reservedByWebsite",
              data: allwith_reservedByWebsite,
            },
            {
              name: "reservedByOwner",
              data: allwith_reservedByOwner,
            },
          ],
        });
      }
      setLaod(false);
      return data;
    } catch (error) {
      setLaod(false);
      return console.log(error);
    }
  };

  useEffect(() => {
    getMyReservations();
  }, []);

  return (
    <div className="analysis_stadium">
      <Navbar
        login={"register"}
        stadiums={"stadium"}
        homeowner={"homeowner"}
        registered={"registered"}
      />
      {load ? <Loading /> : null}
      <div className="container analysis_sta">
        <div style={{ width: "59%" }}>
          <Chart
            options={statelo.options}
            series={statelo.series}
            height="400"
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisStadium;
