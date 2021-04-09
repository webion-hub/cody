import React from 'react';
import { useGetAllData } from './use_get_all_data';

export const useGetDataActions = (settings) => {
  const [dataList, setDataList] = React.useState([]);
  const [loading, setLoading] = React.useState({
    mainLoading: false,
    searchLoading: false,
  });

  const {
    offset,
    setOffset,
    getAllData
  } = useGetAllData({...settings, setLoading: setLoading})

  const getAllSearchedData = (searchValueWithFilter) => {
    setLoading({
      mainLoading: true,
      searchLoading: true
    })

    getAllData(setDataList, searchValueWithFilter, true)
  }

  const getNewDataFromScroll = (searchValueWithFilter) => {
    const areAllElementLoaded = offset >= dataList?.total
    if(areAllElementLoaded)
      return;

    if(offset === 0)
      return;
      
    setLoading({
      mainLoading: true,
      searchLoading: false
    })

    getAllData(mergeResultWith, searchValueWithFilter, false)
  }

  const mergeResultWith = (newDataList) => {
    const values = dataList?.values
    const completeDataList = values.concat(newDataList.values)
    setDataList({
      total: dataList?.total,
      values: completeDataList
    })
  }

  return {
    getAllSearchedData,
    getNewDataFromScroll,
    setOffset,
    offset,
    dataList,
    loading
  }
}