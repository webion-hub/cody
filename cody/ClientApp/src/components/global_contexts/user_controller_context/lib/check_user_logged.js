import { User } from 'src/lib/server_calls/user';

export const checkUserLogged = (settings) => {
  return new Promise(async resolve => {
    const onError = settings.onError;
    const onSuccess = settings.onSuccess;
    
    let logged = false;
    await User
      .isLogged()          
      .then((resp) => {
        logged = resp;
        if(resp)
          onSuccess()
      })
      .catch(() => onError())

    if(!logged)
      await User
        .tryLoginWithCookie({
          onSuccess: () => onSuccess(),
          onError: () => onError()
        })
        .catch(() => onError())
    
    resolve()      
  })
}