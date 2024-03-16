import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';

const Sort = ({ sortBy, setSortBy }) => {
  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const { formGreenStyle } = useContext(ThemeContext);

  return (
    <FormControl
      sx={{
        ...formGreenStyle,
      }}
    >
      <InputLabel htmlFor='sort-by' label='sort-by'>
        Sort
      </InputLabel>
      <Select
        value={sortBy}
        onChange={handleSortChange}
        label='Sort by'
        id='sort-by'
        type='text'
        displayEmpty
        className='w-42 md:w-50 lg:w-60'
        MenuProps={{
          PaperProps: {
            className: 'mt-1.5',
          },
        }}
        inputProps={{ 'aria-label': 'Sort By' }}
      >
        <MenuItem value='asc'>A-Z</MenuItem>
        <MenuItem value='desc'>Z-A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
