import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Button, Divider } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import { PageController } from 'src/lib/page_controller';
import { DialogBase } from 'src/components/bases/dialog_base';

const useStyles = makeStyles((theme) => ({
  dialog: {
    [theme.breakpoints.down('xs')]: {
      width: "80vw"
    },
  }
}));

export function CustomSideBarOnMobile(props){
  const classes = useStyles();
  const theme = useTheme();
  const sideBarItems = props.sideBarItems;
  const [dialogContet, setDialogContet] = React.useState("")

  const handleOnClick = (element) => (event) => {
    props.onCloseMobileDrawer()
    if(element.href !== undefined){
      PageController.push(element.href, event)
      return;
    }

    setDialogContet(element.identifier);    
  }

	const getDrawerContent = () => {
		const findedElement = sideBarItems.find(element => {
			const drawerContentIdentifier = dialogContet;
			return element.identifier === drawerContentIdentifier
		});

		if(findedElement === undefined)
			return null;
		
		return findedElement.drawerContent;
	}

  return (
    <>
      <SwipeableDrawer
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={props.openMobileDrawer}
        onOpen={props.onOpenMobileDrawer}
        onClose={props.onCloseMobileDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List>
          {sideBarItems.map((element, index) => {
					  const isHidden = element.skipOnMobile || element.hideWhen
            if(isHidden)
              return;
            return (
              <>
                <ListItem 
                  key={index}
                  button
                  onClick={handleOnClick(element)}  
                >
                  <ListItemIcon>
                    {element.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {element.label}
                  </ListItemText>
                </ListItem>
                <Divider/>
              </>
            )
          })}
        </List>
      </SwipeableDrawer>
      {props.children}
      <DialogBase
        className={classes.dialog}
        open={dialogContet !== ""}
        onClose={() => setDialogContet("")}
        firstButton={
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogContet("")}
          >
            Chiudi
          </Button>
        }
      > 
        {getDrawerContent()}
      </DialogBase>
    </>

  )
}