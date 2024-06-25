import React from "react";
import { Typography, Container } from "@mui/material";
import GenerateQuote from "./GenerateQuote";
import QuoteDataTable from "./QuoteDataTable";

const QuoteList = () => {
  return (
    <Container component="main" sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Generate Quotes
      </Typography>
      <GenerateQuote />
      <QuoteDataTable />
    </Container>
  );
};

export default QuoteList;
