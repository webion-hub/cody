import React, { useLayoutEffect, useRef } from 'react';
import useTheme from '@material-ui/styles/useTheme';

import { FadeAppBarContext } from 'src/components/nav_menu/custom_appbar/custom_appbar';
import { SearchBar } from 'src/components/pickers/search_bars/search_bar/search_bar';

import makeStyles from '@material-ui/core/styles/makeStyles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

const useStyles = makeStyles((theme) => ({
  searchBar: {  
    [theme.breakpoints.up('sm')]: {
      position: "sticky",
      top: "32px",
      zIndex: 1220,
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
  const { setFadeInAppBar } = React.useContext(FadeAppBarContext);
  const classes = useStyles();
  const searchBarRef = useRef();
  
  const theme = useTheme();
  let media = theme.breakpoints.up('sm');
  media = media.replace('@media ','');

  const setHomeAppBar = () => {
    setFadeInAppBar({
      left: true,
      center: false,
      right: true,
    });
  }

  const scrollHandler = _ => {
    const searchBarYPosition = searchBarRef.current.getBoundingClientRect().y;
    const notFadeOnBigScreen = !window.matchMedia(media).matches;
    const showAppBarSearchBar = searchBarYPosition < 5 && notFadeOnBigScreen;

    if(showAppBarSearchBar){
      setFadeInAppBar({
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
      setFadeInAppBar({
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