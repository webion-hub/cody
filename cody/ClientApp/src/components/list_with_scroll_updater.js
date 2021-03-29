import React, { useRef } from 'react';
import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';

export function ListWithScrollUpdater(props) {
  const listRef = useRef();
  const {
    itemList,
    setItemList, 
    offset, 
    height, 
    elementLoadingLimit, 
    loading, 
    ...otherProps
  } = props;

  const handleScroll = () => {
    if(listRef.current === undefined)
      return;
    const scrollPosition = 
      listRef.current.offsetHeight + listRef.current.scrollTop;
    const scrollHeight = listRef.current.scrollHeight;

    const scrollEndOffset = height / 4
    const isScrollAtTheEnd = scrollPosition + scrollEndOffset >= scrollHeight

    if(isScrollAtTheEnd){
      const areOtherElements = 
        itemList.length % elementLoadingLimit === 0

      if(areOtherElements && !loading){
        const newOffsetVal = offset + elementLoadingLimit
        setItemList({
          mergeResultWith: itemList,
          offset: newOffsetVal 
        })
      }
    }
  }

  return (
    <ListWithVirtualized 
      {...otherProps}
      height={height}
      outerRef={listRef}
      onScroll={handleScroll}
      itemCount={itemList.length}
    />
  )
}