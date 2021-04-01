import { UserAccountInfo } from 'src/lib/server_calls/user_account_info'

export const getUserAllData = () => {
  return new Promise(resolve => {
    UserAccountInfo
      .createRequest()
        .get('username')
        .get('name')
        .get('surname')
        .get('email')
        .get('birthDate')
        .get('school')
        .get('role')
        .get('biography')
      .send()
      .then(resp => {
        const got = resp.got;
        const actualData = {
          username: got.get('username'),
          name: got.get('name'),
          surname: got.get('surname'),
          email: got.get('email'),
          birthDate: new Date(got.get('birthDate')),
          school: got.get('school'),
          role: got.get('role'),
          biography: got.get('biography'),
        }

        resolve(actualData);
      })
  })
}