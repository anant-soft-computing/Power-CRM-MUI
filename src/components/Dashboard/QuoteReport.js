import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function QuoteReport() {
  return (
    <Card sx={{ width: "48%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Quote Report
        </Typography>
        <Typography variant="body2">Quote data goes here.</Typography>
      </CardContent>
    </Card>
  );
}

export default QuoteReport;
