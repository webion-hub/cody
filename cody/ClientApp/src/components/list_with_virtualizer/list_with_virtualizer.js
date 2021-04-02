import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';

const renderRow = (getListItem) => (props) => {
  const { index, style } = props;

  return getListItem(index, style);
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export function ListWithVirtualized(props) {
  const {getListItem, ...others} = props;

  return (
    <FixedSizeList
      style={{
        overflow: "overlay"
      }}
      {...others}
    >
      {renderRow(props.getListItem)}
    </FixedSizeList>
  );
}

