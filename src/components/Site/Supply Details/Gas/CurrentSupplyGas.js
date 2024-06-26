import { Grid, TextField, Box, Switch, FormControlLabel, Button, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

const initialState = {
  g_supplier: "",
  g_product: "",
  g_contract_type: "",
  g_won_date: moment().format("YYYY-MM-DD"),
  g_contract_start_date: moment().format("YYYY-MM-DD"),
  g_contract_end_date: moment().format("YYYY-MM-DD"),
  g_contract_length_months: "",
  g_contract_back_date: moment().format("YYYY-MM-DD"),
  g_supplier_reference: "",
  g_supplier_information1: "",
  g_supplier_information2: "",
  g_supplier_information3: "",
  g_agent: false,
  g_customer: false,
  stading_charge: "",
  standing_charge_uplift: "",
  unit_rate_uplift: "",
  rate: "",
  annual_usage: "",
};

const CurrentSupplyGas = () => {
  const [formData, setFormData] = useState(initialState);
  const [showUsageRatesForm, setShowUsageRatesForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = "https://aumhealthresort.com/powercrm/api/company/";
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
        }`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(apiURL, requestOptions);
      if (response.status === 201) {
        console.log(response);
      } else {
        console.log("--error---->");
      }
    } catch (error) {
      console.log("--error---->");
    }
  };

  return (
    <Box mb={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier"
              name="g_supplier"
              type="text"
              value={formData.g_supplier}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product"
              name="g_product"
              type="text"
              value={formData.g_product}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract Type"
              name="g_contract_type"
              type="text"
              value={formData.g_contract_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Won Date"
              type="date"
              name="g_won_date"
              value={formData.g_won_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Contract Start Date"
              name="g_contract_start_date"
              value={formData.g_contract_start_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract End Date"
              type="date"
              name="g_contract_end_date"
              value={formData.g_contract_end_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract Length (Months)"
              type="number"
              name="g_contract_length_months"
              value={formData.g_contract_length_months}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contract Back Date"
              type="date"
              name="g_contract_back_date"
              value={formData.g_contract_back_date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Reference"
              type="text"
              name="g_supplier_reference"
              value={formData.g_supplier_reference}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Information 1"
              type="text"
              name="g_supplier_information1"
              value={formData.g_supplier_information1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Information 2"
              type="text"
              name="g_supplier_information2"
              value={formData.g_supplier_information2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Information 3"
              type="text"
              name="g_supplier_information3"
              value={formData.g_supplier_information3}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography>
              Notice of termination for this contract sent by:
            </Typography>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.g_agent}
                      onChange={handleChange}
                      name="g_agent"
                    />
                  }
                  label="Agent"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.g_customer}
                      onChange={handleChange}
                      name="g_customer"
                    />
                  }
                  label="Customer"
                />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowUsageRatesForm((prev) => !prev)}
          >
            Usage and Rates
          </Button>
        </Box>
        {showUsageRatesForm && (
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Standing Charge (pence/day)"
                  name="stading_charge"
                  type="number"
                  value={formData.stading_charge}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Standing Charge Uplift(pence/day)"
                  name="standing_charge_uplift"
                  type="number"
                  value={formData.standing_charge_uplift}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Rate (pence/kwh)"
                  name="rate"
                  type="number"
                  value={formData.rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Unit Rate Uplift"
                  name="unit_rate_uplift"
                  type="number"
                  value={formData.unit_rate_uplift}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Annual Usage (KWH)"
                  name="annual_usage"
                  type="number"
                  value={formData.annual_usage}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Total Commission (£) : 0.00
                    </Typography>

                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography>
                      Annual Commission (£) : 0.00
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CurrentSupplyGas;
