import React, { useState, useEffect } from "react";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../../css/custom.css";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

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
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const validateForm = () => {
    if (selectedRows.length === 0) {
      setFormError("Please select at least one Rate before saving. ");
      return false;
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  useEffect(() => {
    if (siteId !== "") {
      (async () => {
        try {
          const response = await ajaxCall(
            "udpcore/quotations/",
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
            },
            8000
          );
          if (response.status === 200) {
            const dataWithUplift =
              response?.data?.GetElectricRatesResult?.Rates.map((rate) => ({
                ...rate,
                modifiedStandingCharge: rate.StandingCharge + upLiftRate,
              }));
            setRatesData(dataWithUplift);
          }
        } catch (error) {
          toast.error("Some Problem Occurred. Please try again.");
        }
      })();
    }
  }, [siteId, upLiftRate]);

  const createRates = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
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

        const response = await ajaxCall(
          "createsupplierdata/",
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
          },
          8000
        );
        if (response.status !== 201) {
          toast.error("Some Problem Occurred. Please try again.");
          return;
        }
      }
      toast.success("Quotation Added Successfully.");
      setShowQuotation(false);
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({ ...formStatus, isSubmitting: false });
    }
  };

  return (
    <Card sx={{ m: 5, boxShadow: 5 }}>
      {ratesData.length > 0 ? (
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={ratesData}
            columns={columns}
            disableColumnFilter
            disableDensitySelector
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              const selectedRows = newSelection.map((itemId) =>
                ratesData.find((row) => row.QuoteRateReference === itemId)
              );
              setSelectedRows(selectedRows);
            }}
            selectedRows={selectedRows.map((row) => row.QuoteRateReference)}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "evenRow" : "oddRow"
            }
            getRowId={(row) => row.QuoteRateReference}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      ) : (
        <Typography
          color="error"
          sx={{ mt: 2 }}
          align="center"
          variant="h6"
          component="div"
        >
          No Rates Available For Above Details !!
        </Typography>
      )}
      <Box display="flex" justifyContent="flex-end" p={2}>
        {formStatus.isSubmitting ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary" onClick={createRates}>
            Save Quotation
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default Quotation;
