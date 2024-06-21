import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import SiteDataTable from './SiteDataTable';
import QuotesDataTable from './QuotesDataTable';
import LOADataTable from './LOADataTable';

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
        <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Company Dashboard</Typography>
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
        </Paper>
    );
};

export default CompanyDashboard;
