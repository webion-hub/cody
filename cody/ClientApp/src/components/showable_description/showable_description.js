import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";

import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import DescriptionBox from "./components/description_box";

const useStyles = makeStyles((theme) => ({
	bottomArea: {
		width: "100%",
		textAlign: "center",
    position: "relative",
	},
	expandIcon: props => ({
		transform: props.showDescription && "rotate(180deg)",
		transition: "0.25s all"
	}),
  descriptionBox: {
    background: theme.palette.background[700]
  }
}));

export function ShowableDescription(props){
  const [showDescription, setShowDescription] = React.useState(false)
	const classes = useStyles({showDescription});
  const {
    disabled,
    description,
    website,
    rightMenu
  } = props

  return (
    <div className={classes.descriptionBox}>
      <DescriptionBox
        description={description}
        website={website}
        showDescription={showDescription}
      />
      <div className={classes.bottomArea}>
        {rightMenu}
        <IconButton 
          onClick={_ => setShowDescription(!showDescription)}
          disabled={disabled}
        >
          <ExpandMoreRoundedIcon className={classes.expandIcon}/>
        </IconButton>
      </div>
    </div>
  )
}