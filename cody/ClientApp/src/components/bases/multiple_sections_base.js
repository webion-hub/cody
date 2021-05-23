import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { useMobileView } from "src/lib/hooks/use_mobile_view";

const useStyles = makeStyles((theme) => ({
	leftSection: props => ({
		padding: theme.spacing(2),
		width: `${props.sideSectionsWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "0%"
    },
	}),
	topSection: props => ({
		width: `${props.imageSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "100%"
    },
	}),
	centerSectionWidth: props => ({
		width: `${100 - props.rightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "100%"
    },
	}),
	rigthSection: props => ({
		padding: theme.spacing(1),
		width: `${props.rightSectionWidth}%`,
		[theme.breakpoints.down('xs')]: {
      width: "0%"
    },
	})
}));

export function MultipleSectionsBase(props) {
  const mobileView = useMobileView()

	const sideSectionsWidth = props.sideSectionsWidth;

	const imageSectionWidth = 100 - sideSectionsWidth
	const rightSectionWidth = (100 / imageSectionWidth)*sideSectionsWidth
	const classes = useStyles({
		sideSectionsWidth,
		imageSectionWidth,
		rightSectionWidth
	});

	const leftSection = 
	<Grid 
		className={classes.leftSection}
		item
	>
		{props.leftSection}
	</Grid>	


	return (
		<>
			<Grid				
				container
				direction="row"
			>
				{!mobileView && leftSection}
				<Grid 
					item
					className={classes.topSection}
				>
          {props.topSection}
					<Grid
						container
						direction="row"
					>
						<Grid
							item
							className={classes.centerSectionWidth}
						>
							{props.centerSection}
						</Grid>
						<Grid 
							item
							className={classes.rigthSection}
						>
							{props.rigthSection}
						</Grid>
					</Grid>	
				</Grid>		
			</Grid>
			{mobileView && leftSection}
		</>
	)
}

MultipleSectionsBase.defaultProps = {
	sideSectionsWidth: 15
}