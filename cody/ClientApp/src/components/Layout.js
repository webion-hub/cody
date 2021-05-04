import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';  
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeController } from "src/lib/default_values/themes/theme_controller";

import { CustomAppBar } from 'src/components/nav_menu/custom_appbar/custom_appbar';
import { CustomSideBarWithDrawer } from 'src/components/nav_menu/custom_sidebar/custom_sidebar_with_drawer';

import { appBarElements } from 'src/components/nav_menu/sections/appbar_elements';
import { useSideBarItems } from 'src/components/nav_menu/sections/sidebar_items/sidebar_items';

import { NavMenu } from 'src/components/nav_menu/nav_menu';

import { ThemeContextProvider, ThemeContextConsumer } from 'src/components/theme_context';

const themeController = new ThemeController();


export function Layout(props){
  const sideBarItems = useSideBarItems()
  
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