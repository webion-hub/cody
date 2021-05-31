import React from 'react';
import { lazyLoader } from 'src/components/utilities/lazy_loader';

import { UserContext } from 'src/components/global_contexts/user_controller_context/user_controller_context';

const ValidateEmailBadKeyLogged = lazyLoader(() => import('./validate_email_bad_key_logged/validate_email_bad_key_is_logged'))
const ValidateEmailBadKeyNotLogged = lazyLoader(() => import('./validate_email_bad_key_is_not_logged'))


export default function ValidateEmailBadKey(){
  const { userState } = React.useContext(UserContext);  

  if(userState === "loading")
    return null;

  if(userState === "logged")
    return <ValidateEmailBadKeyLogged/>
  
  return <ValidateEmailBadKeyNotLogged/>
}