import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { useTheme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

import { DataTableTitleControllers } from 'src/pages/admin_pages/components/data_table_title_controllers';
import { dataTableStyles } from 'src/pages/admin_pages/components/data_table_styles';

export function DataTableBase(props){
	const theme = useTheme();

  const [dataList, setDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [filterValue, setFilterValue] = React.useState("");

  const [disableNext, setDisableNext] = React.useState(false);
  const [disableBack, setDisableBack] = React.useState(true);

	const maxPageElements = props.maxPageElements;
  const [page, setPage] = React.useState(1);

	//getData function from props
  const getData = props.getData;

	useEffect(() => {
		getData({
			limit: maxPageElements,
			offset: 0,
		})
		.then(list => {
			setLoading(false)
			setDataListState(list)
		});
	}, [])

	const setDataListState = (list) => {
		const finalList = []

		list.forEach((data, index) => {
			props.associateData({
				list: finalList,
				data: data,
				index: index,
			})
		});

		setDataList(finalList)

		const isNextPageEmpty = list.length !== maxPageElements;
		if(isNextPageEmpty)
			setDisableNext(true)
	}


	/**
	 * Handlers 
	 */

	const handleChange = (value) => {
		setFilterValue(value)
		searchValues(value)
	}

	const searchValues = (value) => {
		setPage(1)
		
		setDisableBack(true)
		setDisableNext(false)
		setLoading(true)

		getData({
			filter: value,
			limit: maxPageElements,
			offset: 0,
		})
		.then(list => {
			setLoading(false)
			setDataListState(list)
		});
	}

	/**
	 * Handle pages
	 */
	
	const handleNext = () => {
		const thereIsntDataInTheNextPage = 
			dataList.length !== maxPageElements;
		
		if(thereIsntDataInTheNextPage){
			setDisableNext(true)
			return;
		}
			
		setDisableBack(false)
		setDisableNext(false)
		setLoading(true)

		const dataOffset = page*maxPageElements;

		getData({
			filter: filterValue,
			limit: maxPageElements,
			offset: dataOffset,
		})
		.then(list => {
			setLoading(false)
			const isListEmpty = list.length !== 0;

			if(isListEmpty){
				setDataListState(list)
				setPage(page + 1)
			}
			else{
				setDisableNext(true)
			}

		});
	}

	const handleBack = () => {
		const isAtFirstPage = page === 1
		if(isAtFirstPage){
			setDisableBack(true)
			return;
		}

		setDisableBack(false)
		setDisableNext(false)
		setLoading(true)

		const dataOffset = (page - 2)*maxPageElements;

		getData({
			filter: filterValue,
			limit: maxPageElements,
			offset: dataOffset,
		})
		.then(list => {
			setLoading(false)
			setDataListState(list)
			setPage(page - 1)
		});
	}



	return (
		<DataTable
			progressPending={loading}
			progressComponent={
				<LinearProgress 
					color="secondary"
					style={{width: "100%"}}
				/>
			}
			title={
				<DataTableTitleControllers
					onChange={handleChange}
					onBack={handleBack}
					onNext={handleNext}
					disableBack={disableBack}
					disableNext={disableNext}
					title={props.title}
				/>
			}
			columns={props.columns}
			data={dataList}
			selectableRows
			customStyles={dataTableStyles(theme)}
		/>
		);
}