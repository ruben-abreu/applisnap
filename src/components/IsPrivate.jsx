import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

function IsPrivate(props) {
  const { loggedIn, loading } = useContext(AuthContext);

  if (loading) {
    <p>Loading...</p>;
  }

  if (!loggedIn) {
    alert('Please log in to view this page');
    return <Navigate to={'/'} />;
  } else {
    return props.children;
  }
}

export default IsPrivate;
