import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

function IsAnon(props) {
  const { loggedIn, loading } = useContext(AuthContext);

  if (loading) {
    <p>Loading...</p>;
  }

  if (loggedIn) {
    return <Navigate to={'/'} />;
  } else {
    return props.children;
  }
}

export default IsAnon;
