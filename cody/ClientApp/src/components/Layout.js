import React from 'react';
import { CustomizableMenu } from 'src/components/nav_menu/nav_menu';
import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "src/lib/default_values/themes/theme_controller";

import { CustomAppBar } from 'src/components/nav_menu/custom_appbar/custom_appbar';
import { CustomSideBar } from 'src/components/nav_menu/custom_sidebar/custom_sidebar';
import { CustomSideBarOnMobile } from 'src/components/nav_menu/custom_sidebar_on_mobile/custom_sidebar_on_mobile';

import { appBarElements } from 'src/components/nav_menu/sections/appbar_elements';
import { sideBarItems } from 'src/components/nav_menu/sections/sidebar_items/sidebar_items';

import { NavMenu } from 'src/components/nav_menu/nav_menu';

const themeController = new ThemeController();

export function Layout(props){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? "dark" : "light";

  return (
    <MuiThemeProvider theme = {themeController.getTheme(theme)}>
      <CssBaseline />
      <NavMenu
        appBarElements={appBarElements}
        appBar={CustomAppBar}
        sideBarItems={sideBarItems}
        sideBar={CustomSideBar}
        sideBarOnMobile={CustomSideBarOnMobile}
      >
        {props.children}
      </NavMenu>
    </MuiThemeProvider>        
  );
}
