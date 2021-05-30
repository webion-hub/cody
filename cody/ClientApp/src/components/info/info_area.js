import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

import { useMobileView } from "src/lib/hooks/use_mobile_view";
import { ShowableDescription } from "src/components/showable_description/showable_description";
import { DynamicAvatarGroup } from "src/components/dynamic_avatar_group";
import { InfoBox } from "./info_box";

const useStyles = makeStyles((theme) => ({
  infoContainer: {
    background: theme.palette.background[650],
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  infoList: {
    minHeight: 150,
    width: "auto",
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingTop: theme.spacing(2),
    },
  },
  infoBox:{
    display: "grid",
    marginLeft: theme.spacing(3),
    tableLayout: "fixed",
    width: `calc(100% - 198px)`,
    transition: "0.25s all",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      textAlign: "center",
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },
  rightMenu: {
    position: "absolute",
    right: 8
  }
}));

export default function InfoArea(props){
  const mobileView = useMobileView()
	const classes = useStyles();
  
  const {
    data,
    loading,
    button,
    leftIcon,
    callerIs,
    smallUserList,
    handler,
    rightMenu,
    onUserUpdate,
    avatar
  } = props

  const {
    title,
    subTitle,
    verified,
    description,
    website
  } = data

  const getComponent = (component, className) => {
    if(!component)
      return;

    return React.Children.map(component, child =>
      React.cloneElement(child, { className: className }),
    );
  }
  
  const rightMenuWithProps = 
    getComponent(rightMenu, classes.rightMenu)

  return (
    <>
			<div className={classes.infoContainer}>
				<Grid
          className={classes.infoList}
          style={{position: "relative"}}
					container
					direction={mobileView ? "column" : "row"}
          alignItems="center"
				>
          {avatar}					
          <InfoBox
            className={classes.infoBox}
            title={title}
            subTitle={subTitle}
            verified={verified}
            loading={loading}
            button={button}
            leftIcon={leftIcon}
          />
          {
            smallUserList &&
              <DynamicAvatarGroup
                smallUserList={smallUserList}
                callerIs={callerIs}
                handler={handler}
                loading={loading}
                onUserUpdate={onUserUpdate}
              />
          }
				</Grid>
        <ShowableDescription
          disabled={loading}
          description={description}
          website={website}
          rightMenu={rightMenuWithProps}
        />
			</div>
    </>
  );
}