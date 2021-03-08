import React, { useLayoutEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { Grid, IconButton } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMediaQuery } from '@material-ui/core';

import { FlowingText } from 'src/components/typography/flowing_text'
import { TouchableTooltip } from 'src/components/touchable_tooltip'
import { CustomAvatar } from 'src/components/custom_avatar'

import { useGetSize } from 'src/lib/hooks/use_get_size';


const useStyles = makeStyles((theme) => ({
  tooltipUsers: {
    padding: "2px 0"
  },
  codingLanguageButton: {
    width: 40,
    height: 40,
  },
  avatarCodingLanguageBox: {
    background: theme.palette.background.backgroundTransparent,
    borderRadius: 28,
  },
	iconButton: {
		padding: 8
	}
}));

export function InfoBoxClassCard(props){ 
  const theme = useTheme();
  const classes = useStyles();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
  const userNumber = props.users.length;

	//234 is the sum of all elements in the row	
  const screenWidth = useGetSize(window).width;
	const maxMobileFlowingTextWidth = screenWidth - 240;
	const areUsers = userNumber > 0;

	const tooltipUsersList = 
		<Grid
			container
			direction="column"
		>
			{
				props.users.map((data, index) => {
					return <Grid
							key={index}
							container
							direction="row"
							alignItems="center"
							spacing={1}
							className={classes.tooltipUsers}
						> 
							<Grid item>
							<CustomAvatar
								alt={data.username} 
								src={data.profilePic} 
								width={24}
								height={24}
							/>
							</Grid>
							<Grid item>
								{data.username}
							</Grid>
						</Grid>
				})
			}
		</Grid>

	const infoBox = 
		<>
			<FlowingText
				containerWidth={
					mobileView ? 
						maxMobileFlowingTextWidth : 210
				}
				background={theme.palette.background.paper}
				variant="h5"
			>
				{props.title}
			</FlowingText>
			<Link href="" color="textSecondary" className="noScroll">
				<FlowingText
					containerWidth={
						mobileView ? 
							maxMobileFlowingTextWidth : 210
					}
					background={theme.palette.background.paper}
					variant="caption"
				>
					Admin {props.admin.username}
				</FlowingText>
			</Link>
		</>

	const avatarLanguageBox = 
		<Box pr={2}>
			<Grid
				container
				direction="row"
				spacing={1}
				className={classes.avatarCodingLanguageBox}
			>
				<Grid item>
					<IconButton 
						className={`${classes.codingLanguageButton} noScroll`}
						classes={{
							root: classes.iconButton
						}}
					>
						{props.languageIcon}
					</IconButton>
				</Grid>
				<Grid item className="noScroll">
					<TouchableTooltip
						arrow
						keepOpenOnClick
						placement="left"
						title={ 
							areUsers ? 
								tooltipUsersList : "Non ci sono altri studenti"
						}
					>
						<Badge
							overlap="circle"
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							badgeContent={userNumber > 0 ? "+" + userNumber : null}
							color="secondary"
						>
							<CustomAvatar
								alt={props.admin.username} 
								src={props.admin.profilePic}
							/>
						</Badge>
					</TouchableTooltip>
				</Grid>
			</Grid>
		</Box>

  return (
		<Grid
			container
			direction="row"
			alignItems="center"
		>
			{
				props.loading ?
					<Skeleton animation="wave" width={96} height={48}/>
					: avatarLanguageBox
			}
			<div>
				{
					props.loading ? 
						null : infoBox					
				}
			</div>
		</Grid>
  );
}