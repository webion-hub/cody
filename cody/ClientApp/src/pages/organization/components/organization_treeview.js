import React from "react";
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import TreeView from '@material-ui/lab/TreeView';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import TreeItem from '@material-ui/lab/TreeItem';

export default function OrganizationTreeView(){
  return (
    <>
			<TreeView
				defaultCollapseIcon={<ExpandMoreRoundedIcon />}
				defaultExpandIcon={<ChevronRightRoundedIcon />}
			>
				<TreeItem nodeId="1" label="Applications">
					<TreeItem nodeId="2" label="Calendar" />
					<TreeItem nodeId="3" label="Chrome" />
					<TreeItem nodeId="4" label="Webstorm" />
				</TreeItem>
				<TreeItem nodeId="5" label="Documents">
					<TreeItem nodeId="10" label="OSS" />
					<TreeItem nodeId="6" label="Material-UI">
						<TreeItem nodeId="7" label="src">
							<TreeItem nodeId="8" label="index.js" />
							<TreeItem nodeId="9" label="tree-view.js" />
						</TreeItem>
					</TreeItem>
				</TreeItem>
			</TreeView>
    </>
  );
}