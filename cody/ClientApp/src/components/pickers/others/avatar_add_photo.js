import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { AddPhotoOverlay } from 'src/components/pickers/others/add_photo_overlay';
import { CustomAvatar } from 'src/components/custom_avatar';

export function AvatarAddPhoto(props){
  const theme = useTheme();  
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const { alt, disableLoading, imageSize, ...other } = props
  const avatarSize = mobileView ? 75 : 100;

  return (
    <AddPhotoOverlay
      {...other}
    >
      <CustomAvatar
        disableLoading={disableLoading}
        alt={alt}
        size={imageSize ? imageSize : avatarSize}
      />
    </AddPhotoOverlay>
  )
}