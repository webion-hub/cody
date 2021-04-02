import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';  
import { CssBaseline } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';

import { ThemeController } from "src/lib/default_values/themes/theme_controller";

import { CustomAppBar } from 'src/components/nav_menu/custom_appbar/custom_appbar';
import { CustomSideBarWithDrawer } from 'src/components/nav_menu/custom_sidebar/custom_sidebar_with_drawer';

import { appBarElements } from 'src/components/nav_menu/sections/appbar_elements';
import { useSideBarItems } from 'src/components/nav_menu/sections/sidebar_items/sidebar_items';

import { NavMenu } from 'src/components/nav_menu/nav_menu';

import { ThemeContext, ThemeContextProvider, ThemeContextConsumer } from 'src/components/theme_context';

const themeController = new ThemeController();


export function Layout(props){
  const sideBarItems = useSideBarItems()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? "dark" : "light";
  
  return (
    <ThemeContextProvider>
      <ThemeContextConsumer>
        {({theme, toggleTheme}) => (
          <MuiThemeProvider theme = {themeController.getTheme(theme)}>
            <CssBaseline />
            <NavMenu
              appBarElements={appBarElements}
              appBar={CustomAppBar}
              sideBarItems={sideBarItems}
              sideBar={CustomSideBarWithDrawer}
            >
              {props.children}
            </NavMenu>
          </MuiThemeProvider>
        )}
      </ThemeContextConsumer>
    </ThemeContextProvider>
  );
}