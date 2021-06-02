import React from "react";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (e) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget);
  }
  
  const handleCloseMenu = (e) => {
    e?.stopPropagation()
    setAnchorEl(null)
  }

  return {
    handleOpenMenu: handleOpenMenu,
    handleCloseMenu: handleCloseMenu,
    anchor: anchorEl,
    isMenuOpen: Boolean(anchorEl),
  }
}