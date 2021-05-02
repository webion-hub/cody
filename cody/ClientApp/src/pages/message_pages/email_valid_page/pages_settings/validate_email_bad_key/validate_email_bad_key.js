import React from 'react';
import loadable from '@loadable/component'

import { UserContext } from 'src/components/user_controller_context/user_controller_context';

const ValidateEmailBadKeyLogged = loadable(() => import('./validate_email_bad_key_logged/validate_email_bad_key_is_logged'))
const ValidateEmailBadKeyNotLogged = loadable(() => import('./validate_email_bad_key_is_not_logged'))


export default function ValidateEmailBadKey(){
  const { userState } = React.useContext(UserContext);  

  if(userState === "loading")
    return null;

  if(userState === "logged")
    return <ValidateEmailBadKeyLogged/>
  
  return <ValidateEmailBadKeyNotLogged/>
}