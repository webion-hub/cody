import React from 'react';

import { School } from 'src/components/illustrations/school';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';


const useStyles = makeStyles((theme) => ({
	emptyBox: {
		maxWidth: "70vw",
		margin: "0 auto",
		marginTop: theme.spacing(4),
		[theme.breakpoints.down('md')]: {
			maxWidth: "100vw",
    },
	},
  emptyContent: {
    textAlign: "center",
    fontWeight: 500
  },
  showClassButton: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
    },
    display: "flex",
    margin:"0 auto"
  },
}));


export function NoClasses(){
  const classes = useStyles();
  const theme = useTheme();
  const mobileWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
		<Grid
			container
			direction="row"
			alignItems="center"
			className={classes.emptyBox}
		>
			<Grid 
				item
				xs={12}
				sm={5}
			>
				<School 
					maxWidth={400}
					margin="0 auto"
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={7}
			>
				<Typography
					variant={ mobileWidth ? "h5" : "h4"}
					className={classes.emptyContent}
				>
					Non sei iscritto<br/>a nessuna classe!
				</Typography>
				<Button
					variant="contained"
					color="primary"
					className={classes.showClassButton}
					endIcon={<KeyboardArrowRightRoundedIcon/>}
				>
					Mostra le classi
				</Button>
			</Grid>
		</Grid>
  );

}