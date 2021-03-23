import React from 'react';

import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from 'src/components/user_controller_context';
import { LoadingDisplayComponent } from './components/loading_display_component';

const useStyles = makeStyles((theme) => ({
  skeletonLoading: {
    margin: 4,
  },
}));

export function InteractiveIconBase(props){  
  const classes = useStyles();
  const { isLogged, userLoading } = React.useContext(UserContext);
 
	const extraLoadingCondition = props.extraLoadingCondition? 
		props.extraLoadingCondition : false;

	const finalLoading = 
		userLoading || extraLoadingCondition;

	const loggedContent =
		<LoadingDisplayComponent
			loading={finalLoading}
		>
			{props.loggedContent}
		</LoadingDisplayComponent>

	const notLoggedContent = 
		<LoadingDisplayComponent
			loading={finalLoading}
		>
			{props.notLoggedContent}
		</LoadingDisplayComponent>


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
			{isLogged ? loggedContent : notLoggedContent}
    </div>
  );
}