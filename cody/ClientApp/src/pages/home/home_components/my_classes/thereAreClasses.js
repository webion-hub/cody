import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import { ClassCard } from 'src/components/cards/class_card';

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
    paddingLeft: theme.spacing(2),
  },
  rightPadding: {
    paddingRight: theme.spacing(2),
  },
}));


export function ThereAreClasses(props){
  const classes = classesStyles();
  const classesList = props.classesList;
  const classesNumber = classesList.length; 

  return (
		<div className={classes.classesBox}>
			<ScrollContainer
				hideScrollbars={false}
				ignoreElements=".noScroll"
				nativeMobileScroll
			>
				<ul className={classes.classesListStyle}>
					{
						classesList.map((data, index) => {
							return (
								<li 
									key={index}
									className={
										`${classes.class} +
										${
											index === classesNumber - 1 ?
											classes.rightPadding :
											null
											}`
									}
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
			</ScrollContainer>
		</div>
  );

}