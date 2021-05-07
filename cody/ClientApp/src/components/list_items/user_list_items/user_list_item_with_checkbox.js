import React from "react";

import { Checkbox } from "@material-ui/core";
import { areEqual } from 'react-window';

import { UserListItem } from "./user_list_item";
import { ListActiveIdsContext } from "src/components/lists/list_with_active_ids";

export const UserListItemWithCheckBox = React.memo((props) => {
  const {
    style,
    index,
    data,
    onClick,
  } = props

  const activeItems = React.useContext(ListActiveIdsContext)
  const userId = data?.id

  return (
    <UserListItem
      key={index}
      style={style}
      data={data}
      secondaryAction={
        <Checkbox
          checked={activeItems[userId] ?? false}
          onClick={_ => onClick?.(data)}
        />
      }
    />
  )
}, areEqual)