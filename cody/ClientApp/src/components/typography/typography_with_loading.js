import React from "react";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    width: "70%",
    maxWidth: 200,
  }
}));

export function TypographyWithLoading(props){
	const classes = useStyles();
  const {loading, children, ...others} = props
  return (
    <Typography
      {...others}
    >
      {
        loading 
          ? <Skeleton className={classes.skeleton} animation="wave"/> 
          : children
     }
    </Typography>
  )
}