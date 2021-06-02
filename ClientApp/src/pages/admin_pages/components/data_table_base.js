import React from 'react';
import DataTable from 'react-data-table-component';

import { useTheme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

import { DataTableTitleControllers } from 'src/pages/admin_pages/components/data_table_title_controllers';
import { dataTableStyles } from 'src/pages/admin_pages/styles/data_table_styles';
import { prepareListForDataTable } from '../lib/prepare_list_for_data_table';
import { usePageController } from 'src/lib/hooks/use_page_controller';

export const DataTableContext = React.createContext({
  refreshDataTable: () => {},
});

export function DataTableBase(props){
	const theme = useTheme();
	const maxPageElements = props.maxPageElements;
  const getData = props.getData;
  const associateData = props.associateData;

	const pageController = usePageController({
		maxPageElements: maxPageElements,
		getData: getData
	})

	const {
		next,
		back,
		handleChange,
		refreshDataList,
		loading,
		dataList
	} = pageController

	return (
		<DataTableContext.Provider 
			value={{
				refreshDataTable: refreshDataList
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
						onBack={back.handle}
						onNext={next.handle}
						disableBack={back.disable}
						disableNext={next.disable}
						title={props.title}
					/>
				}
				columns={props.columns}
				data={prepareListForDataTable(dataList, associateData)}
				customStyles={dataTableStyles(theme)}
			/>
		</DataTableContext.Provider>
		);
}