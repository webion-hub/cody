import { Menu } from '@material-ui/core'

import { Link } from "@material-ui/core";
import { useMenu } from 'src/lib/hooks/use_menu';

export function LinkMenu(props){
  const menu = useMenu()
  const {
    children,
    menuContent,
    MenuComponent
  } = props

  return (
    <>
      <Link 
        color="inherit" 
        component="button" 
        onClick={e => {
          e.stopPropagation()
          menu.handleOpenMenu(e)
        }}
      >
        {children}
      </Link>
      <MenuComponent
        id="simple-menu"
        anchorEl={menu.anchor}
        keepMounted
        open={menu.isMenuOpen}
        onClose={menu.handleCloseMenu}
      >
        {menuContent}
      </MenuComponent>
    </>
  )
}

LinkMenu.defaultProps = {
  MenuComponent: Menu
}