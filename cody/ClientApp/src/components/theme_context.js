import React, { useState, useEffect } from 'react';
import { User } from 'src/lib/user';

export const ThemeContext = React.createContext({
    state: 'dark',
    toggleTheme: () => {},
  });
  
export const ThemeContextConsumer = ThemeContext.Consumer;
  
export function ThemeContextProvider(props){
  const [state, setState] = useState('dark');
  let currentTheme = localStorage.getItem("Cody-ThemeMode");
  let value;

  useEffect( _ => {
    if(localStorage.getItem("Cody-ThemeMode"))
      currentTheme = localStorage.getItem("Cody-ThemeMode").toLowerCase();
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) 
      currentTheme = "dark"

    localStorage.setItem('Cody-ThemeMode', currentTheme); 
    
    User.isLogged().then(isLogged => {
      if (!isLogged)
      return;
      
      User.getThemeColor().then(themeColor => {
        if(themeColor)
        {
          currentTheme = themeColor;
          setState(currentTheme.toLowerCase());  
          localStorage.setItem('Cody-ThemeMode', currentTheme);  
          loaderThemeSelection();
        }
      });
    });
  },[]);

  const toggleTheme = async (state) => {
    currentTheme = 
      currentTheme == 'dark'? 
        'light' : 
        'dark'

    setState(currentTheme.toLowerCase());  

    User.isLogged().then(isLogged => {
        User.setThemeColor(currentTheme);
    });

    localStorage.setItem('Cody-ThemeMode', currentTheme);  
    loaderThemeSelection();
  };
    
  
  value = { 
    state,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={{ 
      state,
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