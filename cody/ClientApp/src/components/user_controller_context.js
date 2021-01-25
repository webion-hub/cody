import React from 'react';

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
  
  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
