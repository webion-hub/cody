import React, { useEffect } from 'react';
import { VariableSizeList } from 'react-window';

import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { OuterElementType, OuterElementContext } from './outer_element';
import { AutocompleteContext } from '../autocomplete_with_virtualizer';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

function useResetCache(data) {
  const ref = React.useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  
  return ref;
}

// Adapter for react-window
export const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const { heightBigScreen, heightSmallScreen } = React.useContext(AutocompleteContext);

  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemSize = bigScreen ? heightBigScreen : heightSmallScreen;

  const itemCount = itemData.length;

  const gridRef = useResetCache(itemCount);
  const innerRef = React.useRef();//ul element

  useEffect(() => {
    //Remove margin from ul element
    if(innerRef.current !== undefined || innerRef.current !== null)
      innerRef.current.style.margin = 0
  })

  const getHeight = () => {
    if (itemCount > 8)
      return 8 * itemSize;

    return itemCount * itemSize
  };

  return (
    <OuterElementContext.Provider value={other}>
      <VariableSizeList
        itemData={itemData}
        height={getHeight() + 2*LISTBOX_PADDING}//height of the container
        width="100%"
        ref={gridRef}
        outerElementType={OuterElementType}//set the outerElement as Material ui Autocomplete component
        innerElementType="ul"
        innerRef={innerRef}
        itemSize={(index) => itemSize}
        overscanCount={5}//number of elements to render outside the visible area
        itemCount={itemCount}
      >
        {renderRow}
      </VariableSizeList>
    </OuterElementContext.Provider>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};
