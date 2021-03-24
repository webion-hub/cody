import { onSuccessfullyLogged } from './on_successfully_logged'
import { User } from 'src/lib/user';

export const checkUserLogged = (settings) => {
  return new Promise(async resolve => {
    const onError = settings.onError;
    
    let logged = false;
    await User
      .isLogged()          
      .then((resp) => {
        logged = resp;
        if(resp)
          onSuccessfullyLogged(settings)
      })

    if(!logged)
      await User
        .tryLoginWithCookie({
          onSuccess: () => onSuccessfullyLogged(settings),
          onError: () => onError()
        })
    
    resolve()      
  })
}