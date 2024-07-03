import React from "react";
import Chart from "chart.js/auto";
import moment from "moment/moment";
import { Bar } from "react-chartjs-2";
import { Card, CardContent, Typography } from "@mui/material";

const SiteChart = ({ siteData }) => {
  const data = {
    labels: siteData?.map(
      ({ date_created, site_name }) =>
        `${moment(date_created).format("ll")} - ${site_name}`
    ),
    datasets: [
      {
        label: "Site Data",
        data: siteData?.map(({ id }) => id),
        fill: true,
        backgroundColor: "#1976d2",
      },
    ],
  };
  return (
    <Card sx={{ width: "50%", mt: 3, boxShadow: 5, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Site Report
        </Typography>
        <Bar options={{ responsive: true }} data={data} />
      </CardContent>
    </Card>
  );
};

export default SiteChart;
