import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { UserContext } from 'src/components/user_controller_context';
import 'src/lib/user_account_info';
import { UserAccountInfo } from 'src/lib/user_account_info';

export function Test(){
  const { logged, setLogged } = React.useContext(UserContext);
  const [get, setGet] = React.useState([]);
  const [set, setSet] = React.useState([]);
  
  if (get.length == 0) {
    UserAccountInfo
      .createRequest()
        .get('name')
        .get('surname')
        .get('email')
        .get('birthDate')
        
        .set('name', 'Stefano')
        .set('surname', 'Calabretti')
        .set('username', 'calabr')
        .set('email', 'mante851@gmail.com')
        .set('birthDate', '12/12/2001')
      .send()
      .then(resp => {
        console.log(resp);
        const got = resp.got;
        const newData = [];

        // Per avere un campo specifico
        const name = got.get('name');

        got.forEach((val, prop) => {
          newData.push([prop, val]);
        });
  
        setGet(newData);
        setSet(resp.set);
      });
  }

	return (
		<div style={{
      paddingTop: 64,
    }}>
      <h2>Get:</h2>
      {get.map(([prop, val]) => 
        <div key={prop}>{`${prop}: ${val}`}</div>
      )}

      <h2>Set:</h2>
      {set.map((err, i) => 
        <div key={i}>{err}</div>
      )}
		</div>
	);
}

