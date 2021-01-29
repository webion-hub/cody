import React from 'react';
import { User } from '../lib/user';

export const UserContext = React.createContext({
  logged: true,
  setLogged: () => {},
});

export function UserControllerContext(props){
  const [logged, setLogged] = React.useState(true);

  const value = { 
    logged,
    setLogged,
  };
  
  User.tryLoginWithCookie({
    onSuccess: () => console.log("si"),
    onError: () => console.log("no"),
  });

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
