import { useParams } from "react-router-dom";
import { OrganizationPageContent } from "./organization_page_content";
import { OrganizationControllerContext } from "./organization_controller_context";

export default function OrganizationPage(){
  const { id } = useParams();

	return (
		<OrganizationControllerContext id={id}>
			<OrganizationPageContent key={id}/>
		</OrganizationControllerContext>
	)
}