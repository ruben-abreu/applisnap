import { FormControl, Select, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';

const Sort = ({ sortBy, setSortBy }) => {
  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const { formGreenStyle, width } = useContext(ThemeContext);

  return (
    <FormControl sx={{ ...formGreenStyle }}>
      <Select
        value={sortBy}
        onChange={handleSortChange}
        labelId="sort-by-label"
        id="sort-by"
        displayEmpty
        sx={{
          fontSize: width < 450 ? '10px' : width < 600 ? '12px' : '14px',
          maxWidth: width < 450 ? '100px' : width < 600 ? '150px' : '300px',
        }}
      >
        <MenuItem value="" disabled>
          Sort by
        </MenuItem>
        <MenuItem value="asc">A-Z</MenuItem>
        <MenuItem value="desc">Z-A</MenuItem>
        <MenuItem value="dateAsc">Oldest</MenuItem>
        <MenuItem value="dateDesc">Newest</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
