import React, { useEffect } from 'react';

import { checkUserLogged } from './lib/check_user_logged';


export const UserContext = React.createContext({
  isLogged: false,
  setIsLogged: () => {},
  
  userLoading: true,
  role: null,
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const [isLogged, setIsLoggedState] = React.useState(false);
  const [userLoading, setUserLoading] = React.useState(true);

  const [role, setRole] = React.useState(null);

  const setIsLogged = (loggedState) => {
    setIsLoggedState(loggedState)
  }

  useEffect(() => {
    setUserLoading(true)
    checkUserLogged({
      onSuccess: () => setIsLoggedState(true),
      onError: () => setIsLoggedState(false),
      onGetRole: (role) => setRole(role)
    })
    .then(() => setUserLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);
    
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
