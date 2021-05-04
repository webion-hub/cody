import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import { CustomScrollContainer } from 'src/components/custom_scroll_container';

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

  const emptyListMessage = 
    <Typography
      variant="body2"
    >
      {props.emptyMessage}
    </Typography>

  const chipList = chipData.map((data) => {
    return (
      <li key={data.key} className={classes.li}>
        <Chip
          clickable={props.clickables}
          color={props.color}
          onClick={props.getValue ? () => handleOnClick(data) : props.onClick} 
          icon={
            data.icon &&
              <div className={classes.icon}>
                {data.icon}
              </div>
          }
          label={data.title}
          onDelete={props.delete ? handleDelete(data) : null}
          className={classes.chip}
        />
      </li>
    );
  })

  const content = 
    <ul 
      className={classes.root}
    >
      {chipData.length === 0 ? emptyListMessage : chipList}
    </ul>

  return(
    <div className="noScroll">
      <CustomScrollContainer
        hideScrollbars
      >
        {content}
      </CustomScrollContainer>
    </div>
  );
}