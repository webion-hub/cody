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
    marginTop: 20,
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      marginTop: "5vw",
      marginBottom: "5vw",
    },
  },
  class: {
    display: "inline-block",
    paddingLeft: 20,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "5vw",
    },
  },
  rightPadding: {
    paddingRight: 20,
    [theme.breakpoints.down('xs')]: {
      paddingRight: "5vw",
    },
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
				activationDistance={10}
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