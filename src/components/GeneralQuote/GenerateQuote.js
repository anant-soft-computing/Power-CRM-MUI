import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Grid, Card, Toolbar } from "@mui/material";
import moment from "moment";

const drawerWidth = 240;

const initialQuoteState = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  postcode: "",
  g_mpr: "",
  e_meter_type: "",
  credit_score: 0,
  custom_end_date: moment().format("YYYY-MM-DD"),
  measurement_class: "",
  payment_method: "MONTHLY DIRECT DEBIT",
  current_supplier: "",
  renewal_date: moment().format("YYYY-MM-DD"),
  unit_rate_uplift: "MAXIMUM",
  invariable_uplift: 0,
  annual_day_usage: 0,
  day_rate: 0,
  feed_in_tariff: 0,
  stading_charge: 0,
  annual_usage: 0,
};


const GenerateQuote = ({ site }) => {
  const [quoteData, setQuoteData] = useState(initialQuoteState);

  useEffect(() => {
    if (site) {
      setQuoteData({
        ...initialQuoteState,
        postcode: site.sitePostCode || "",
        current_supplier:
          site.current_gas_and_electricity_supplier_details || "",
      });
    }
  }, [site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData({
      ...quoteData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quoteData);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 1,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Card sx={{ p: 3, m: 2, boxShadow: 3 }}>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <Typography variant="h6">Quote Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="E MPAN Topline"
                      name="e_mpan_topline"
                      value={quoteData.e_mpan_topline}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="E MPAN Bottomline"
                      name="e_mpan_bottomline"
                      value={quoteData.e_mpan_bottomline}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Postcode"
                      name="postcode"
                      value={quoteData.postcode}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="G MPR"
                      name="g_mpr"
                      value={quoteData.g_mpr}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="E Meter Type"
                      name="e_meter_type"
                      value={quoteData.e_meter_type}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Credit Score"
                      type="number"
                      name="credit_score"
                      value={quoteData.credit_score}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Custom End Date"
                      type="date"
                      name="custom_end_date"
                      value={quoteData.custom_end_date}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Measurement Class"
                      name="measurement_class"
                      value={quoteData.measurement_class}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Payment Method"
                      name="payment_method"
                      value={quoteData.payment_method}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Current Supplier"
                      name="current_supplier"
                      value={quoteData.current_supplier}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Renewal Date"
                      type="date"
                      name="renewal_date"
                      value={quoteData.renewal_date}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Unit Rate Uplift"
                      name="unit_rate_uplift"
                      value={quoteData.unit_rate_uplift}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Invariable Uplift"
                      type="number"
                      name="invariable_uplift"
                      value={quoteData.invariable_uplift}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Annual Day Usage"
                      type="number"
                      name="annual_day_usage"
                      value={quoteData.annual_day_usage}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Day Rate"
                      type="number"
                      name="day_rate"
                      value={quoteData.day_rate}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Feed-in Tariff"
                      type="number"
                      name="feed_in_tariff"
                      value={quoteData.feed_in_tariff}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Standing Charge"
                      type="number"
                      name="stading_charge"
                      value={quoteData.stading_charge}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Annual Usage"
                      type="number"
                      name="annual_usage"
                      value={quoteData.annual_usage}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Generate Quote
              </Button>
            </form>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default GenerateQuote;
