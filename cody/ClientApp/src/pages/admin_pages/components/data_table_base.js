import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { useTheme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

import { DataTableTitleControllers } from 'src/pages/admin_pages/components/data_table_title_controllers';
import { dataTableStyles } from 'src/pages/admin_pages/styles/data_table_styles';
import { prepareListForDataTable } from '../lib/prepare_list_for_data_table';

export const DataTableContext = React.createContext({
  refreshDataTable: () => {},
});

export function DataTableBase(props){
	const theme = useTheme();

	const maxPageElements = props.maxPageElements;
  const getData = props.getData;
  const associateData = props.associateData;

  const [dataList, setDataList] = React.useState([]);
  const [totalItems, setTotalItems] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [dataTableSettings, setDataTableSettings] = React.useState({
		filter: "",
		limit: maxPageElements,
		offset: 0,
	});

	const maxPages = totalItems / maxPageElements;
	const disableNext = loading || page >= maxPages;
	const disableBack = loading || page === 1;

	useEffect(() => {
		refreshDataTable(dataTableSettings)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const refreshDataTable = (settings) => {
		setLoading(true)
		setDataTableSettings(settings)

		getData(settings)
			.then((searchResult) => {
				const list = searchResult.values;
				const total = searchResult.total;

				const preparedList = prepareListForDataTable(list, associateData)

				setDataList(preparedList)
				setTotalItems(total)
			})
			.finally(() => setLoading(false))
	}

	const handleChange = (value) => {
		const dataSettings = {
			...dataTableSettings,
			filter: value,
			offset: 0,
		}
		
		setPage(1)	
		refreshDataTable(dataSettings)
	}

	const handleNext = () => {
		const dataOffset = page*maxPageElements;
		const dataSettings = {
			...dataTableSettings,
			offset: dataOffset,
		}

		setPage(page + 1)	
		refreshDataTable(dataSettings)
	}

	const handleBack = () => {
		const dataOffset = (page - 2)*maxPageElements;
		const dataSettings = {
			...dataTableSettings,
			offset: dataOffset,
		}

		setPage(page - 1)	
		refreshDataTable(dataSettings)
	}

	return (
		<DataTableContext.Provider 
			value={{
				refreshDataTable: () => refreshDataTable(dataTableSettings)
			}}
		>
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
				customStyles={dataTableStyles(theme)}
			/>
		</DataTableContext.Provider>
		);
}