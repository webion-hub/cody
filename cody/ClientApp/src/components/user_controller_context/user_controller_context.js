import React, { useEffect } from 'react';

import { checkUserLogged } from './lib/check_user_logged';
import { UserAccountInfo } from 'src/lib/user_account_info'


export const UserContext = React.createContext({
  isLogged: false,
  setIsLogged: () => {},
  
  userLoading: true,
  role: null,
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const [isLogged, setIsLogged] = React.useState(false);
  const [userLoading, setUserLoading] = React.useState(true);

  const [role, setRole] = React.useState(null);

  useEffect(() => {

  })

  useEffect(() => {
    setUserLoading(true)
    setRole(null)
    if(isLogged){
      UserAccountInfo
        .createRequest()
          .get('role')
        .send()
        .then(resp => {
          const got = resp.got;
          const role = got.get('role')
          setRole(role)
          setUserLoading(false)
        })
      return;
    }
    
    checkUserLogged({
      onSuccess: () => setIsLogged(true),
      onError: () => setIsLogged(false),
    })
    .then(() => setUserLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, [isLogged]);
    
  const value = { 
    isLogged,
    setIsLogged,

    userLoading,
    role,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
