import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/userDecisionSlice";
import type { LocationType } from "../../types/types";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Location() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<LocationType>('warsaw');

  const handleApply = () => {
    if (value) dispatch(setLocation(value));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Location</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <FormControl fullWidth>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            label="Location"
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value as LocationType)}
          >
            <MenuItem value={'sparec'}>SPAREC</MenuItem>
            <MenuItem value={'rusty'}>Rusty</MenuItem>
            <MenuItem value={'warsaw'}>Warsaw</MenuItem>
            <MenuItem value={'not-applicable'}>Not applicable</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleApply}>
          Apply
        </Button>
      </Stack>
    </Box>
  );
}

export default Location;