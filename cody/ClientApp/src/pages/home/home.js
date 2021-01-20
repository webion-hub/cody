import React, { useEffect } from 'react';

import { CustomizableMenuContext } from '../../components/nav_menu/customizable_menu';
import { SearchBar } from '../../components/search_bar/search_bar';
import { Images } from '../../lib/default_values/images';
import { MainTextBox } from './home_components/main_text_box';

import { makeStyles } from '@material-ui/core/styles';

export const fullDrawerWidth = 240;
export const restrictedWidth = 48;

const sidebarStyles = makeStyles((theme) => ({
  searchBar: {    
    display: "flex",
    justifyContent: "center",
    transform: "translate(0%, -50%)",
    [theme.breakpoints.up('sm')]: {
      position: "sticky",
      top: "31px",
      padding: "8px",
      zIndex: "1200",
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: "20px",
      marginRight: "20px"
    },
  },
  background: {
    position: "absolute",
    left: 0,   
    top: 0,
    height: "100%",
    minWidth: "100%",
    backgroundImage: `url(${Images.wavesImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center bottom",
    backgroundSize: "cover",
    zIndex: "-1",
    [theme.breakpoints.up('sm')]: {
      maxHeight: "80vh",
    },
    [theme.breakpoints.down('sm')]: {
      maxHeight: "60vh",
    },
  },
}));

export function Home(){
  const { customMenuSection, setCustomMenuSection } = React.useContext(CustomizableMenuContext);
  const classes = sidebarStyles();

  useEffect(() => {
    setCustomMenuSection({
      appBar: {
        left: null,
        center: <div></div>,
        right: null,
      },
      sideBar: null,
    });
  }, []);

  return(
    <div
      style={{
        minHeight: "200vh"
      }}
    >
      <MainTextBox/>
      <div className={classes.searchBar} >
        <SearchBar/>
      </div>
      <div className={classes.background}/>    
    </div>
  );
}