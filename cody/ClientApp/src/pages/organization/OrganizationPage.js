import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CustomAvatar } from "src/components/custom_avatar";
import { Organizations } from "src/lib/server_calls/organizations";
import { Grid, IconButton, Typography, Badge } from "@material-ui/core";
import { Images } from "src/lib/default_values/images/images";
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { setOpacityColor } from "src/lib/setOpacityColor";
import { OrganizationLabel } from "src/components/typography/organization_label";
import { OrganizationKindIcon } from "src/components/organization_kind_icon";

export const useStyles = makeStyles((theme) => ({
  organizationCenterArea: {
    height: 192,
    background: `url(images/pattern.svg)`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    position: "relative"
  },
  organizationAvatarName: props => ({
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(0),
    backdropFilter: "blur(10px)",
    background: setOpacityColor(theme.palette.secondary.dark, 0.3),
    width: props.showOtherInfo ? "100%" : "50%",
    transition: "0.25s width ease-in-out"
  }),
  organizationTitles: {
    paddingLeft: theme.spacing(2),
    width: "calc(100% - 130px)",
    maxWidth: "calc(33vw - 130px)",
    tableLayout: "fixed",
  },
  showOtherInfoButton: props => ({
    position: "absolute",
    right: 0,
    transform: props.showOtherInfo && "rotate(180deg)",
    transition: "0.25s transform ease-in-out"
  }),
  descriptionContainer: {
    position: "absolute",
    width: "calc(50% - 48px)",
    right: 48,
    height: 160,
    overflowY: "scroll",
    animation: `$fade 0.5s linear`,
  },
  "@keyframes fade": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
  badgeContent: {
    width: 36,
    height: 36,
    padding: 6,
    background: theme.palette.secondary.main,
    borderRadius: 18
  }
}));

export default function OrganizationPage(){
  const [showOtherInfo, setShowOtherInfo] = React.useState(false)

	const classes = useStyles({showOtherInfo});
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false)
  const [organizationData, setOrganizationData] = React.useState(null)

  useEffect(() => {
    getOrganizationByPageId()
  }, [])

  const getOrganizationByPageId = () => {
    setLoading(true)
    Organizations
      .getById(id)
      .then(data => {
        console.log(data)
        setOrganizationData(data)})
      .finally(_ => setLoading(false))
  } 

  return (
    <Grid
      container
      direction="row"
    >
      <Grid item xs={2}>

      </Grid>
      <Grid 
        className={classes.organizationCenterArea}
        item
        container
        xs={8}
      >
        <Grid 
          className={classes.organizationAvatarName}
          container
          direction="row"
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
                <OrganizationKindIcon kind={organizationData?.kind} size="small"/>
              </div>
            }
          >
            <CustomAvatar
              src={`organizations/${id}/logo`}
              alt={organizationData?.name}
              size={80}
            />
          </Badge>
          <div className={classes.organizationTitles}>
            <Typography 
              variant="h6"
              noWrap
            >
              <OrganizationLabel 
                organization={organizationData}
                translateIconY={2}
              />
            </Typography>
            <Typography 
              variant="caption"
              component="p"
              noWrap
            >
              {organizationData?.detail.location}
            </Typography>
          </div>
          {
            showOtherInfo &&
              <div className={classes.descriptionContainer}>
                <Typography 
                  variant="body1"
                >
                  Descrizione
                </Typography>
                <Typography
                  variant="body2"
                >
                  {organizationData?.detail.description}
                </Typography>
              </div>
          }
          <IconButton 
            className={classes.showOtherInfoButton}
            onClick={() => setShowOtherInfo(!showOtherInfo)}
          >
            <ChevronRightRoundedIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={2}>

      </Grid>
    </Grid>
  );
}