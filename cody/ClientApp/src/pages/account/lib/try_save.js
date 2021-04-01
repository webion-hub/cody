import { AccountErrorsController } from './account_errors_controller';

import { ProfilePicture } from 'src/lib/server_calls/profile_picture'
import { UserAccountInfo } from 'src/lib/server_calls/user_account_info'

import { PageController } from 'src/lib/page_controller';

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
      .set('school', data.school? data.school.id : null)
      .set('role', data.role)
      .set('biography', data.biography)
    .send()
}


export const trySave = (settings) => {
  return new Promise(async resolve  => {
    const errorsController = new AccountErrorsController();

    const {
      onError,
      onSavingErrors,
      data,
      oldData,
      image,
      oldImage,
    } = settings;

    await errorsController
      .checkAll(data, oldData)
      .then(async results => {
        let errors = {};
        results.forEach(result => {
          errors[result] = true;
        });

        const areErrors = !errors.noError;
        if(areErrors){
          onError()
          return;
        }

        await saveData(data)
          .then(async (res) => {
            const areSavingErrors = res.set.length !== 0
            if(areSavingErrors)
              onSavingErrors(res.set)
            else
              await handleSaveImage(image, oldImage)
          })        
      })

    resolve();
  })
}