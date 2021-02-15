import React, { useEffect, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';

import { CustomizableMenuContext } from 'src/components/nav_menu/customizable_menu';
import { SearchBar } from 'src/components/pickers/search_bar/search_bar';

import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

const searchbarStyles = makeStyles((theme) => ({
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
  const classes = searchbarStyles();
  const searchBarRef = useRef();
  
  const theme = useTheme();
  let media = theme.breakpoints.up('sm');
  media = media.replace('@media ','');

  const defaultHomeAppBar = () => {
    setFadeAppBarSection({
      left: false,
      center: false,
      right: true,
    });
  }
  const scrollHandler = _ => {
    const searchBarYPosition = searchBarRef.current.getBoundingClientRect().y;
    const notFadeOnBigScreen = !window.matchMedia(media).matches;

    if(searchBarYPosition < 5 && notFadeOnBigScreen){
      setFadeAppBarSection({
        left: true,
        center: true,
        right: true,
      });
    }
    else
      defaultHomeAppBar();
  };

  useEffect(() => {
    defaultHomeAppBar();

    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
      setFadeAppBarSection({
        left: true,
        center: true,
        right: true,
      });
    };
  }, []);

  return(
    <div 
      className={classes.searchBar} 
      ref={searchBarRef}
    >
      <SearchBar/>
    </div>
  );
}