import React, { useEffect } from 'react';

import { checkUserLogged } from './lib/check_user_logged';
import { UserAccountInfo } from 'src/lib/server_calls/user_account_info'


export const UserContext = React.createContext({
  userState: false,
  setUserState: () => {},
  
  userLoading: true,
  role: null,
});

export const UserContextConsumer = UserContext.Consumer;

export function UserControllerContext(props){
  const [userState, setUserGeneralState] = React.useState("loading");
  const [role, setRole] = React.useState(null);

  const fetchRole = async () => {
    return await UserAccountInfo
      .createRequest()
        .get('role')
      .send()
      .then(resp => {
        const got = resp.got;
        const role = got.get('role')
        setRole(role)
      })
  }

  useEffect(() => {
    setRole(null)

    checkUserLogged({
      onSuccess: async () => {
        await fetchRole()
        setUserGeneralState("logged")
      },
      onError: () => setUserGeneralState("notLogged"),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);

  const setUserState = async (state) => {
    switch (state) {
      case "logged":
        setUserGeneralState("loading")
        await fetchRole()
        setUserGeneralState("logged")
        break;
      case "notLogged":
        setRole(null)
        setUserGeneralState("notLogged")
        break;
      default:
        setUserGeneralState("loading")
        break;
    }
  }
    
  const value = { 
    userState,
    setUserState,

    role,
  };

  return (
    <UserContext.Provider value={value}>
      {props.children}
    </UserContext.Provider>
  );
}
