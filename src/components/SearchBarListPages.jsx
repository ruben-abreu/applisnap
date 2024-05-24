import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ searchedJob }) {
  const [search, setSearch] = useState('');

  const { formGreenStyle, width } = useContext(ThemeContext);

  const handleSearch = e => {
    setSearch(e.target.value);
    searchedJob(e.target.value);
  };

  const handleClear = () => {
    setSearch('');
    searchedJob('');
  };

  return (
    <div className={`text-center`}>
      <FormControl
        sx={{
          ...formGreenStyle,
          fontSize: width < 450 ? '10px' : width < 600 ? '12px' : '14px',
          maxWidth: width < 450 ? '200px' : width < 600 ? '250px' : '300px',
        }}
      >
        <InputLabel
          htmlFor="outlined-adornment-amount"
          label="Search"
          type="text"
          name="search"
          id="search"
          sx={{
            fontSize: width < 450 ? '12px' : width < 600 ? '14px' : '16px',
          }}
        >
          Search
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {search && (
                <button onClick={handleClear}>
                  <ClearIcon />
                </button>
              )}
            </InputAdornment>
          }
          label="Search"
          value={search}
          onChange={handleSearch}
          placeholder="Company Name/Role"
          sx={{
            fontSize: width < 450 ? '10px' : width < 600 ? '12px' : '14px',
          }}
        />
      </FormControl>
    </div>
  );
}

export default SearchBar;
