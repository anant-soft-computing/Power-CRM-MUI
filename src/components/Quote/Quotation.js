import React, { useState, useEffect } from "react";
import { Box, Button, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "Supplier", headerName: "Supplier", width: 150 },
  { field: "Term", headerName: "Term", width: 120 },
  { field: "DayUnitrate", headerName: "Day Rate (pence/kwh)", width: 180 },
  { field: "NightUnitrate", headerName: "Night Rate (pence/kwh)", width: 200 },
  {
    field: "modifiedStandingCharge",
    headerName: "Standing Charge (pence)",
    width: 230,
  },
  { field: "Uplift", headerName: "Up Lift", width: 120 },
];

const Quotation = ({ siteId, upLiftRate, setShowQuotation }) => {
  const [ratesData, setRatesData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (siteId !== "") {
        try {
          const response = await fetch(
            `https://aumhealthresort.com/powercrm/api/udpcore/quotations/`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
                }`,
              },
              method: "POST",
              body: JSON.stringify({
                site_id: siteId,
              }),
            }
          );
          const data = await response.json();
          const dataWithUplift = data?.GetElectricRatesResult?.Rates.map(
            (rate, index) => ({
              id: index + 1,
              ...rate,
              modifiedStandingCharge: rate.StandingCharge + upLiftRate,
            })
          );
          setRatesData(dataWithUplift);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [siteId, upLiftRate]);

  const createRates = async (e) => {
    e.preventDefault();
    try {
      for (const item of selectedRows) {
        const standingCharge = parseFloat(item?.StandingCharge);
        const uplift = parseFloat(item?.Uplift);

        const bodyData = {
          supplier: item?.Supplier,
          term: item?.Term,
          day_rate: item?.DayUnitrate,
          night_rate: item?.NightUnitrate,
          standing_charge: standingCharge + uplift,
          extra_info: item?.ExtraInfo,
          up_lift: uplift,
          site: siteId,
        };

        const response = await fetch(
          "https://aumhealthresort.com/powercrm/api/createsupplierdata/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "POST",
            body: JSON.stringify(bodyData),
          }
        );
        if (!response.ok) {
          console.log(response);
        }
        setShowQuotation(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ m: 5, boxShadow: 5 }}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={ratesData}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            const selectedRows = newSelection.map((itemId) =>
              ratesData.find((row) => row?.id === itemId)
            );
            setSelectedRows(selectedRows);
          }}
          selectedRows={selectedRows.map((row) => row?.id)}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button variant="contained" color="primary" onClick={createRates}>
          Save Quotation
        </Button>
      </Box>
    </Card>
  );
};

export default Quotation;