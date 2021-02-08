import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { UserContext } from 'src/components/user_controller_context';

export function Test(){
  const { logged, setLogged } = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

	/**
	 * Write functions inside useEffect
	 */

	useEffect(() => {
		if(logged){
			//Code to execute when user is logged
		}

		//Other functions
	})

	return (
		<div>
		</div>
	);
}

