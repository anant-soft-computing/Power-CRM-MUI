import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function SiteReport() {
  return (
    <Card sx={{ width: "48%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Site Report
        </Typography>
        <Typography variant="body2">Site data goes here.</Typography>
      </CardContent>
    </Card>
  );
}

export default SiteReport;
