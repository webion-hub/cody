import React from "react";
import { ButtonBase, Menu } from "@material-ui/core";
import { CustomAvatar } from "src/components/avatars/custom_avatar";
import { makeStyles } from '@material-ui/core/styles';
import { useBackgroundWaves } from "src/lib/hooks/use_background_waves";
import { useMenu } from "src/lib/hooks/use_menu";

const useStyles = makeStyles((theme) => ({
  menu: {
    padding: 0,
  },
}));

export function AvatarWithMenu(props){
	const classes = useStyles();
  const classWithWaves = useBackgroundWaves()
  const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
  } = useMenu()

  const {
    onClick,
    buttonClassName,
    children,
    placement,
    style,
    menuContent,
    onMenuOpen,
    onMenuClose,
    ...otherProps
  } = props

  const handleClick = (e) => {
    onMenuOpen?.()
    onClick?.(e)
    handleOpenMenu(e)
  }
  
  const handleClose = () => {
    onMenuClose?.()
    handleCloseMenu()
  }

  return (
    <>
      <ButtonBase
        onClick={handleClick}
        className={buttonClassName}
        style={style}
      >
        <CustomAvatar
          disableLoadingRing
          {...otherProps}
        >
          {children}
        </CustomAvatar>
      </ButtonBase>
      {
        menuContent &&
          <Menu
            MenuListProps={{
              className: `${classes.menu} ${classWithWaves}`
            }}
            anchorEl={isMenuOpen}
            open={Boolean(isMenuOpen)}
            onClose={handleClose}
          >
            {menuContent}
          </Menu>
      }
    </>
  )
}

AvatarWithMenu.defaultProps = {
  placement: "bottom"
}