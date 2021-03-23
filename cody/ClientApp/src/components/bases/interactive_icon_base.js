import React from 'react';

import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'src/components/user_controller_context';

const useStyles = makeStyles((theme) => ({
  skeletonLoading: {
    margin: 4,
  },
}));

export function InteractiveIconBase(props){  
  const classes = useStyles();
  const { isLogged } = React.useContext(UserContext);
  const { loading } = React.useContext(UserContext);
 
	const extraLoadingCondition = props.extraLoadingCondition? 
		props.extraLoadingCondition : false;

	const finalLoading = 
		loading || extraLoadingCondition;

	const loggedContent = (
		<div
			style={{
				display: finalLoading ? "none" : "block"
			}}
		>
			{props.loggedContent}
		</div>
	)

	const notLoggedContent = (
		<div
			style={{
				display: finalLoading ? "none" : "block" 
			}}
		>
			{props.notLoggedContent}
		</div>
	)

  return (    
    <div>
      <Skeleton
        variant="circle" 
        animation="wave"
        width={40} 
        height={40} 
        className={classes.skeletonLoading}
        style={{
          display: finalLoading ? "block" : "none"  
        }}
      />
			{
				isLogged ? 
					loggedContent : notLoggedContent
			}
    </div>
  );
}