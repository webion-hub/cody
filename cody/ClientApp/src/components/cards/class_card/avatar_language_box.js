import React, { useLayoutEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { Grid, IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useMediaQuery } from '@material-ui/core';

import { FlowingText } from 'src/components/typography/flowing_text'
import { TouchableTooltip } from 'src/components/touchable_tooltip'

const useStyles = makeStyles((theme) => ({
  tooltipUsers: {
    padding: "2px 0"
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  codingLanguageButton: {
    width: 40,
    height: 40,
  },
  avatarCodingLanguageBox: {
    background: theme.palette.background.backgroundTransparent,
    borderRadius: 28,
  }
}));

export function AvatarLanguageBox(props){ 
  const theme = useTheme();
  const classes = useStyles();
  const userNumber = props.users.length;
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'));
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [openUsersList, setOpenUsersList] = React.useState(false);

  useLayoutEffect(() => {

    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);

  }, []);

	const usersList = 
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
						<Avatar 
							alt={data.username} 
							src={data.profilePic} 
							className={classes.smallAvatar}
						/>
					</Grid>
					<Grid item>
						<div>{data.username}</div>
					</Grid>
				</Grid>
			})
		}
	</Grid>

  return (
		<Grid
			container
			direction="row"
			alignItems="center"
		>
			{
				props.loading ? (
					<Skeleton animation="wave" width={96} height={48}/>
				) : (
					<Box pr={2}>
						<Grid
							container
							direction="row"
							spacing={1}
							className={classes.avatarCodingLanguageBox}
						>
							<Grid item>
								<IconButton className={`${classes.codingLanguageButton} noScroll`}>
									{props.languageIcon}
								</IconButton>
							</Grid>
							<Grid item>
								<TouchableTooltip
									arrow
									open={openUsersList}
									interactive
									placement="left"
									title={ userNumber > 0 ? 
										usersList : "Non ci sono altri studenti"
									}
								>
									<div
										onTouchStart={() => setOpenUsersList(true)}
										onMouseEnter={() => setOpenUsersList(true)}
										onMouseLeave={() => setOpenUsersList(false)}
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
											<Avatar
												alt={props.admin.username} 
												src={props.admin.profilePic} 
											/>
										</Badge>
									</div>
								</TouchableTooltip>
							</Grid>
						</Grid>
					</Box>
				)
			}
			<div>
				{
					props.loading ? (
						null
					) : (
						<div>
							<FlowingText
								containerWidth={mobileView ? 
									screenWidth - 234 //234 is the sum of all elements in the row
									: 210
								}
								background={theme.palette.background.paper}
								variant="h5"
							>
								{props.title}
							</FlowingText>
							<Link href="" color="textSecondary" className="noScroll">
								<FlowingText
									containerWidth={mobileView ? 
										screenWidth - 234 //234 is the sum of all elements in the row
										: 210
									}
									background={theme.palette.background.paper}
									variant="caption"
								>
									Admin {props.admin.username}
								</FlowingText>
							</Link>
						</div>
					)
				}

			</div>
		</Grid>
  );
}