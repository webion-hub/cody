import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import ScrollContainer from 'react-indiana-drag-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "normal",
    listStyle: 'none',
    margin: "0 auto",
    padding: 0,
    maxWidth: 500,
    height: 44,
    whiteSpace: "nowrap",
  },
  li: {
    display: "inline-block"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  icon: {
    margin: 4,
    height: 24,
  }
}));

export function ScrollableChipsArray(props){
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(props.list);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  function handleOnClick(chip){
    const {value} = props;
    value(chip); 
  }

  return(
    <div className="noScroll">
      <ScrollContainer>
        <ul 
          className={classes.root}
        >
          {
            chipData.length === 0 ?
              <Typography
                variant="body2"
              >
                {props.emptyMessage}
              </Typography>
              :
              chipData.map((data) => {
                return (
                  <li key={data.key} className={classes.li}>
                    <Chip
                      clickable={props.clickables}
                      color={props.color}
                      onClick={props.getValue ? () => handleOnClick(data) : props.onClick} 
                      icon={
                        data.icon? (
                          <div className={classes.icon}>
                            {data.icon}
                          </div>
                        ) : null
                      }
                      label={data.title}
                      onDelete={props.delete ? handleDelete(data) : null}
                      className={classes.chip}
                    />
                  </li>
                );
              })
          }
        </ul>
      </ScrollContainer>
    </div>
  );
}


/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import { languages } from '../../../lib/default_values/lists/coding_languages'
import ScrollContainer from 'react-indiana-drag-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "normal",
    listStyle: 'none',
    margin: "0 auto",
    padding: 0,
    maxWidth: 500,
    height: 44,
    whiteSpace: "nowrap",
  },
  li: {
    display: "inline-block"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  icon: {
    margin: 4,
    height: 24,
  }
}));

export function FavoriteChips(props){
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(languages);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  function handleOnClick(chip){
    const {language} = props;
    language(chip); 
  }

  return(
    <ScrollContainer>
      <ul 
        className={classes.root}
      >
        {
          chipData.length === 0 ?
            <Typography
              variant="body2"
            >
              Non hai linguaggi preferiti
            </Typography>
            :
            chipData.map((data) => {
              return (
                <li key={data.key} className={classes.li}>
                  <Chip
                    clickable
                    color="secondary"
                    onClick={() => handleOnClick(data)} 
                    icon={
                      <div className={classes.icon}>
                        {data.icon}
                      </div>
                    }
                    label={data.title}
                    onDelete={handleDelete(data)}
                    className={classes.chip}
                  />
                </li>
              );
            })
        }
      </ul>
    </ScrollContainer>
  );
}
*/