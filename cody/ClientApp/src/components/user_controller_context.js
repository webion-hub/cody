import React, { useEffect } from 'react';

import { PageController } from 'src/lib/page_controller';
import { User } from 'src/lib/user';
import { UserAccountInfo } from 'src/lib/user_account_info'

export const UserContext = React.createContext({
  logged: false,
  setLogged: () => {},
  setLoggedWithoutRefresh: () =>{},
  
  loading: true,
  setLoading: () => {},

  role: null,
  setRole: () => {},
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const state = sessionStorage.getItem('logged');
  const logged = JSON.parse(state)? JSON.parse(state) : false;
  const [loading, setLoading] = React.useState(true);
  const [loggedWithCookie, setLoggedWithCookie] = React.useState(false);

  const [role, setRole] = React.useState(null);

  const setLoggedWithoutRefresh = (loggedState) => {
    sessionStorage.setItem('logged', loggedState);
  }

  const setLogged = (loggedState) => {
    PageController.refresh()
    sessionStorage.setItem('logged', loggedState);
  }

  const setRoleState = () => {
    UserAccountInfo
    .createRequest()
      .get('role')
    .send()
    .then(resp => {
      const got = resp.got;

      setRole(got.get('role'));
    })
  }

  useEffect(() => {
    if(logged){
      setRoleState()
      setLoading(false)
    }

    User
      .tryLoginWithCookie({
        onSuccess: () => {
          setLoggedWithoutRefresh(true)
          setLoggedWithCookie(true)
          setRoleState()
        },
        onError: () => {
          if(loggedWithCookie){
            setLoggedWithoutRefresh(false)
            setLoggedWithCookie(false)
          }
        }
      })
      .then(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);
    
  const value = { 
    logged,
    setLogged,
    setLoggedWithoutRefresh,

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
