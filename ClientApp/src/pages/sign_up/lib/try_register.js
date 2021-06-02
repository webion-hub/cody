import { User } from 'src/lib/server_calls/user';
import { ProfilePicture } from 'src/lib/server_calls/profile_picture';

const setUser = (data) => {
  return {
    username: data.username,
    password: data.password,
    email: data.email,
    accountDetail: {
      name: data.name,
      surname: data.surname,
      birthDate: data.birthDate,
    }
  } 
}

export const tryRegister = (settings) => {
  settings.onError({
    registerError: null,
    missingFields: null,
    imageUploadError: null,  
  })

  const data = setUser(settings.data);
  const registrationErrors = settings.registrationErrors;
  const profileImage = settings.profileImage;

  return new Promise(resolve => {
    User.tryRegister({
      user: data,

      onSuccess: async _ => {
        if (profileImage == null){            
          resolve(true)
        }
        else{
          await ProfilePicture
            .createOrUpdate({
              base64: profileImage,
            })
            .then(_ => resolve(true))
            .catch(_ => {
              settings.setOpenAlert(true)
              settings.onError({
                ...registrationErrors,
                imageUploadError: "Prova a ricaricare l'immagine più tardi."
              })
              resolve(false)
            });
        }
      },
      onError: reasons => {
        settings.setOpenAlert(true)  
        settings.onError({
          ...registrationErrors,
          registerErrors: reasons
        })
        resolve(false)
      },
      onMissingFields: reasons => {
        settings.setOpenAlert(true)  
        settings.onError({
          ...registrationErrors,
          missingFields: "Manca data di nascita"
        })
        resolve(false)
      },
    })
  })
}