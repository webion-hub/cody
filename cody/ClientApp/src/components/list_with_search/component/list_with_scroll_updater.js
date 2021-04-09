import React, { useRef } from 'react';
import { ListWithVirtualized } from 'src/components/list_with_virtualizer/list_with_virtualizer';

export function ListWithScrollUpdater(props) {
  const listRef = useRef();
  const {
    itemList,
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

    const scrollEndOffset = height / 5
    const isScrollAtTheEnd = scrollPosition >= scrollMaxPosition - scrollEndOffset

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
      itemCount={itemList.length}
    />
  )
}