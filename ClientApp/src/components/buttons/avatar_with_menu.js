import { ButtonBase, Menu } from "@material-ui/core";
import { CustomAvatar } from "src/components/avatars/custom_avatar";
import { useMenu } from "src/lib/hooks/use_menu";
import { MenuWithWaves } from "../menu/menus/menu_with_waves";

export function AvatarWithMenu(props){
  const {
    handleOpenMenu,
    handleCloseMenu,
    isMenuOpen,
    anchor
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
          <MenuWithWaves
            anchorEl={anchor}
            open={isMenuOpen}
            onClose={handleClose}
          >
            {menuContent}
          </MenuWithWaves>
      }
    </>
  )
}

AvatarWithMenu.defaultProps = {
  placement: "bottom"
}