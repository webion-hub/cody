import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { CodingFilterDialog } from 'src/components/pickers/search_bars/search_bar/components/coding_filter_dialog';

import CodeRoundedIcon from '@material-ui/icons/CodeRounded';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
}));

export function SearchBarEndtIcon(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const disableTooltip = props.disableTooltip
  const languageSelected = props.languageSelected

  return (
    <>
      <Tooltip 
        title="Seleziona il linguaggio di programmazione." 
        aria-label="filter"
        placement="right"
        disabled={disableTooltip}
        arrow
      >
        <IconButton 
          className={classes.iconButton} 
          aria-label="filter"
          onClick={() => setOpen(true)}
        >
          {languageSelected? languageSelected.icon : <CodeRoundedIcon/>}
        </IconButton>
      </Tooltip>
      <CodingFilterDialog
        open={open}
        onClose={() => setOpen(false)}
        onLanguageChange={props.onLanguageChange}
        defaultValue={languageSelected}
        disabled={disableTooltip}
      />
    </>
  );
}