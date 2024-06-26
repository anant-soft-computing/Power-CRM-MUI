import {
  Grid,
  TextField,
  Box,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const initialsMDG = {
  g_mpr: "",
  g_serial_number: "",
  g_smart_meter: false,
  g_igt_meter: false,
  g_green_deal: false,
};

const reducerMDG = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialsMDG;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const MeterDetailGas = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [meterGasData, dispatchMeterGasData] = useReducer(
    reducerMDG,
    initialsMDG
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const resetReducerForm = () => {
    dispatchMeterGasData({
      type: "reset",
    });
  };

  useEffect(() => {
    (async () => {
      if (siteId) {
        try {
          const response = await ajaxCall(
            `supply/meter-detail/${siteId}/`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
                }`,
              },
              method: "GET",
            },
            8000
          );
          dispatchMeterGasData({ type: "reset", payload: response.data });
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [siteId]);

  const doMDG = async (e) => {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      g_mpr: meterGasData.g_mpr,
      g_serial_number: meterGasData.g_serial_number,
      g_smart_meter: meterGasData.g_smart_meter,
      g_igt_meter: meterGasData.g_igt_meter,
      g_green_deal: meterGasData.g_green_deal,
    };
    try {
      const response = await ajaxCall(
        `supply/meter-detail/${siteId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "PATCH",
          body: JSON.stringify(sendData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        navigate("/sites");
        resetReducerForm();
        toast.success("Meter Details For GAS Edited Successfully");
      } else if ([400, 404, 401].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    } finally {
      setFormStatus({
        ...formStatus,
        isSubmitting: false,
      });
    }
  };

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="MRP"
            name="g_mpr"
            type="text"
            value={meterGasData.g_mpr}
            onChange={(e) =>
              dispatchMeterGasData({
                type: "g_mpr",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Serial Number"
            name="g_serial_number"
            type="text"
            value={meterGasData.g_serial_number}
            onChange={(e) =>
              dispatchMeterGasData({
                type: "g_serial_number",
                value: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={meterGasData.g_smart_meter}
                    onChange={(e) => {
                      dispatchMeterGasData({
                        type: "g_smart_meter",
                        value: e.target.checked,
                      });
                    }}
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
                    checked={meterGasData.g_igt_meter}
                    onChange={(e) => {
                      dispatchMeterGasData({
                        type: "g_igt_meter",
                        value: e.target.checked,
                      });
                    }}
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
                    checked={meterGasData.g_green_deal}
                    onChange={(e) => {
                      dispatchMeterGasData({
                        type: "g_green_deal",
                        value: e.target.checked,
                      });
                    }}
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
          onClick={doMDG}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MeterDetailGas;
