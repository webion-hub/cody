import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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
  const {
    loading, 
    className, 
    defaultImage, 
    src, 
    onLoadEnd, 
    onError,
    onLoad,
    ...imgProps
  } = props
  const [srcImage, setSrcImage] = React.useState(src)
  const [imageLoading, setImageLoading] = React.useState(true)
  
  const isLoading = loading || imageLoading

  useEffect(() => {
    if(src === null)
      setSrcImage(defaultImage)
    else
      setSrcImage(src)
  }, [src])

  const handleLoadEnd = () => {
    setImageLoading(false)
    onLoadEnd?.()
  }

  const handleOnError = () => {
    setSrcImage(defaultImage)
    handleLoadEnd()
    onError?.()
  }

  const handleOnLoad = () => {
    if(srcImage === defaultImage)
      return;
    handleLoadEnd()
    onLoad?.()
  }

  return (
    <>
      <div
        className={className}
        style={{
          display: isLoading ? "block" : "none"
        }}
      >
        <Skeleton
          animation="wave"
          variant="rect" 
          height="100%"
        />
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
  defaultImage: 'images/forest.webp'
}