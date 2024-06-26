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

const initialMDE = {
  e_mpan_topline: "",
  e_mpan_bottomline: "",
  e_meter_type: "",
  e_serial_number: "",
  e_capacity: "",
  e_voltage: 0,
  e_measurement_class: "",
  e_smart_meter: false,
  e_related_meter: false,
  e_ley_meter: false,
  e_green_deal: false,
};

const reducerMDE = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action.type === "reset") {
    return action.payload || initialMDE;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const MeterDetailElectricity = ({ EleDetails }) => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [meterElectricityData, dispatchMeterElectricityData] = useReducer(
    reducerMDE,
    initialMDE
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const resetReducerForm = () => {
    dispatchMeterElectricityData({
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
          const { pc, mtc, llf } = EleDetails;
          const mpanTopLine = `${pc}${mtc}${llf}`;

          dispatchMeterElectricityData({
            type: "reset",
            payload: {
              ...response.data,
              e_mpan_topline: mpanTopLine,
              e_mpan_bottomline: EleDetails?.mpan,
              e_meter_type: EleDetails?.meters[0]?.meterType || "",
              e_smart_meter: EleDetails?.meters[0]?.isSmart,
            },
          });
        } catch (error) {
          console.error("Error fetching note data:", error);
        }
      }
    })();
  }, [EleDetails, siteId]);

  const doMDE = async (e) => {
    e.preventDefault();
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: true,
    });
    let sendData = {
      e_mpan_topline: meterElectricityData.e_mpan_topline,
      e_mpan_bottomline: meterElectricityData.e_mpan_bottomline,
      e_meter_type: meterElectricityData.e_meter_type,
      e_serial_number: meterElectricityData.e_serial_number,
      e_capacity: meterElectricityData.e_capacity,
      e_voltage: meterElectricityData.e_voltage,
      e_measurement_class: meterElectricityData.e_measurement_class,
      e_smart_meter: meterElectricityData.e_smart_meter,
      e_related_meter: meterElectricityData.e_related_meter,
      e_ley_meter: meterElectricityData.e_ley_meter,
      e_green_deal: meterElectricityData.e_green_deal,
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
        toast.success("Meter Details For Electricity Edited Successfully");
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
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="MPAN Top Line"
              name="e_mpan_topline"
              type="text"
              value={meterElectricityData.e_mpan_topline}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_mpan_topline",
                  value: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="MPAN Bottom Line"
              name="e_mpan_bottomline"
              type="text"
              value={meterElectricityData.e_mpan_bottomline}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_mpan_bottomline",
                  value: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Meter Type"
              name="e_meter_type"
              type="text"
              value={meterElectricityData.e_meter_type}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_meter_type",
                  value: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Serial Number"
              type="text"
              name="e_serial_number"
              value={meterElectricityData.e_serial_number}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_serial_number",
                  value: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              label="Capacity (KVA)"
              name="e_capacity"
              value={meterElectricityData.e_capacity}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_capacity",
                  value: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Voltage"
              type="number"
              name="e_voltage"
              value={meterElectricityData.e_voltage}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_voltage",
                  value: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Measurement Class"
              type="text"
              name="e_measurement_class"
              value={meterElectricityData.e_measurement_class}
              onChange={(e) =>
                dispatchMeterElectricityData({
                  type: "e_measurement_class",
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
                      checked={meterElectricityData.e_smart_meter}
                      onChange={(e) =>
                        dispatchMeterElectricityData({
                          type: "e_smart_meter",
                          value: e.target.checked,
                        })
                      }
                      name="e_smart_meter"
                    />
                  }
                  label="Smart Meter (AMR)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={meterElectricityData.e_related_meter}
                      onChange={(e) =>
                        dispatchMeterElectricityData({
                          type: "e_related_meter",
                          value: e.target.checked,
                        })
                      }
                      name="e_related_meter"
                    />
                  }
                  label="Related Meter"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={meterElectricityData.e_ley_meter}
                      onChange={(e) =>
                        dispatchMeterElectricityData({
                          type: "e_ley_meter",
                          value: e.target.checked,
                        })
                      }
                      name="e_ley_meter"
                    />
                  }
                  label="Key Meter"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={meterElectricityData.e_green_deal}
                      onChange={(e) =>
                        dispatchMeterElectricityData({
                          type: "e_green_deal",
                          value: e.target.checked,
                        })
                      }
                      name="e_green_deal"
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
            onClick={doMDE}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MeterDetailElectricity;
