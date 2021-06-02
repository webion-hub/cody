import React, { useEffect } from 'react';
import { useGetDataActions } from './use_get_data_actions';

export function useListWithSearch(props){
  const [searchValue, setSearchValue] = React.useState("");
  const filter = props.filter ? props.filter : ""
  const searchValueWithFilter = `${filter} ${searchValue}`

  const getAllDataSettings = {
    elementForStep: props.elementForStep, 
    getList: props.getList
  }

  const {
    getAllSearchedData,
    getNewDataFromScroll,
    setOffset,
    offset,
    dataList,
    loading,
  } = useGetDataActions(getAllDataSettings)

  useEffect(() => {
    if(filter === "@waiting")
      return;
    getAllSearchedData(searchValueWithFilter)
  }, [searchValue, filter])

  useEffect(
    () => getNewDataFromScroll(searchValueWithFilter),
    [offset]
  )

  const handleScrollEnd = () => {
    const totalLoading = loading.mainLoading || loading.searchLoading
    if(totalLoading)
      return;
    
    if(offset > dataList.total)
      return;
    
    const newOffset = props.elementForStep + offset;
    setOffset(newOffset)
  }

  return {
    handleScrollEnd: handleScrollEnd,
    setSearchValue: setSearchValue,
    searchValue: searchValue,
    loading: loading,
    dataList: dataList,
  }
}