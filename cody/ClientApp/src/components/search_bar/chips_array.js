import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import { languages } from '../../lib/default_values/lists/coding_languages'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    listStyle: 'none',
    margin: "0 auto",
    padding: 0,
    maxWidth: 500,
    height: 44,
    overflowX: "auto",
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

export function ChipsArray(props){
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
    <ul className={classes.root}>
      {
        chipData.map((data) => {
          return (
            <li key={data.key} className={classes.li}>
              <Chip
                clickable
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
  );
}