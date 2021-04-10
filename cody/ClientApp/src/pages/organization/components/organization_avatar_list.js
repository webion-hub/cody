import React, { useLayoutEffect } from "react";
import { ListItem, ListItemAvatar, ListItemText, useTheme } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { CustomAvatar } from "src/components/custom_avatar";
import { ListWithSearch } from "src/components/list_with_search/list_with_search";
import { useGetSize } from "src/lib/hooks/use_get_size";

export const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    tableLayout: "fixed",
  }
}));

export default function OrganizationAvatarList(props){
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const windowHeight = useGetSize(window).height;
  const [scrollPos, setScrollPos] = React.useState(window.scrollY);

  const appBarHeight = mobileView 
    ? theme.appBar.mobileHeight 
    : theme.appBar.fullHeight

  const updateScroll = () => {
    const scrollY = window.scrollY;

    if(scrollY < 192)
      setScrollPos(window.scrollY)
    else
      setScrollPos(192)
  } 

  useLayoutEffect(() => {
    window.addEventListener("scroll", updateScroll);
    updateScroll()
    return () => window.removeEventListener("scroll", updateScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userListHeight = windowHeight - 272 - appBarHeight + scrollPos
  const organization = props.organization

  return (
    <ListWithSearch
      className={props.className}
      listHeight={userListHeight}
      listMobileHeight={userListHeight}
      width="calc(100% - 8px)"
      elementForStep={25}
      itemSize={56}
      getList={organization.getMembersOf}
      listItem={AvatarListItem}
      noDataFoundProps={{
        hide: true,
      }}
    />
  );
}

function AvatarListItem(props){
	const classes = useStyles();

  return (
    <div style={props.style} key={props.index}>
      <ListItem 
        className={classes.listItem}
        ContainerComponent="div" 
        button
      >
        <ListItemAvatar>
          <CustomAvatar
            src={`user/${props.index}/profile_picture`}
            alt={props.data?.username}
            disableLoading
          />
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{
            noWrap: true
          }}
        >
          {props.data?.username}
        </ListItemText>
      </ListItem>
    </div>
  )
}