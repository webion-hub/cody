import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core'

import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import { User } from 'src/lib/server_calls/user';
import { UserOrganizationsController } from 'src/lib/user_organizations_controller';

export function BookmarkIconButton(props) {
  const {
    isBookmarked,
    id,
  } = props.organizationData

  const [isBookmarkedState, setIsBookmarkedState] = React.useState(isBookmarked)
  const [loading, setLoading] = React.useState(false)

  const getIcon = (isBookmarked) => {
    if(isBookmarked) 
      return <BookmarkRoundedIcon/>
    else
      return <BookmarkBorderRoundedIcon/>
  }

  const handleBookmarkClick = () => {
    setLoading(true)

    const newBookmarkValue = !isBookmarkedState
    const userAction = newBookmarkValue ? 
      User.addBookmarkedOrganization : User.removeBookmarkedOrganization

    userAction(id)
      .then(_ => {
        setIsBookmarkedState(newBookmarkValue)
        if(props.updateUserOrganizations)
          UserOrganizationsController.update()
      })
      .finally(_ => setLoading(false))
  }

  return (
    <IconButton
      className={props.className}
      disabled={props.disabled || loading}
      color="secondary"
      onClick={handleBookmarkClick}
    >
      {getIcon(isBookmarkedState)}
    </IconButton>
  )
}