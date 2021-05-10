import React from "react";

import { areEqual } from 'react-window';

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
      textMaxWidth="calc(100% - 48px)"
      onClick={_ => onClick?.(data)}
      selected={isActive}
    />
  )
}, areEqual)