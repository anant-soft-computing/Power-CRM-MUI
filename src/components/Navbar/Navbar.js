import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

const Navbar = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: theme.palette.primary.dark,
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap>
                    POWER CRM
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
