import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core'

import { MultipleSectionsBase } from "src/components/bases/layouts/multiple_sections_base";

import { OrganizationImageBackground } from "./components/organzation_image_background";
import { BackgroundWithLines } from "src/components/others/background_with_lines/background_with_lines";
import { OrganizationCourses } from "./components/organization_courses/organization_courses";
import CustomTreeView from '../../components/others/custom_treeview';
import OrganizationInfoArea from './components/organization_info_area/organization_info_area';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "relative",
		minHeight: `calc(100vh - ${436 + theme.appBar.fullHeight}px)`,
	}
}));

export function OrganizationPageContent(){
	const classes = useStyles();
	const theme = useTheme();

  return (
		<MultipleSectionsBase
			topSection={<OrganizationImageBackground/>}
			leftSection={<CustomTreeView/>}	
			centerSection={
				<>
					<OrganizationInfoArea/>
					<div className={classes.paper}>
						<OrganizationCourses/>
						<BackgroundWithLines background={theme.palette.background[550]}/>
					</div>
				</>
			}
		/>
  );
}