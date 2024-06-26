import { Grid, TextField, Box, Switch, FormControlLabel, Button } from "@mui/material";
import React, { useState } from "react";


const initialState = {
  g_mpr: "",
  g_serial_number: "",
  g_smart_meter: false,
  g_igt_meter: false,
  g_green_deal: false,
};

const MeterDetailGas = () => {
  const [formData, setFormData] = useState(initialState);
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
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
              label="MRP"
              name="g_mpr"
              type="text"
              value={formData.g_mpr}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Serial Number"
              name="g_serial_number"
              type="text"
              value={formData.g_serial_number}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.g_smart_meter}
                      onChange={handleChange}
                      name="g_smart_meter"
                    />
                  }
                  label="Smart Meter (AMR)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.g_igt_meter}
                      onChange={handleChange}
                      name="g_igt_meter"
                    />
                  }
                  label="IGT Meter"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.g_green_deal}
                      onChange={handleChange}
                      name="g_green_deal"
                    />
                  }
                  label="Green Deal"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
  )
}

export default MeterDetailGas
