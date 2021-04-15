import React from "react";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }
  
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return {
    handleOpenMenu: handleOpenMenu,
    handleCloseMenu: handleCloseMenu,
    isMenuOpen: anchorEl,
  }
}