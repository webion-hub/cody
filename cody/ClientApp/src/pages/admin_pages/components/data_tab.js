export function DataTab(props){
	return (
		<div
			hidden={props.index !== props.tabValue}
		>
			{props.children}
		</div>
	);
}