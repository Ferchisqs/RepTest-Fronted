import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import '../css/menu.css'


// ----------------------------------------------------------------------

PostSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function PostSort({ options, onSort }) {
  return (
    <TextField select size="small" value="latest" onChange={onSort} className='lastest'>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
