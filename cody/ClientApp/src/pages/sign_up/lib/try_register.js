import { User } from 'src/lib/user';
import { ProfilePicture } from 'src/lib/profile_picture';

export const tryRegister = (settings) => {
  settings.onError({
    registerError: null,
    missingFields: null,
    imageUploadError: null,  
  })

  const data = settings.data;
  const registrationErrors = settings.registrationErrors;

  return new Promise(resolve => {
    User.tryRegister({
      user: data,

      onSuccess: _ => {
        settings.onSuccess()
        if (data.profileImage == null){            
          resolve(true)
        }
        else{
          ProfilePicture
            .createOrUpdate({
              base64: data.profileImage,
            })
            .then(_ => resolve(true))
            .catch(_ => {
              settings.onOpenAlert(true)
              settings.onError({
                ...registrationErrors,
                imageUploadError: "Prova a ricaricare l'immagine più tardi."
              })
              resolve(false)
            });
        }
      },
      onError: reasons => {
        settings.onOpenAlert(true)  
        settings.onError({
          ...registrationErrors,
          registerErrors: reasons
        })
        resolve(false)
      },
      onMissingFields: reasons => {
        settings.onOpenAlert(true)  
        settings.onError({
          ...registrationErrors,
          missingFields: "Manca data di nascita"
        })
        resolve(false)
      },
    })
  })
}