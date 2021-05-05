import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { UserSummaryCard } from "src/components/user_summaries/user_summary_card";
import { UserGroup } from "src/components/illustrations/illustrations/illustrations";
import { CustomFade } from "src/components/custom_fade";

const useStyles = makeStyles((theme) => ({
  image: {
    transition: "0.25s transform"
  },
  hideImage: {
    transform: "translate(-300px, 0px)"
  },
  userSmallSummary: {
    width: "100%",
    height: "100%",
    marginLeft: -12,
    position: "absolute",
  }
}));

export function UserSummaryCardWithImageTransition(props){
	const classes = useStyles();
  const {
    userData,
    onClose,
    callerIs,
    handler,
    onUserUpdate,
    className
  } = props

  return (
    <Grid
      className={className}
      container
      direction="column"
      alignItems="center"
    >
      <div 
        className={`${userData !== null ? classes.hideImage : ""} ${classes.image}`}
      >
        <UserGroup
          boxProps={{
            maxWidth: 300, 
            size: "100%", 
            padding: 4,
          }}
        />
      </div>
      {
        userData !== null &&
          <CustomFade>
            <div className={classes.userSmallSummary}>
              <UserSummaryCard
                onUserUpdate={onUserUpdate}
                user={userData}
                callerIs={callerIs}
                handler={handler}
                leftIcon={
                  <IconButton 
                    onClick={onClose}
                  >
                    <CloseRoundedIcon/>
                  </IconButton>
                }
              />
            </div>
          </CustomFade>
      }
    </Grid>
  )
}