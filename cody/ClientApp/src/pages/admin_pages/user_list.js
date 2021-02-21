import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { TouchableTooltip } from 'src/components/touchable_tooltip';

import history from 'src/history'
import { Button } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
	container: {
		position: "relative",
		marginTop: theme.appBar.fullHeight,
		minHeight: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.appBar.mobileHeight,
			minHeight: `calc(100vh - ${theme.appBar.mobileHeight}px)`,
    },
	},
	dataGrid: {
		width: "85%",
		height: `calc(100vh - ${theme.appBar.fullHeight}px)`,
    [theme.breakpoints.down('xs')]: {
			height: `calc(100vh - ${theme.appBar.mobileHeight}px)`
    },
	},
	customCell: {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	listButtons: {
		width: "15%",
		padding: theme.spacing(1),
		height: "100%"
	},
	button: {
		margin: 6
	},
	'@global': {
		'.dataGrid': {
			'scrollbar-width': 'auto !important',
		},
		'.dataGrid::-webkit-scrollbar': {
			width: 'auto !important',
			height: 'auto !important',
		},
	},
}));

export function UserList(){
	const classes = useStyles();
  const [userList, setUserList] = React.useState([]);

	useEffect(() => {
		fetch('Admin/Users').then(r => r.json())
		.then(users => {
			const list = []
			users.forEach((user, index) => {
				const birthDate = new Date(user.Detail.BirthDate)
				list.push({
					id: index,
					Id: user.Id,
					username: user.Username,
					email: user.Email,
					name: user.Detail.Name,
					surname: user.Detail.Surname,
					birthDate: birthDate.toLocaleDateString(),
					schoolId: user.School.Id,
				})
			});
			setUserList(list)
		})
	}, [])

	const columnsSettings = [
		{	field: 'Id', headerName: 'ID', width: 70 },
		{	field: 'username', headerName: 'Username', width: 150 },
		{	field: 'email', headerName: 'Email', width: 225 },
		{ field: 'name', headerName: 'Nome', width: 125 },
		{ field: 'surname', headerName: 'Cognome', width: 125 },
		{ field: 'birthDate', headerName: 'Data di nascita', width: 125 },
		{ field: 'schoolId', headerName: 'Id Scuola', width: 120 },
	]
	
	const columns = columnsSettings.map(column => {
		return { 
			field: column.field, 
			headerName: column.headerName, 
			width: column.width,
			renderCell: (params) => <CustomCell value={params.value} width={column.width}/>
		}
	})

	return (
		<Grid 
			className={classes.container}
			container
			direction="row"
			justify="space-between"
		>
			<Grid
				className={classes.listButtons}
				container
				direction="column"
				justify="center"
			>
				<Button 
					className={classes.button}
					color="primary"
					variant="contained"
				>
					Users
				</Button>
				<Button 
					className={classes.button}
					color="primary"
					variant="contained"
				>
					Scuole
				</Button>
			</Grid>
			<div className={classes.dataGrid}>
				<DataGrid
					classes="dataGrid"
					rows={userList} 
					columns={columns}
					scrollbarSize={50}
				/>
			</div>
		</Grid>
	);
}


function CustomCell(props){
	const classes = useStyles();
	const contentRef = useRef();
	const [tooltip, setTooltip] = React.useState(false);
	const widthLessPadding = props.width - 16

	useEffect(() => {
		if(contentRef.current !== undefined){
			if(contentRef.current.offsetWidth > widthLessPadding)
				setTooltip(true)
		}
	}, [contentRef.current])

	return (
		<TouchableTooltip 
			disabled={!tooltip}
			title={props.value? props.value : ""}
			placement="left"
			arrow
		>
			<div
				className={classes.customCell}				
				style={{
					width: widthLessPadding
				}}
			>
				<span ref={contentRef}>{props.value}</span>
			</div>
		</TouchableTooltip>
	)
}