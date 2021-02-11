import React, { useEffect } from 'react';
import history from 'src/history';
import { User } from 'src/lib/user';

export const UserContext = React.createContext({
  logged: false,
  setLogged: () => {},
  setLoggedWithoutRefresh: () =>{},
  
  loading: true,
  setLoading: () => {},
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const state = sessionStorage.getItem('logged');
  const [logged, setLoggedState] = React.useState(JSON.parse(state));
  const [loading, setLoading] = React.useState(true);

  const setLoggedWithoutRefresh = (loggedState) => {
    sessionStorage.setItem('logged', loggedState);
  }

  const setLogged = (loggedState) => {
    history.go(0)
    sessionStorage.setItem('logged', loggedState);
  }

  useEffect(() => {
    if(logged)
      setLoading(false);    

    if(!logged){
      User
        .tryLoginWithCookie({
          onSuccess: () => setLogged(true),
        })
        .then(() => setLoading(false)
        );
    }

  }, []);
    
  const value = { 
    logged,
    setLogged,
    setLoggedWithoutRefresh,

    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
