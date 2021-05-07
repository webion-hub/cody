import React from "react";

import { IconButton } from "@material-ui/core";
import { areEqual } from 'react-window';

import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import FullscreenExitRoundedIcon from '@material-ui/icons/FullscreenExitRounded';

import { UserListItem } from "./user_list_item";
import { ListActiveIdsContext } from "src/components/lists/list_with_active_ids";

export const UserListItemWithShowMore = React.memo((props) => {
  const {
    style,
    index,
    data,
    onClick,
  } = props

  const activeItems = React.useContext(ListActiveIdsContext)
  const userId = data?.id
  const isActive = activeItems[userId] ?? false

  return (
    <UserListItem
      key={index}
      style={style}
      data={data}
      secondaryAction={
        <IconButton
          onClick={_ => onClick?.(data)}
        >
          {
            isActive 
              ? <FullscreenExitRoundedIcon/> 
              : <FullscreenRoundedIcon/>
          }          
        </IconButton>
      }
    />
  )
}, areEqual)