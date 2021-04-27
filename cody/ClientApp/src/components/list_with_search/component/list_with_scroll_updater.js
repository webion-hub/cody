import React, { useRef } from 'react';
import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';

export function ListWithScrollUpdater(props) {
  const listRef = useRef();
  const {
    itemData,
    height, 
    loading,
    onScrollEnd,
    ...otherProps
  } = props;

  const handleScroll = () => {
    if(listRef.current === undefined)
      return;

    const scrollPosition = listRef.current.scrollTop;
    const scrollMaxPosition = listRef.current.scrollHeight - listRef.current.offsetHeight;

    if(scrollMaxPosition === 0)
      return;

    const isScrollAtTheEnd = scrollPosition >= scrollMaxPosition

    if(isScrollAtTheEnd)
      props.onScrollEnd?.()
  }

  return (
    <ListWithVirtualized 
      {...otherProps}
      loading={loading}
      height={height}
      outerRef={listRef}
      onScroll={handleScroll}
      itemCount={itemData.length}
      itemData={itemData}
    />
  )
}