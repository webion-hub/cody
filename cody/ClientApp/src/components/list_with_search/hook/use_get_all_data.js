import React from 'react';

export const useGetAllData = (props) => {
  const [offset, setOffset] = React.useState(0);

  const {
    elementForStep,
    setLoading,
    getList,
  } = props;

  const getAllData = (dataListAction, filter, resetOffset) => {
    if(resetOffset)
      setOffset(0)

    getList({
      filter: filter,
      limit: elementForStep,
      offset: resetOffset ? 0 : offset,
    })
    .then(searchResults => dataListAction(searchResults))
    .finally(_=> {
      setLoading({
        mainLoading: false,
        searchLoading: false
      })
    })
  }

  return {
    offset,
    setOffset,
    getAllData,
  }
}