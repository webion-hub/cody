import { User } from 'src/lib/user';

export const checkUserLogged = (settings) => {
  return new Promise(async resolve => {
    const onError = settings.onError;
    const onSuccess = settings.onSuccess;
    
    let logged = false;
    await User
      .isLogged()          
      .then(async (resp) => {
        logged = resp;
        if(resp)
          onSuccess()
      })

    if(!logged)
      await User
        .tryLoginWithCookie({
          onSuccess: () => onSuccess(),
          onError: () => onError()
        })
    
    resolve()      
  })
}