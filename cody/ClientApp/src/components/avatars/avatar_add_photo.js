import { AddPhotoOverlay } from 'src/components/images/add_photo_overlay/add_photo_overlay';
import { CustomAvatar } from 'src/components/avatars/custom_avatar';
import { useMobileView } from 'src/lib/hooks/use_mobile_view';

export function AvatarAddPhoto(props){
  const mobileView = useMobileView()

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
      >
        {` `}
      </CustomAvatar>
    </AddPhotoOverlay>
  )
}