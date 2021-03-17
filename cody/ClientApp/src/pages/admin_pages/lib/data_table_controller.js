

export class DataTableController{

  constructor(settings){
    this.onPageNext = settings.onPageNext;
    this.onPageBack = settings.onPageBack;
    this.getData = settings.getData;
    this.associateData = settings.associateData;
  }

	refreshDataTable = (settings, pageMove) => {
		return new Promise(resolve => {
			this.getData(settings)
				.then(list => {

					const isListNotEmpty = list.length !== 0;

          const preparedList = this.setDataListState(list)
					resolve(preparedList)
					if(isListNotEmpty){
						if(pageMove.next)
							this.onPageNext()
						if(pageMove.back)
              this.onPageBack()
					}				
				})
				.catch(_ => resolve([]))
		})
	}

  setDataListState(list){
    const finalList = []

		list.forEach((data, index) => {
			this.associateData({
				list: finalList,
				data: data,
				index: index,
			})
		});

    return finalList;
  }

}

