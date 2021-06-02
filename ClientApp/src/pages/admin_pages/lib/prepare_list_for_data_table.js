export const prepareListForDataTable = (list, associateData) => {
  const finalList = []

  list.forEach((data, index) => {
    associateData({
      list: finalList,
      data: data,
      index: index,
    })
  });

  return finalList;
}
