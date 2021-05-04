import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { ListboxComponent } from './components/list_box_component';

export const AutocompleteContext = React.createContext({
  heightBigScreen: 36,
  heightSmallsScreen: 48,
});

export function AutocompleteWithVirtualizer(props) {

  const value = {
    heightBigScreen: props.heightbig? props.heightbig : 36,
    heightSmallScreen: props.heightsmall? props.heightsmall : 48,
  }

  return (
    <AutocompleteContext.Provider value={value}>
      <Autocomplete
        {...props}
        ListboxComponent={ListboxComponent}
        popupIcon={props.popupIcon}
        closeIcon={props.closeIcon}
      />
    </AutocompleteContext.Provider>
  );
}

AutocompleteWithVirtualizer.defaultProps = {
  popupIcon: <ArrowDropDownRoundedIcon/>,
  closeIcon: <CloseRoundedIcon/>,
}