import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { InputBase } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import { Box } from '@material-ui/core';

import { CodingFilterDialog } from './coding_filter_dialog';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 500,
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export function SearchBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [languageSelected, setLanguageSelected] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getLanguage = (value) => {
    setLanguageSelected(value)
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Cerca"
          inputProps={{ 'aria-label': 'Cerca' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchRoundedIcon />
        </IconButton>
        <Tooltip 
          title="Seleziona il linguaggio di programmazione." 
          aria-label="filter"
          placement="right"
          arrow
        >
          <IconButton 
            className={classes.iconButton} 
            aria-label="filter"
            onClick={handleClickOpen}
          >
            {languageSelected? languageSelected.icon : <CodeRoundedIcon/>}
          </IconButton>
        </Tooltip>

        <CodingFilterDialog
          open={open}
          onClose={handleClose}
          language={getLanguage}
          defaultValue={languageSelected}
        />

      </Paper>
      <Box 
        position="absolute"
        top={64}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Chip
              icon={<CodeRoundedIcon/>}
              label={"Java"}
              onDelete={() =>{}}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<CodeRoundedIcon/>}
              label={"Java"}
              onDelete={() =>{}}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<CodeRoundedIcon/>}
              label={"Java"}
              onDelete={() =>{}}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<CodeRoundedIcon/>}
              label={"Java"}
              onDelete={() =>{}}
            />
          </Grid>
        </Grid>       
      </Box>
    </Grid>
  );
}