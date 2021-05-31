export function TabContent(props){
	if(props.index !== props.tabValue)
		return null;
	return props.children;
}