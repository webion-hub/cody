import React from "react";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export function TypographyWithLoading(props){
  const {loading, children, ...others} = props
  return (
    <Typography
      {...others}
    >
      {loading ? <Skeleton animation="wave"/> : children}
    </Typography>
  )
}