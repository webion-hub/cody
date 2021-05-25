import { makeStyles } from '@material-ui/core/styles';
import { VerifiedLabel } from "src/components/typography/verified_label";
import { TypographyWithLoading } from "src/components/typography/typography_with_loading";

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      "& > *": {
        margin: "0 auto"
      }
    },
  },
  centerText: {
    [theme.breakpoints.down('xs')]: {
      "& > *": {
        margin: "0 auto"
      }
    }, 
  },
  joinButton: {
    marginTop: theme.spacing(1)
  },
  bookmarkButton: {
    marginBottom: 2
  },
  shiftLeft: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 48
    }, 
  }
}));

export function InfoBox(props){
	const classes = useStyles();
  const { 
    className,
    leftIcon,
    title,
    subTitle,
    verified,
    button,
    loading,
   } = props

  return (
    <div className={className}>
      <TypographyWithLoading
        className={`${classes.title} ${classes.centerText}`}
        variant="h5"
        noWrap
        loading={loading}
      >
        {leftIcon}
        <VerifiedLabel
          label={title}
          verified={verified}
          iconSize={22}
          translateIconY={0}
        />
      </TypographyWithLoading>
      <TypographyWithLoading
        variant="caption"
        noWrap
        loading={loading}
        className={`${classes.centerText} ${subTitle && leftIcon ? classes.shiftLeft : ""}`}
      >
        {subTitle}
      </TypographyWithLoading>
      {button}
    </div>
  )
}