import { FormControl, InputLabel, Input } from '@mui/material';
import { addRole } from '../api/role.api';

function AddRole({ roleName, setRoleName, greenStyle }) {
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
        sx={{ ...greenStyle, my: 1 }}
      >
        <InputLabel htmlFor='roleName'>Role</InputLabel>
        <Input
          id='roleName'
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
        />
      </FormControl>
    </div>
  );
}

export default AddRole;
