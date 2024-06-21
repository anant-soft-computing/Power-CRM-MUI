import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Toolbar, Card, Container, Tabs, Tab } from "@mui/material";
import SiteDataTable from './Tabs/SiteTable';
import QuotesDataTable from './Tabs/QuotesTable';
import LOADataTable from './Tabs/LoaTable';


const CompanyDashboard = () => {
    const { companyId } = useParams();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleEditSite = (site) => {
        console.log('Edit site', site);
    };

    const handleCreateQuote = (site) => {
        console.log('Create quote for site', site);
    };

    const handleEditQuote = (quote) => {
        console.log('Edit quote', quote);
    };

    const handleEditLOA = (loa) => {
        console.log('Edit LOA', loa);
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
                    Company Dashboard
                </Typography>

                <Card sx={{ p: 2, m: 1, boxShadow: 3 }}>
                    <Box >
                        <Tabs value={value} onChange={handleChange} aria-label="company dashboard tabs">
                            <Tab label="Site" />
                            <Tab label="Quotes" />
                            <Tab label="LOA" />
                        </Tabs>

                        <Box sx={{ mt: 2 }}>
                            {value === 0 && <SiteDataTable companyId={companyId} onEditSite={handleEditSite} onCreateQuote={handleCreateQuote} />}
                            {value === 1 && <QuotesDataTable companyId={companyId} onEditQuote={handleEditQuote} />}
                            {value === 2 && <LOADataTable companyId={companyId} onEditLOA={handleEditLOA} />}
                        </Box>
                    </Box>
                </Card>
            </Container>
        </Box >

    );
};

export default CompanyDashboard;
