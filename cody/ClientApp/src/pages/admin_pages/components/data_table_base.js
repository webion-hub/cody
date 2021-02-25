import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';

import DataTable from 'react-data-table-component';
import { DataTableTitleWithSearchBar } from 'src/pages/admin_pages/components/data_table_title_with_search_bar';
import { dataTableStyles } from 'src/pages/admin_pages/components/data_table_styles';

export function DataTableBase(props){
	const theme = useTheme();
  const [dataList, setDataList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [disableNext, setDisableNext] = React.useState(false);
  const [disableBack, setDisableBack] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState("");

	const pageElements = props.pageElements;
  const [page, setPage] = React.useState(1);

  const getData = props.getData

	useEffect(() => {
		getData({
			limit: pageElements,
			offset: 0,
		})
		.then(list => {
			setDataListState(list)
		});
	}, [])

	const setDataListState = (list) => {
		const finalList = []
		list.forEach((data, index) => {
			props.associateData(finalList, data, index)
		});
		if(list.length !== pageElements)
			setDisableNext(true)
		setDataList(finalList)
	}

	const handleChange = (event) => {
		setSearchValue(event.target.value)
	}

	const handleNext = () => {
		if(dataList.length === pageElements){
			setDisableBack(false)
			setDisableNext(false)
			getData({
				filter: filterValue,
				limit: pageElements,
				offset: page*pageElements,
			})
			.then(list => {
				if(list.length !== 0){
					setDataListState(list)
					setPage(page + 1)
				}
				else{
					setDisableNext(true)
				}
			});
		}
		else{
			setDisableNext(true)
		}
	}

	const handleBack = () => {
		if(page !== 1){
			setDisableBack(false)
			setDisableNext(false)
			setPage(page - 1)
			getData({
				filter: filterValue,
				limit: pageElements,
				offset: (page - 2)*pageElements,
			})
			.then(list => {
				setDataListState(list)
			});
		}
		else{
			setDisableBack(true)
		}
	}

	const handleSubmit = () => {
		setFilterValue(searchValue)
		setPage(1)
		setDisableBack(true)
		setDisableNext(false)
		getData({
			filter: searchValue,
			limit: pageElements,
			offset: 0,
		})
		.then(list => setDataListState(list));
	}

	return (
		<DataTable					
			title={
				<DataTableTitleWithSearchBar
					onSubmit={handleSubmit}
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