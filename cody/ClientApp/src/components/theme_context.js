import React, { useState, useEffect } from 'react';
import { User } from 'src/lib/server_calls/user';
import { UserContext } from 'src/components/user_controller_context/user_controller_context'

export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeContextConsumer = ThemeContext.Consumer;

export function ThemeContextProvider(props){
  const userState = React.useContext(UserContext).userState;
  
  let currentTheme = localStorage.getItem("Cody-ThemeMode");
  if(currentTheme)
    currentTheme = currentTheme.toLowerCase();
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) 
    currentTheme = "dark"
  
  localStorage.setItem('Cody-ThemeMode', currentTheme); 
  const [theme, setTheme] = useState(currentTheme);

  useEffect( _ => {
    if (userState == "logged")
    {
      User.getThemeColor().then(themeColor => {
        if(themeColor)
        {
          currentTheme = themeColor.toLowerCase();
          setTheme(currentTheme.toLowerCase());  
          localStorage.setItem('Cody-ThemeMode', currentTheme);  
          loaderThemeSelection();
        }
      });
    }
  },[userState]);

  const toggleTheme = async (theme) => {
    currentTheme = 
      currentTheme == 'dark'? 
        'light' : 
        'dark'

    setTheme(currentTheme.toLowerCase());  

    if (userState == "logged")
      User.setThemeColor(currentTheme);

    localStorage.setItem('Cody-ThemeMode', currentTheme);  
    loaderThemeSelection();
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
  
function loaderThemeSelection()
{
  let root = document.documentElement;
  if(localStorage.getItem('Cody-ThemeMode') == 'dark')
  {
    root.style.setProperty('--ring-inner-color', "#131C2A");
    root.style.setProperty('--ring-outer-color', "#1F4BFF");
    root.style.setProperty('--background-color', "#172230");
  }

  if(localStorage.getItem('Cody-ThemeMode') == 'light')
  {
    root.style.setProperty('--ring-inner-color', "#f3f3f3");
    root.style.setProperty('--ring-outer-color', "#1F4BFF");
    root.style.setProperty('--background-color', "#f7f7f8");
  }
}