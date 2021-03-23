import React, { useLayoutEffect, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';

import { CustomizableMenuContext } from 'src/components/nav_menu/customizable_menu';
import { SearchBar } from 'src/components/pickers/search_bars/search_bar/search_bar';

import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

const useStyles = makeStyles((theme) => ({
  searchBar: {  
    [theme.breakpoints.up('sm')]: {
      position: "sticky",
      top: "32px",
      zIndex: "1200",
      maxWidth: 500,
      marginLeft: "50%",
      transform: "translate(-50%, -50%)",
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    },
  },
}));

export function DynamicSearchBar(){
  const { setFadeAppBarSection } = React.useContext(CustomizableMenuContext);
  const classes = useStyles();
  const searchBarRef = useRef();
  
  const theme = useTheme();
  let media = theme.breakpoints.up('sm');
  media = media.replace('@media ','');

  const setHomeAppBar = () => {
    setFadeAppBarSection({
      left: false,
      center: false,
      right: true,
    });
  }

  const scrollHandler = _ => {
    const searchBarYPosition = searchBarRef.current.getBoundingClientRect().y;
    const notFadeOnBigScreen = !window.matchMedia(media).matches;
    const showAppBarSearchBar = searchBarYPosition < 5 && notFadeOnBigScreen;

    if(showAppBarSearchBar){
      setFadeAppBarSection({
        left: true,
        center: true,
        right: true,
      });
    }
    else
      setHomeAppBar();
  };

  useLayoutEffect(() => {
    setHomeAppBar();

    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
      setFadeAppBarSection({
        left: true,
        center: true,
        right: true,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <div 
      className={classes.searchBar} 
      ref={searchBarRef}
    >
      <SearchBar
        disableTooltipsOnMobile
      />
    </div>
  );
}