import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

const Sort = ({ sortBy, setSortBy }) => {
  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const { formGreenStyle, width, darkMode } = useContext(ThemeContext);

  return (
    <FormControl sx={{ ...formGreenStyle, minWidth: '105px' }}>
      <InputLabel htmlFor="sort" label="Sort by">
        Sort by
      </InputLabel>
      <Select
        id="sort"
        label="Sort by"
        value={sortBy}
        onChange={handleSortChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort By' }}
        sx={{
          fontSize: width < 450 ? '10px' : width < 600 ? '12px' : '14px',
          maxWidth: width < 450 ? '100px' : width < 600 ? '150px' : '300px',
        }}
      >
        <MenuItem value="starred">
          <StarRoundedIcon
            sx={{
              color: darkMode ? '#f9cc71' : '#e8a135',
              width: '20px',
              height: '20px',
            }}
          />
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
