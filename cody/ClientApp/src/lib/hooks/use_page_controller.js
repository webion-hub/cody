import React, { useEffect } from "react";

export const usePageController = (props) => {
	const {
		maxPageElements,
		getData
	} = props

  const [data, setData] = React.useState({
    total: 0,
    values: []
  })

  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const dataTableSettings = React.useRef({
    filter: "",
		limit: maxPageElements,
		offset: 0,
  })

  const totalItems = data ? data.total : 0
	const maxPages = totalItems / maxPageElements;
	const disableNext = loading || page >= maxPages;
	const disableBack = loading || page === 1;

	useEffect(() => {
		refreshDataList(dataTableSettings)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const refreshDataList = () => {
		setLoading(true)
		getData(dataTableSettings.current)
			.then(setData)
			.finally(_ => setLoading(false))
	}

	const handleChange = (value) => {
		dataTableSettings.current.filter = value
		dataTableSettings.current.offset = 0
		
		setPage(1)	
		refreshDataList()
	}

	const handleNext = () => {
		const dataOffset = page*maxPageElements;
		dataTableSettings.current.offset = dataOffset

		setPage(page + 1)	
		refreshDataList()
	}

	const handleBack = () => {
		const dataOffset = (page - 2)*maxPageElements;
		dataTableSettings.current.offset = dataOffset

		setPage(page - 1)	
		refreshDataList()
	}

  const next = {
    disable: disableNext,
    handle: handleNext
  }

  const back = {
    disable: disableBack,
    handle: handleBack
  }

	return {
		next,
		back,
		handleChange,
		refreshDataList,
		loading,
		dataList: data ? data.values : []
	}
}