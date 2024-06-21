import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const Sidebar = ({ isOpen }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Box
            sx={{
                width: isOpen ? 230 : 0,
                flexShrink: 0,
                position: 'fixed',
                height: '100%',
                paddingTop: '64px',
                transition: 'width 0.3s',
                overflowX: 'hidden'
            }}
        >
            <List>
                <ListItem button key="Dashboard" onClick={() => handleNavigation('/')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem button key="Company" onClick={() => handleNavigation('/company')}>
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company" />
                </ListItem>

                <ListItem button key="Company" onClick={() => handleNavigation('/companyDashboard')}>
                    <ListItemIcon>
                        <SpaceDashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="CompanyDashboard" />
                </ListItem>

                <ListItem button key="Sites" onClick={() => handleNavigation('/sites')}>
                    <ListItemIcon>
                        <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sites" />
                </ListItem>

                <ListItem button key="Generate Quote" onClick={() => handleNavigation('/generate-quote')}>
                    <ListItemIcon>
                        <FormatQuoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Generate Quote" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
