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
  const [userStatus, setUserStatus] = React.useState({
    state: "loading",
    role: null
  });

  const fetchRole = async () => {
    return await UserAccountInfo
      .createRequest()
        .get('role')
      .send()
      .then(resp => {
        const got = resp.got;
        const role = got.get('role')
        setUserStatus({
          role: role,
          state: "logged"
        })
      })
  }

  useEffect(() => {
    checkUserLogged({
      onSuccess: setLogged,
      onError: setNotLogged,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps    
  }, []);


  const setLogged = async _ => {
    setLoading()
    await fetchRole()
  }

  const setNotLogged = _ => {
    setUserStatus({
      role: null,
      state: "notLogged"
    })
  }

  const setLoading = _ => {
    if(userStatus.state === "loading")
      return

    setUserStatus({
      role: null,
      state: "loading"
    })
  }

  const setUserState = async (state) => {
    const action = {
      'logged': setLogged,
      'notLogged': setNotLogged,
      'loading': setLoading
    }[state]

    action();
  }
    
  const userState = userStatus.state
  const role = userStatus.role
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
