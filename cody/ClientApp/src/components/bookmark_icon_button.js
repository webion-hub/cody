import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core'

import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';

export function BookmarkIconButton(props) {
  const [isSaved, setIsSaved] = React.useState(props.isFavorite)

  const getIcon = (isSaved) => {
    if(isSaved) 
      return <BookmarkRoundedIcon/>
    else
      return <BookmarkBorderRoundedIcon/>
  }

  const handleIsSaved = () => {
    setIsSaved(isSaved => !isSaved)
  }

  useEffect(() => {
    props.onChange?.(isSaved)
  }, [isSaved])

  return (
    <IconButton
      color="secondary"
      onClick={handleIsSaved}
    >
      {getIcon(isSaved)}
    </IconButton>
  )
}