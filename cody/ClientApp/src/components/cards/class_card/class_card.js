import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

import { CardBase } from 'src/components/bases/card_base';
import { ScrollableChipsArray } from 'src/components/scrollable_chips_array';
import { languages } from 'src/lib/default_values/lists/coding_languages'
import { InfoBoxClassCard } from 'src/components/cards/class_card/components/info_box_class_card'

const useStyles = makeStyles((theme) => ({
  cardBase: {
    width: 350,
    userSelect: "none",
    [theme.breakpoints.down('xs')]: {
      width: `calc(100vw - 96px)`,
    },
  }
}));

export function ClassCard(props){ 
  const classes = useStyles();

  return (
    <CardBase
      className={classes.cardBase}
      image={props.image}
      title={props.title}
      loading={props.loading}
      button={
        <Button
          size="small" 
          variant="contained"
          color="primary"
          endIcon={<KeyboardArrowRightRoundedIcon/>}
          href={props.href}
          className="noScroll"
        >
          Apri
        </Button>
      }
    >
      <InfoBoxClassCard
        title={props.title}
        users={props.users}
        admin={props.admin}
        loading={props.loading}
        languageIcon={props.languageIcon}
      />
      <Box mt={1}>
        {
          props.loading ? 
            <Skeleton animation="wave" width="100%" height={44}/>
            : 
            <ScrollableChipsArray
              list={languages}
              clickables
              color="secondary"
              emptyMessage="Non hai linguaggi preferiti"
            />          
        }
      </Box>
    </CardBase>
  );
}