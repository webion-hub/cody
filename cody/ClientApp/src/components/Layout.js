import React from 'react';
import { CustomizableMenu } from 'src/components/nav_menu/customizable_menu';
import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "src/lib/default_values/themes/theme_controller";

const themeController = new ThemeController();

export function Layout(props){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? "dark" : "light";

  return (
    <MuiThemeProvider theme = {themeController.getTheme(theme)}>
      <CssBaseline />
      <CustomizableMenu>
        {props.children}
      </CustomizableMenu>
    </MuiThemeProvider>        
  );
}
