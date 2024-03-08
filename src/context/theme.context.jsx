import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProviderWrapper = props => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem('darkMode') === 'true' ? true : false;
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = darkMode ? '#222' : '#fff';
    body.style.color = darkMode ? '#fff' : '#222';

    return () => {
      body.style.backgroundColor = '';
      body.style.color = '';
    };
  }, [darkMode]);

  const formGreenStyle = {
    '.MuiFormLabel-root': {
      color: darkMode ? 'white' : '#678B85',
    },
    '.MuiInputLabel-root': {
      color: darkMode ? 'white' : '#678B85',
    },
    '.MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      color: '#30b39a',
    },
    '.MuiInput-underline:after': {
      borderBottom: '2px solid #678B85',
    },
    '&:hover': {
      '.MuiInput-underline:after': {
        borderBottom: '2px solid #30b39a',
      },
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '&:focus': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '&:focus-visible': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '&:focus-within': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '&:active': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '&:target': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '&:visited': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#30b39a !important',
      },
      '.MuiSvgIcon-root ': {
        fill: '#30b39a !important',
      },
    },
    '.MuiInput-root': {
      '&.Mui-focused': {
        borderColor: '#30b39a',
      },
    },

    marginBottom: '15px',
  };

  const buttonGreenStyle = {
    boxShadow: 'none',
    textTransform: 'none',
    color: 'white',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#678B85',
    borderColor: '#678B85',

    '&:hover': {
      backgroundColor: '#62a699',
      borderColor: '#62a699',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#30b39a',
      borderColor: '#30b39a',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(55, 89, 84, 0.5)',
    },
  };

  const greenIconButtonStyle = {
    boxShadow: 'none',
    textTransform: 'none',
    color: darkMode ? 'white' : '#678B85',
    fontSize: 16,
    padding: '0',
    width: '20px',
    '&:hover': {
      color: darkMode ? 'white' : '#62a699',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '&:active': {
      color: darkMode ? 'white' : '#30b39a',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '&:focus': {
      color: darkMode ? 'white' : '#30b39a',
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  };

  const lightButtonNoBorder = {
    boxShadow: 'none',
    textTransform: 'none',
    color: 'black',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: 'white',
    borderColor: 'white',

    '&:hover': {
      color: 'white',
      backgroundColor: '#a9ccc6',
      borderColor: '#a9ccc6',
      boxShadow: 'none',
    },
    '&:active': {
      color: 'white',
      boxShadow: 'none',
      backgroundColor: '#7fb3aa',
      borderColor: '#7fb3aa',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(127, 179, 170, 0.5)',
    },
    '.css-1jhpmkz-MuiButtonBase-root-MuiButton-root:hover': {
      backgroundColor: 'none',
    },
  };

  const lightButtonStyle = {
    boxShadow: 'none',
    textTransform: 'none',
    color: darkMode ? 'white' : '#666666',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderColor: '#666666',
    lineHeight: 1.5,

    '&:hover': {
      color: 'white',
      backgroundColor: '#a9ccc6',
      borderColor: '#a9ccc6',
      boxShadow: 'none',
    },
    '&:active': {
      color: 'white',
      boxShadow: 'none',
      backgroundColor: '#7fb3aa',
      borderColor: '#7fb3aa',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(127, 179, 170, 0.5)',
    },
  };

  const yellowButtonStyle = {
    width: '100%',
    boxShadow: 'none',
    textTransform: 'none',
    color: '#ebb542',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    borderColor: '#ebb542',
    lineHeight: 1.5,

    '&:hover': {
      backgroundColor: '#faf1de',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#f2e0b8',
      borderColor: '#f2e0b8',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(235, 181, 66, 0.5)',
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        formGreenStyle,
        buttonGreenStyle,
        lightButtonNoBorder,
        lightButtonStyle,
        yellowButtonStyle,
        greenIconButtonStyle,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProviderWrapper };
