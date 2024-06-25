import React, { useState } from "react";
import { Typography, Box, Toolbar, Card, Container } from "@mui/material";
import QuotesDataTable from "../CompanyDashboard/Tabs/QuotesTable";
import GenerateQuote from "./GenerateQuote"


const QuoteList = (onCompanyClick) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleAddSite = (company) => {
        setSelectedCompany(company);
    };

    const handleEditCompany = (company) => {
        setSelectedCompany(company);
    };

    return (
        <Box >
            <Container
                component="main"
                sx={{
                    marginTop: 1,
                    width: "100%",
                }}
            >
                <Toolbar />
                <Typography variant="h5" gutterBottom>
                    Generate Quotes
                </Typography>

                <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
                    <Box >
                        <GenerateQuote />
                    </Box>
                </Card>

                <Card sx={{ p: 2, m: 1, boxShadow: 3 }} >
                    <QuotesDataTable
                        onCompanyClick={onCompanyClick}
                        onAddSite={handleAddSite}
                        onEditCompany={handleEditCompany}
                    />
                </Card>

            </Container>
        </Box >
    );
};

export default QuoteList;
