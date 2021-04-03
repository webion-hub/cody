export function DataTab(props){
	if(props.index !== props.tabValue)
		return null;
	return props.children;
}