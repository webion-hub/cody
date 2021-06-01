import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Fade, Grid, LinearProgress } from "@material-ui/core";

import { useMobileView } from "src/lib/hooks/use_mobile_view";
import { SearchBarWithPageController } from "src/components/textfields/search_bars/search_bar_with_page_controller/search_bar_with_page_controller";
import { usePageController } from "src/lib/hooks/use_page_controller";

const useStyles = makeStyles((theme) => ({
	title: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: `calc(100vw - ${theme.spacing(4)}px)`
    },
	},
  searchBar: {
    marginBottom: theme.spacing(2),
  },
  linearProgress: {
    marginBottom: theme.spacing(1)
  }
}));

export function ListWithPages(props){
  const classes = useStyles();
  const mobileView = useMobileView()

  const {
    maxPageElements,
    getData,
    listItem: ListItem,
    title,
    notFoundMessage,
    rightIcon,
  } = props

	const pageController = usePageController({
		maxPageElements: maxPageElements,
		getData: getData
	})

	const {
		next,
		back,
		handleChange,
		loading,
		dataList
	} = pageController

  const getDataList = () => {
    if(loading)
      return;
      
    if(dataList.length === 0)
      return (
        <Typography>
          {notFoundMessage}
        </Typography>
      )

    return dataList.map((item, index) => 
      <ListItem
        index={index}
        key={index}
        data={item}
      />
    )
  }

  return (
    <>
      <Grid
        className={classes.title}
        container
        direction="row"
        alignItems="center"
      >
        <Typography
          variant={mobileView ? "h5" : "h4"}
          noWrap
        >
          {title}
        </Typography>
        {rightIcon}
      </Grid>
      <SearchBarWithPageController 
        className={classes.searchBar}
        onChange={handleChange}
        onBack={back.handle}
        onNext={next.handle}
        disableBack={back.disable}
        disableNext={next.disable}
      />
      <Fade 
        className={classes.linearProgress}
        in={loading}>
        <LinearProgress color="secondary"/>
      </Fade>
      {getDataList()}
    </>
  );
}