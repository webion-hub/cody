import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Grid, IconButton } from "@material-ui/core";
import { OrganizationKindIcon } from "src/components/organization_kind_icon";
import { CustomAvatar } from "src/components/custom_avatar";
import { OrganizationLabel } from "src/components/typography/organization_label";
import { useTheme } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { Skeleton } from "@material-ui/lab";

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import OrganizationDescription from "./organization_description";
import { TypographyWithLoading } from "src/components/typography/typography_with_loading";

export const useStyles = makeStyles((theme) => ({
  organizationInfoArea: {
    background: theme.palette.background.paperSecondary,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    borderRadius: "56px 56px 8px 8px",
  },
  organizationInfoBox: {
    display: "grid",
    marginLeft: theme.spacing(3),
    tableLayout: "fixed",
    width: "calc(100% - 160px)",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      textAlign: "center",
      marginTop: theme.spacing(2),
      marginLeft: 0,
    },
  },
  badgeContent: {
    width: 36,
    height: 36,
    padding: 6,
    background: theme.palette.secondary.main,
    borderRadius: 18
  },
	showDescription: {
		width: "100%",
		textAlign: "center",
	},
	expandIcon: props => ({
		transform: props.showDescription && "rotate(180deg)",
		transition: "0.25s all"
	}),
}));

export default function OrganizationInfoArea(props){
	const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });
  const [showDescription, setShowDescription] = React.useState(false)
	const classes = useStyles({showDescription});

  const organizationData = props.organizationData
  const id = props.id

  const userCount = organizationData?.membersCount
  const userCountLabel = userCount === 1 
    ? `${userCount} Utente` 
    : `${userCount} Utenti`
  
  return (
    <>
			<div className={classes.organizationInfoArea}>
				<Grid					
					container
					direction={mobileView ? "column" : "row"}
          alignItems="center"
				>
					<Badge
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						overlap="circle"
						badgeContent={
							<div className={classes.badgeContent}>
								{
                  props.loading ?
                    <Skeleton 
                      variant="circle"
                      width={24}
                      height={24}
                      animation="wave"
                    />
                    :
                    <OrganizationKindIcon kind={organizationData?.kind} size="small"/>
                }
							</div>
						}
					>
						<CustomAvatar
							src={`organizations/${id}/logo`}
							alt={organizationData?.name}
							size={110}
              propsLoading={props.loading}
						/>
					</Badge>
					<div className={classes.organizationInfoBox}>
						<TypographyWithLoading
							variant="h6"
							noWrap
              loading={props.loading}
						>
							<OrganizationLabel organization={organizationData}/>
						</TypographyWithLoading>
						<TypographyWithLoading
							variant="caption"
							noWrap
              loading={props.loading}
						>
							{organizationData?.detail.location}
						</TypographyWithLoading>
						<TypographyWithLoading
							variant="caption"
							noWrap
              loading={props.loading}
						>
							{userCountLabel}
						</TypographyWithLoading>
					</div>
				</Grid>
        <OrganizationDescription
          organizationData={organizationData}
          showDescription={showDescription}
        />
        <div className={classes.showDescription}>
          <IconButton 
            onClick={_ => setShowDescription(!showDescription)}
            disabled={props.loading}
          >
            <ExpandMoreRoundedIcon className={classes.expandIcon}/>
          </IconButton>
        </div>
			</div>
    </>
  );
}