import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import TreeView from '@material-ui/lab/TreeView';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import { GenericSearchBar } from './pickers/search_bars/generic_search_bar/generic_search_bar';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Collapse from '@material-ui/core/Collapse';

import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { Color } from 'src/lib/color/color';

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `2px dashed ${Color.o(theme.palette.secondary.main, 0.3)}`,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export default function CustomTreeView(){
  return (
    <>
			<GenericSearchBar/>
			<TreeView
				defaultCollapseIcon={<RemoveRoundedIcon/>}
				defaultExpandIcon={<AddRoundedIcon/>}
				multiSelect
			>
				<StyledTreeItem nodeId="1" label="Applications">
					<StyledTreeItem nodeId="2" label="Calendar" />
					<StyledTreeItem nodeId="3" label="Chrome" />
					<StyledTreeItem nodeId="4" label="Webstorm" />
				</StyledTreeItem>
				<StyledTreeItem nodeId="5" label="Documents">
					<StyledTreeItem nodeId="10" label="OSS" />
					<StyledTreeItem nodeId="6" label="Material-UI">
						<StyledTreeItem nodeId="7" label="src">
							<StyledTreeItem nodeId="8" label="index.js" />
							<StyledTreeItem nodeId="9" label="tree-view.js" />
						</StyledTreeItem>
					</StyledTreeItem>
				</StyledTreeItem>
			</TreeView>
    </>
  );
}