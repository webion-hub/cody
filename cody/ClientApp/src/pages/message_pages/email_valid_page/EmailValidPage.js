import React, { useEffect } from 'react';
import loadable from '@loadable/component'
import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { HashController } from 'src/lib/hash_controller';

const Error404Page = loadable(() => import('../Error404Page'))
const ValidateEmailOk = loadable(() => import('./pages_settings/validate_email_ok'))
const ValidateEmailNotFound = loadable(() => import('./pages_settings/validate_email_not_found'))
const ValidateEmailBadKey = loadable(() => import('./pages_settings/validate_email_bad_key/validate_email_bad_key'))

export default function EmailValidPage() {
  const initialHash = HashController.getHashValue()
  const [hash, setHash] = React.useState(initialHash);
  const { userState } = React.useContext(UserContext);  
  
  useEffect(() => {
    HashController
      .setController()
      .trySetHash()
      .then(setHash)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, window.location.hash])

  const setContentByHash = (hash) => {
    const action = {
      'ok': <ValidateEmailOk/>,
      'not-found': <ValidateEmailNotFound/>,
      'bad-key': <ValidateEmailBadKey/>,
    }[hash];

    return action ?? <Error404Page/>
  }

  return setContentByHash(hash)
}
