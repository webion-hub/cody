import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';

const renderRow = (getListItem) => (props) => {
  const { index, style, data } = props;
  const { items, listItemProps } = data;

  return getListItem(index, style, items[index], listItemProps);
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export function ListWithVirtualized(props) {
  const {getListItem, ...others} = props;

  if(props.loading)
    return null;

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

