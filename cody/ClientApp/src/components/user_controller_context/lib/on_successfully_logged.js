import { UserAccountInfo } from 'src/lib/user_account_info'

export const onSuccessfullyLogged = async (settings) => {
  const onSuccess = settings.onSuccess;
  const onGetRole = settings.onGetRole;
  
  await UserAccountInfo
    .createRequest()
      .get('role')
    .send()
    .then(resp => {
      const got = resp.got;
      const role = got.get('role')
      onGetRole(role)
      onSuccess()
    })
}