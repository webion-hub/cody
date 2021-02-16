import React from 'react';

import { ClassCard } from 'src/components/cards/class_card/class_card';
import { CustomScrollContainer } from 'src/components/custom_scroll_container';

import { makeStyles } from '@material-ui/core/styles';


const classesStyles = makeStyles((theme) => ({
	classesBox: {
		position: "relative",
		[theme.breakpoints.up('sm')]: {
			width: `calc(100vw - ${theme.drawer.width}px)`
    },
	},
  classesListStyle: {
    display: "flex",
    padding: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  class: {
    display: "inline-block",
		[theme.breakpoints.up('sm')]: {
			paddingLeft: theme.spacing(2),
    },
  },
  rightPadding: {
		[theme.breakpoints.up('sm')]: {
			paddingRight: theme.spacing(2),
    },
  },
	leftPadding: {
    paddingLeft: theme.spacing(2),
  },
}));


export function ThereAreClasses(props){
  const classes = classesStyles();
  const classesList = props.classesList;
  const classesNumber = classesList.length; 

	const content = <ul className={classes.classesListStyle}>
		{
			classesList.map((data, index) => {
				return (
					<li 
						key={index}
						className={`${classes.class}
							${
								index === classesNumber - 1 ?
									classes.rightPadding : null										
							}
							${
								index === 0 ?
									null : classes.leftPadding										
							}
						`}
					>
						<ClassCard
							loading={false}
							image={data.image}
							title={data.title}
							languageIcon={data.icon}
							admin={data.admin}
							users={data.users}
						/>
					</li>
				)
			})
		}
	</ul>

  return (
		<div className={classes.classesBox}>
			<CustomScrollContainer
				arrows
				elementsPadding={16}
				hideScrollbars
				height={350}
			>
				{content}
			</CustomScrollContainer>
		</div>
  );

}