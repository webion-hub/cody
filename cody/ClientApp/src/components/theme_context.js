import React, { useState, useEffect } from 'react';
import { User } from 'src/lib/server_calls/user';
import { UserContext } from 'src/components/user_controller_context/user_controller_context'

export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {},
});


class StoredTheme {
  static get = () => {
    return localStorage.getItem(this._key);
  }

  static set = (newTheme) => {
    localStorage.setItem(this._key, newTheme);
  }
}

StoredTheme._key = "Cody-ThemeMode";


export const ThemeContextConsumer = ThemeContext.Consumer;

export function ThemeContextProvider(props) {
  const initialTheme = getInitialTheme();
  StoredTheme.set(initialTheme);

  const {userState} = React.useContext(UserContext);
  const [theme, setTheme] = useState(initialTheme);

  
  /**
   * @param {'Dark' | 'Light'} newTheme 
   */
  const updateTheme = (newTheme) => {
    newTheme = newTheme.toLowerCase();

    setTheme(newTheme);
    StoredTheme.set(newTheme);
    window.dispatchEvent(new Event('themeUpdated'));
  };


  const maybeGetAndUpdateThemeFromDb = async () => {
    if (userState !== "logged")
      return;
    
    User.getThemeColor().then(themeColor => {
      if(themeColor)
        updateTheme(themeColor);
    });
  }

  useEffect(_ => {
    maybeGetAndUpdateThemeFromDb();
  }, [userState]);


  const toggleTheme = async _ => {
    const toggledTheme = StoredTheme.get() === 'dark'
      ? 'light'
      : 'dark';

    if (userState === "logged")
      User.setThemeColor(toggledTheme);

    updateTheme(toggledTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme,
      toggleTheme,
    }}>
      {props.children}
    </ThemeContext.Provider>
  );
}


function getInitialTheme() {
  const storedTheme = StoredTheme.get();
  if (storedTheme)
    return storedTheme;

  const prefersDarkTheme = 
    !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  
  return prefersDarkTheme
    ? 'dark'
    : 'light';
}