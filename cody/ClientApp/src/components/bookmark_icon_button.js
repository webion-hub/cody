import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core'

import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

export function BookmarkIconButton(props) {
  const [isBookmarked, setIsBookmarked] = React.useState(props.isBookmarked)

  const getIcon = (isBookmarked) => {
    if(isBookmarked) 
      return <BookmarkRoundedIcon/>
    else
      return <BookmarkBorderRoundedIcon/>
  }

  const handleIsBookmarked = () => {
    setIsBookmarked(!isBookmarked)
    props.onClick?.(!isBookmarked)
  }

  return (
    <IconButton
      disabled={props.disabled}
      color="secondary"
      onClick={handleIsBookmarked}
    >
      {getIcon(isBookmarked)}
    </IconButton>
  )
}