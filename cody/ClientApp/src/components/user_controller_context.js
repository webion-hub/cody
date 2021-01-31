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

  const setLogged = (state) => {
    sessionStorage.setItem('logged', state);
    setLoggedState(state);
  }

  useEffect(() => {

    User.tryLoginWithCookie({
      onSuccess: () => setLogged(true),
    })
    .then(
      setLoading(false)
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
