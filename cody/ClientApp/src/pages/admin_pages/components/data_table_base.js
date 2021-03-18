import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { useTheme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

import { DataTableTitleControllers } from 'src/pages/admin_pages/components/data_table_title_controllers';
import { dataTableStyles } from 'src/pages/admin_pages/styles/data_table_styles';
import { DataTableController } from 'src/pages/admin_pages/lib/data_table_controller';


export const DataTableContext = React.createContext({
  refreshDataTable: () => {},
});

export function DataTableBase(props){
	const theme = useTheme();

  const [dataList, setDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

	const maxPageElements = props.maxPageElements;
  const [dataTableSettings, setDataTableSettings] = React.useState({
		filter: "",
		limit: maxPageElements,
		offset: 0,
	});

  const [disableNext, setDisableNext] = React.useState(false);
  const [disableBack, setDisableBack] = React.useState(true);

  const [page, setPage] = React.useState(1);

	//getData function from props
  const getData = props.getData;
  const associateData = props.associateData;

	const dataTableController = new DataTableController({
		onPageNext: () => setPage(page + 1),
		onPageBack: () => setPage(page - 1),
		getData: getData,
		associateData: associateData,
	})

	useEffect(() => {
		refreshDataTable(dataTableSettings)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const refreshDataTable = (settings, pageMove) => {
		setLoading(true)
		setDataTableSettings(settings)

		dataTableController
			.refreshDataTable(settings, pageMove)
			.then((list) => {
				setLoading(false)
				if(list !== [])
					setDataList(list)
			})
	}

	/**
	 * Handlers 
	 */

	const handleChange = (value) => {
		const dataSettings = {
			...dataTableSettings,
			filter: value,
			offset: 0,
		}
		
		setPage(1)	
		setDisableBack(true)
		setDisableNext(false)

		refreshDataTable(dataSettings)
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

		const dataOffset = page*maxPageElements;
		const dataSettings = {
			...dataTableSettings,
			offset: dataOffset,
		}

		refreshDataTable(dataSettings, {next: true})
	}

	const handleBack = () => {
		const isAtFirstPage = page === 1
		if(isAtFirstPage){
			setDisableBack(true)
			return;
		}

		setDisableBack(false)
		setDisableNext(false)

		const dataOffset = (page - 2)*maxPageElements;
		const dataSettings = {
			...dataTableSettings,
			offset: dataOffset,
		}

		refreshDataTable(dataSettings, {back: true})
	}

	return (
		<DataTableContext.Provider value={{refreshDataTable: () => refreshDataTable(dataTableSettings)}}>
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