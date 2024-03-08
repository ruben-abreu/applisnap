import { useContext } from 'react';
import { FormControl, InputLabel, Input } from '@mui/material';
import { addRole } from '../api/role.api';
import { ThemeContext } from '../context/theme.context';

function AddRole({ roleName, setRoleName }) {
  const { formGreenStyle } = useContext(ThemeContext);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const requestBody = { roleName };
      await addRole(requestBody);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FormControl
        onSubmit={handleSubmit}
        fullWidth
        sx={{ ...formGreenStyle, my: 1 }}
      >
        <InputLabel htmlFor="roleName" label="Role">
          Role
        </InputLabel>
        <Input
          id="roleName"
          type="text"
          label="Role"
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
        />
      </FormControl>
    </div>
  );
}

export default AddRole;
