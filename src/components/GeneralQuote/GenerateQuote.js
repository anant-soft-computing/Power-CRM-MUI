import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  Container,
  Stepper,
  Step,
  Toolbar,
  StepLabel,
} from "@mui/material";
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

const steps = ["Step 1", "Step 2", "Step 3"];

const GenerateQuote = ({ site }) => {
  const [quoteData, setQuoteData] = useState(initialQuoteState);
  const [activeStep, setActiveStep] = useState(0);

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quoteData);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
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
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
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
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
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
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box >
      <Container
        component="main"
        sx={{
          marginTop: 1,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          Generate Quotes
        </Typography>

        <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
          <Box >
            <Container maxWidth="lg">
              <Box >
                <Box >
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                      Quote Information
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    {getStepContent(activeStep)}
                    <Box sx={{ mt: 2 }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Generate Quote
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </form>
                </Box>
              </Box>
            </Container>
          </Box>
        </Card>
      </Container>
    </Box >



  );
};

export default GenerateQuote;
