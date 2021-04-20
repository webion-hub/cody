import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  circularProgress: {
    display: "block",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
  }
}));

export function CustomImg(props){
	const classes = useStyles();
  const {loading, className, defaultImage, src, onLoadEnd, onError, ...imgProps} = props
  const [srcImage, setSrcImage] = React.useState(src)
  const [imageLoading, setImageLoading] = React.useState(true)
  
  const isLoading = loading || imageLoading

  const handleLoadEnd = () => {
    setImageLoading(false)
    props.onLoadEnd?.()
  }

  const handleOnError = () => {
    setSrcImage(defaultImage)
    handleLoadEnd()
    onError?.()
  }

  const handleOnLoad = () => {
    handleLoadEnd()
  }

  return (
    <>
      <div
        className={className}
        style={{
          display: isLoading ? "block" : "none"
        }}
      >
        <div className={classes.circularProgress}>
          <CircularProgress/>
        </div>
      </div>
      <img
        style={{
          display: isLoading ? "none" : "block"
        }}
        onError={handleOnError}
        onLoad={handleOnLoad}
        className={className}
        src={srcImage}
        {...imgProps}
      />
    </>
  )
}

CustomImg.defaultProps = {
  defaultImage: 'images/pattern.svg'
}