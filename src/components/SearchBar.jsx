import { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ searchedCompany }) {
  const [search, setSearch] = useState();

  const { formGreenStyle } = useContext(ThemeContext);

  const handleSearch = e => {
    setSearch(e.target.value);
    searchedCompany(e.target.value);
  };

  return (
    <div className={`text-center`}>
      <FormControl
        sx={{
          ...formGreenStyle,
        }}
      >
        <InputLabel
          htmlFor="outlined-adornment-amount"
          type="text"
          name="search"
          id="search"
        >
          Search Company
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Search Company"
          value={search}
          onChange={handleSearch}
          placeholder="Company Name"
        />
      </FormControl>
    </div>
  );
}

export default SearchBar;
