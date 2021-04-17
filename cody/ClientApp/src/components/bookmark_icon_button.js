import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core'

import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import { User } from 'src/lib/server_calls/user';
import { UserOrganizationsController } from 'src/lib/user_organizations_controller';
import { useListener } from 'src/lib/hooks/use_listener';

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

        UserOrganizationsController 
          .setEvent('updateBookmarkedOrganizations')
          .update({state: newBookmarkValue, organizationId: id})
      })
      .finally(_ => setLoading(false))
  }

  const updateBookmarkState = (val) => {
    if(val.detail === null)
      return

    const {state, organizationId} = val.detail

    if(organizationId === id)
      setIsBookmarkedState(state)
  }

  useListener({
    removeFirstExecution: true,
		eventFunction: updateBookmarkState,
		controller: UserOrganizationsController.setEvent('updateBookmarkedOrganizations'),
	}, [isBookmarkedState])

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