import React, { useEffect } from 'react';

import { PageController } from 'src/lib/page_controller';
import { User } from 'src/lib/user';
import { UserAccountInfo } from 'src/lib/user_account_info'

export const UserContext = React.createContext({
  isLogged: false,
  setIsLogged: () => {},
  setIsLoggedWithoutRefresh: () =>{},
  
  loading: true,
  setLoading: () => {},

  role: null,
  setRole: () => {},
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const state = sessionStorage.getItem('logged');
  const isLogged = JSON.parse(state)? JSON.parse(state) : false;
  const [loading, setLoading] = React.useState(true);
  const [loggedWithCookie, setIsLoggedWithCookie] = React.useState(false);

  const [role, setRole] = React.useState(null);

  const setIsLoggedWithoutRefresh = (loggedState) => {
    sessionStorage.setItem('logged', loggedState);
  }

  const setIsLogged = (loggedState) => {
    PageController.refresh()
    sessionStorage.setItem('logged', loggedState);
  }

  const setRoleState = () => {
    setLoading(true)

    UserAccountInfo
    .createRequest()
      .get('role')
    .send()
    .then(resp => {
      setLoading(false)
      const got = resp.got;
      const role = got.get('role')
      setRole(role);
      setIsLoggedWithoutRefresh(true)
    })
  }

  useEffect(() => {
    setRoleState()

    User
      .tryLoginWithCookie({
        onSuccess: () => {
          setIsLoggedWithoutRefresh(true)
          setIsLoggedWithCookie(true)
          setRoleState()
        },
        onError: () => {
          if(loggedWithCookie){
            setIsLoggedWithoutRefresh(false)
            setIsLoggedWithCookie(false)
          }
        }
      })
      .then(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);
    
  const value = { 
    isLogged,
    setIsLogged,
    setIsLoggedWithoutRefresh,

    loading,
    setLoading,

    role,
    setRole,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
