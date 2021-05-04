import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export function LoadingButton(props){
  const {
    variant,
    color,
    loading, 
    label, 
    fullWidth, 
    children, 
    ...otherProps
  } = props;

  const disabledButton = props.loading || props.disabled

  const loadingAnimation = loading &&        
    <CircularProgress
      color="secondary"
      size={25}
      style={{
        position: "absolute" 
      }}
    />

  const mainButton = 
    <Button
      {...otherProps}
      variant={variant}
      color={color}
      disabled={disabledButton}
      fullWidth={fullWidth}
    >
      {loadingAnimation}
      {label}
      {children}
    </Button>


  if(fullWidth)
    return <Box width={1}>{mainButton}</Box>

  return <span>{mainButton}</span> 
}

LoadingButton.defaultProps = {
  color: "primary",
  variant: "contained"
}