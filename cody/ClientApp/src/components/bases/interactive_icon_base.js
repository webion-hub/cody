import React from 'react';
import { Skeleton } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'src/components/user_controller_context';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: 4,
  },
}));

export function InteractiveIconBase(props){  
  const classes = useStyles();
  const { logged } = React.useContext(UserContext);
  const { loading } = React.useContext(UserContext);
 
	const extraLoadingCondition = props.extraLoadingCondition? props.extraLoadingCondition : false;
	const areChildren = props.children? true : false;
	const finalLoading = props.customChildrenLoading? props.customChildrenLoading : loading;

	const loggedChildren = (
		<div
			style={{
				display: finalLoading ? "none" : "block"
			}}
		>
			{props.loggedChildren}
		</div>
	)

	const notLoggedChildren = (
		<div
			style={{
				display: loading ? "none" : "block" 
			}}
		>
			{props.notLoggedChildren}
		</div>
	)

  return (    
    <div>
      <Skeleton
        variant="circle" 
        animation="wave"
        width={40} 
        height={40} 
        className={classes.skeleton}
        style={{
          display: loading || (extraLoadingCondition) ? "block" : "none"  
        }}
      />
			{logged && !areChildren ? 
				loggedChildren
				: 
				notLoggedChildren
			}
			{areChildren ? props.children : null}
    </div>
  );
}