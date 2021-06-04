import React, { useEffect } from "react";
import { LinearProgress } from "@material-ui/core";


export function CustomImg(props){
  const {
    loading, 
    className, 
    defaultImage, 
    src, 
    onLoadEnd, 
    onError,
    onLoad,
    height,
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
      {isLoading && <LinearProgress color="secondary"/>}     
      <img
        style={{
          height: isLoading ? 0 : height,
          transition: "height 0.25s ease-in-out"
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