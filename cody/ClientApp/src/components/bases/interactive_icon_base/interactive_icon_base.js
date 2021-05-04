import React from 'react';

import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { UserContext } from 'src/components/user_controller_context/user_controller_context';
import { LoadingDisplayComponent } from './components/loading_display_component';

const useStyles = makeStyles((theme) => ({
  skeletonLoading: {
    margin: 4,
  },
}));

export function InteractiveIconBase(props){  
  const classes = useStyles();
  const { userState } = React.useContext(UserContext);
 
	const finalLoading = 
    userState === "loading" || props.extraLoadingCondition;

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

  const mainComponent = userState === "logged" 
    ? loggedContent 
    : notLoggedContent

  return (    
    <>
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
			{mainComponent}
    </>
  );
}

InteractiveIconBase.defaultProps = {
  extraLoadingCondition: false
}