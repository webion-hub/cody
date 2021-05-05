import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { OrganizationLabel } from "src/components/typography/organization_label";
import { TypographyWithLoading } from "src/components/typography/typography_with_loading";
import { JoinOrganizationButton } from "src/components/buttons/join_organization_button";
import { BookmarkIconButton } from "src/components/bookmark_icon_button";
import { OrganizationContext } from "src/pages/organization/organization_controller_context";

const useStyles = makeStyles((theme) => ({
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
  },
  joinButton: {
    marginTop: theme.spacing(1)
  },
  bookmarkButton: {
    marginBottom: 2
  },
  shiftLeft: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 48
    }, 
  }
}));

export function OrganizationInfo(props){
	const classes = useStyles();
  const { 
    className,
   } = props

   const {
		organizationData,
    callerIs,
		loading
	} = React.useContext(OrganizationContext);

  const isCallerAMember = callerIs !== "noMember"

  return (
    <div className={className}>
      <TypographyWithLoading
        className={`${classes.title} ${classes.centerText}`}
        variant="h5"
        noWrap
        loading={loading}
      >
        {
          isCallerAMember &&
            <BookmarkIconButton
              className={classes.bookmarkButton}
              organizationData={organizationData}
            />
        }
        <OrganizationLabel
          organization={organizationData} 
          iconSize={22}
          translateIconY={0}
        />
      </TypographyWithLoading>
      <TypographyWithLoading
        variant="caption"
        noWrap
        loading={loading}
        className={`${classes.centerText} ${isCallerAMember ? classes.shiftLeft : ""}`}
      >
        {organizationData?.detail.location}
      </TypographyWithLoading>
      {
        (!isCallerAMember && !loading) && 
          <JoinOrganizationButton
            organization={organizationData}
            className={classes.joinButton}
          />
      }
    </div>
  )
}