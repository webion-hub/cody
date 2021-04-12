import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { OrganizationLabel } from "src/components/typography/organization_label";
import { TypographyWithLoading } from "src/components/typography/typography_with_loading";

export const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      "& > *": {
        margin: "0 auto"
      }
    },
  },
  centerText: {
    [theme.breakpoints.down('xs')]: {
      "& > *": {
        margin: "0 auto"
      }
    }, 
  }
}));

export function OrganizationInfo(props){
	const classes = useStyles();
  const organizationData = props.organizationData

  return (
    <div className={props.className}>
      <TypographyWithLoading
        className={`${classes.title} ${classes.centerText}`}
        variant="h5"
        noWrap
        loading={props.loading}
      >
        <OrganizationLabel
          organization={organizationData} 
          iconSize={22}
          translateIconY={0}
        />
      </TypographyWithLoading>
      <TypographyWithLoading
        variant="caption"
        noWrap
        loading={props.loading}
        className={classes.centerText}
      >
        {organizationData?.detail.location}
      </TypographyWithLoading>
    </div>
  )
}