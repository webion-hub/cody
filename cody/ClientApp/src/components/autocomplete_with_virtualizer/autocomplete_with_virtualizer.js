import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { ListboxComponent } from './components/list_box_component';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export const AutocompleteContext = React.createContext({
  heightBigScreen: 56,
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
        popupIcon={props.popupIcon ? props.popupIcon : <ArrowDropDownRoundedIcon/>}
        closeIcon={props.closeIcon ? props.closeIcon : <CloseRoundedIcon/>}
      />
    </AutocompleteContext.Provider>
  );
}

