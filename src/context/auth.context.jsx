import { createContext, useState, useEffect } from 'react';
import { verify, getUserDetails } from '../api/auth.api';

const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const storeUserId = userId => {
    localStorage.setItem('userId', userId);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      try {
        const response = await verify(storedToken);

        const userDetails = await getUserDetails(response.data._id);

        setUser(userDetails.data);

        setLoggedIn(true);
      } catch (error) {
        console.log('Error authenticating user', error);
        setUser(null);
        removeToken();
        setLoggedIn(false);
      }
    } else {
      setUser(null);
      setLoggedIn(false);
    }

    setLoading(false);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('boardId');
  };

  const logoutUser = () => {
    removeToken();
    authenticateUser();
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        loggedIn,
        user,
        storeToken,
        storeUserId,
        removeToken,
        authenticateUser,
        logoutUser,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
