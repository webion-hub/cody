import React, { useEffect } from 'react';

import { IconButton } from '@material-ui/core'

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

export function FavoriteIconButton(props) {
  const [isFavorite, setIsFavorite] = React.useState(props.isFavorite)

  const getIcon = (isFavorite) => {
    if(isFavorite) 
      return <FavoriteRoundedIcon/>
    else
      return <FavoriteBorderRoundedIcon/>
  }

  const handleIsFavorite = () => {
    setIsFavorite(isFavorite => !isFavorite)
  }

  useEffect(() => {
    props.onChange?.(isFavorite)
  }, [isFavorite])

  return (
    <IconButton
      color="secondary"
      onClick={handleIsFavorite}
    >
      {getIcon(isFavorite)}
    </IconButton>
  )
}