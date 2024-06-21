import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { TextField, Box, IconButton, Tooltip } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const LOADataTable = ({ companyId, onEditLOA }) => {
  const [loas, setLOAs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredLOAs, setFilteredLOAs] = useState([]);

  useEffect(() => {
    axios.get(`/api/loas?companyId=${companyId}`)
      .then(response => {
        setLOAs(response.data);
        setFilteredLOAs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the LOAs!', error);
      });
  }, [companyId]);

  useEffect(() => {
    setFilteredLOAs(
      loas.filter(loa =>
        loa.loa_number.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, loas]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const columns = [
    { field: 'loa_number', headerName: 'LOA Number', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit LOA">
            <IconButton onClick={() => onEditLOA(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={filteredLOAs}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

function GridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default LOADataTable;
