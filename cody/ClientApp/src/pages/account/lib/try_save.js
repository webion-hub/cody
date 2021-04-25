import { ProfilePicture } from 'src/lib/server_calls/profile_picture'
import { UserAccountInfo } from 'src/lib/server_calls/user_account_info'

import { PageController } from 'src/lib/page_controller';
import { FormatController } from 'src/lib/format_controller/format_controller';

const refreshPage = () => {
  PageController.refresh()
}

const updateProfilePic  = (image) => {
  ProfilePicture
    .createOrUpdate({
      base64: image,
    })
    .finally(() => refreshPage());
}

const deleteProfilePic  = () => {
  ProfilePicture
    .delete()
    .finally(() => refreshPage())
}

const handleSaveImage = (image, oldImage) => {
  const isImageChanged = image !== oldImage;
  const isImageDeleted = image === null;
  const isImageChangeButNotDeleted =  isImageChanged && !isImageDeleted;

  if(isImageChangeButNotDeleted)
    updateProfilePic(image)
  else if(isImageDeleted)
    deleteProfilePic()
  else
    refreshPage()
}

const saveData = (data) => {
  return  UserAccountInfo
    .createRequest()
      .set('username', data.username)
      .set('name', data.name)
      .set('surname', data.surname)
      .set('email', data.email)
      .set('birthDate', data.birthDate)
      .set('biography', data.biography)
    .send()
}

export const trySave = (settings) => {
  return new Promise(resolve  => {
    const {
      onError,
      onSavingErrors,
      data,
      oldData,
      image,
      oldImage,
    } = settings;

    FormatController
      .setController()
        .add('email',     data.email === oldData.email)
        .add('username',  data.username === oldData.username)
        .add('name',      data.name === oldData.name)
        .add('surname',   data.surname === oldData.surname)
        .add('birthDate', data.birthDate === oldData.birthDate)
      .checkAll({
        values: data,
        onErrors: onError,
        onNoErrors: async _ => {
          onError({})
          await saveData(data)
          .then(async (res) => {
            const areSavingErrors = res.set.length !== 0
            if(areSavingErrors)
              onSavingErrors(res.set)
            else
              await handleSaveImage(image, oldImage)
          })  
        }
      })
      .finally(resolve)
  })
}