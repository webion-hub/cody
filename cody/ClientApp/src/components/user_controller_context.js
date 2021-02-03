import React, { useEffect } from 'react';
import { User } from 'src/lib/user';

export const UserContext = React.createContext({
  logged: false,
  setLogged: () => {},

  loading: true,
  setLoading: () => {},
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const state = sessionStorage.getItem('logged');
  const [logged, setLoggedState] = React.useState(JSON.parse(state));
  const [loading, setLoading] = React.useState(true);

  const setLogged = (loggedState) => {
    sessionStorage.setItem('logged', loggedState);
    setLoggedState(loggedState);
  }

  useEffect(() => {
    User.tryLoginWithCookie({
      onSuccess: () => setLogged(true),
    })
    .then(() => setLoading(false)
    );
  });
    
  const value = { 
    logged,
    setLogged,

    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
