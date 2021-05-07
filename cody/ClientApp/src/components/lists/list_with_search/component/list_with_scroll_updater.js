import { useRef } from 'react';
import { ListWithVirtualized } from 'src/components/lists/list_with_virtualizer/list_with_virtualizer';
import memoize from 'memoize-one';

const createItem = memoize((items, listItemProps) => ({
  items,
  listItemProps
}))


export function ListWithScrollUpdater(props) {
  const listRef = useRef();
  const {
    itemData,
    height, 
    loading,
    onScrollEnd,
    listItemProps,
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

  const preparedItemData = createItem(itemData, listItemProps)

  return (
    <ListWithVirtualized 
      {...otherProps}
      loading={loading}
      height={height}
      outerRef={listRef}
      onScroll={handleScroll}
      itemCount={itemData.length}
      itemData={preparedItemData}
    />
  )
}