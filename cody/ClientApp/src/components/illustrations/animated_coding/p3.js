import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from 'src/lib/default_values/themes/colors/main_colors';

export function P3(props){
  const svgColor = Colors.primary;
  const svgColorSecondary = Colors.secondary;

  return (
    <Box 
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} display="block" xmlns="http://www.w3.org/2000/svg" id="ad2c1540-f2d5-4916-9c24-0a209d7ffb18" data-name="Layer 1" viewBox="0 0 273.25 205.11998"><defs><style>{`.bd3a2e8e-4fc6-4986-a4c9-623292af1bc9{fill:none;}.a90d3c09-4cbb-4c60-8bdc-8e73fc615714{fill:#24285b;}.bb3de5a6-5acf-42ca-8315-e028124552f1{fill:${svgColor};}.bd6653b8-a8c7-4867-9ec4-63d85453039a{fill:${svgColorSecondary};}.f5083505-fced-4426-b2e3-2b1bb1160480{fill:#fff;}`}</style></defs><rect className="bd3a2e8e-4fc6-4986-a4c9-623292af1bc9" width="273.25" height="205.11998"/><rect className="a90d3c09-4cbb-4c60-8bdc-8e73fc615714" width="125.95" height="125.94999"/><rect className="bb3de5a6-5acf-42ca-8315-e028124552f1" x="36.81" y="55.27" width="40.45999" height="4.53"/><rect className="bd6653b8-a8c7-4867-9ec4-63d85453039a" x="48.41" y="42.66" width="36.16999" height="4.53"/><rect className="bd6653b8-a8c7-4867-9ec4-63d85453039a" x="82.89" y="90.44999" width="18.87" height="4.53"/><rect className="bd6653b8-a8c7-4867-9ec4-63d85453039a" x="63.83" y="77.72" width="18.87" height="4.53"/><rect className="bb3de5a6-5acf-42ca-8315-e028124552f1" x="48.41" y="66.21" width="48.21" height="4.53"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="21.8" y="66.21" width="18.13" height="4.53"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="39.86" y="78.1" width="18.13" height="4.53001"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="22.68" y="102.38" width="18.13" height="4.53"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="10.2" y="55.27" width="18.13" height="4.53"/><circle className="f5083505-fced-4426-b2e3-2b1bb1160480" cx="8.25" cy="7.63" r="2.13"/><circle className="bb3de5a6-5acf-42ca-8315-e028124552f1" cx="14.59" cy="7.63" r="2.13"/><circle className="bd6653b8-a8c7-4867-9ec4-63d85453039a" cx="20.57999" cy="7.63" r="2.13"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="10.2" y="20.84" width="18.13" height="4.53"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="21.8" y="32.16" width="18.13" height="4.53"/><rect className="bd6653b8-a8c7-4867-9ec4-63d85453039a" x="48.41" y="32.16" width="36.16999" height="4.53"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="21.8" y="42.66" width="18.13" height="4.53"/><rect className="bb3de5a6-5acf-42ca-8315-e028124552f1" x="35.57999" y="20.84" width="37.35" height="4.53"/><rect className="f5083505-fced-4426-b2e3-2b1bb1160480" x="10.71" y="90.44999" width="18.13" height="4.53"/><rect className="bb3de5a6-5acf-42ca-8315-e028124552f1" x="36.09" y="90.44999" width="37.35001" height="4.53"/><rect className="bb3de5a6-5acf-42ca-8315-e028124552f1" x="47.99" y="102.36" width="37.34999" height="4.53"/><rect className="bb3de5a6-5acf-42ca-8315-e028124552f1" x="80.73999" y="20.84" width="26.52" height="4.53"/></svg>
    </Box>  
  );
}