import React, { useEffect, useRef } from 'react';
import { useTheme } from '@material-ui/core/styles';

import { CustomizableMenuContext } from '../../../components/nav_menu/customizable_menu';
import { SearchBar } from '../../../components/search_bar/search_bar';

import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

const searchbarStyles = makeStyles((theme) => ({
  searchBar: {    
    display: "flex",
    justifyContent: "center",
    transform: "translate(0%, -50%)",
    [theme.breakpoints.up('sm')]: {
      position: "sticky",
      top: "32px",
      padding: "8px",
      zIndex: "1200",
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: "20px",
      marginRight: "20px"
    },
  },
}));

export function DynamicSearchBar(){
  const { setFadeAppBarSection } = React.useContext(CustomizableMenuContext);
  const classes = searchbarStyles();
  const searchBarRef = useRef();
  
  const theme = useTheme();
  let media = theme.breakpoints.up('md');
  media = media.replace('@media ','');

  const defaultHomeAppBar = () => {
    setFadeAppBarSection({
      left: true,
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