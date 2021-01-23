import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function PersonalData2(props){
  const svgColor = Colors.primary;
  const svgColorSecondary = Colors.secondary;

  return (
    <Box
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 300"><rect x="88.55" y="121.29" width="230.79" height="129.5" fill="#c1c1c1"/><rect x="88.29" y="113.46" width="231.05" height="129.5" fill="#e6e6e6"/><rect x="106.87" y="133.95" width="71.33" height="82.57" transform="translate(-0.22 0.18) rotate(-0.07)" fill="#fff"/><path d="M106.91,202.16s4.19-17.58,21.4-22.52,40.76-3.56,49.92,22.43l0,14.41-71.33.08Z" fill="#24285b"/><polygon points="139.97 155.19 135.8 177.9 149.3 186.12 146.43 162.22 139.97 155.19" fill="#f4a28c"/><path d="M147,165.94a8.3,8.3,0,0,1-4.06-2.56s.08,4.23,4.62,8.51Z" fill="#ce8172" opacity="0.31"/><path d="M150.28,153.57s1.4,6.91.75,11.68a3.54,3.54,0,0,1-4,3c-2.4-.36-5.53-1.55-6.73-5.16l-2.79-5.88a6.34,6.34,0,0,1,2-7C143.14,146.92,149.64,149.32,150.28,153.57Z" fill="#f4a28c"/><path d="M150.94,158l2.25,2.47a1.13,1.13,0,0,1-.5,1.84l-2.62.81Z" fill="#f4a28c"/><path d="M137.73,164.52l-2.41-9.27s-5.35-.93-3.73-4.42,3.75-1.16,3.84-5.16,3.35-4.81,5.65-2.56,1.23-.89,4.11-1.31,3.64.87,3.7,3.06,4.22-.14,5.28,2.63,1.21,5.46-5.95,5.89S146.17,159.72,137.73,164.52Z" fill={svgColorSecondary}/><path d="M135.8,177.9l4.14,38.66h19.23s-6-30.72-10.92-39.18A35.5,35.5,0,0,0,135.8,177.9Z" fill="#fff"/><path d="M143.52,160.4s-.36-2.68-2.36-2.25-1.51,4.33,1.29,4.38Z" fill="#f4a28c"/><rect x="194.32" y="136.3" width="69.71" height="12.26" transform="translate(-0.18 0.28) rotate(-0.07)" fill="#bababa"/><rect x="194.35" y="160.12" width="69.71" height="12.26" transform="translate(-0.2 0.28) rotate(-0.07)" fill="#bababa" opacity="0.5"/><rect x="194.39" y="183.93" width="103.56" height="32.47" transform="translate(-0.25 0.3) rotate(-0.07)" fill="#fff" opacity="0.36"/><path d="M135.8,177.9l.76-4.13,6.44,3.29,4.81-3.29,1.49,4.13A13,13,0,0,1,135.8,177.9Z" fill="#fff"/><polygon points="142.81 182.18 143.79 216.52 154.69 216.16 145.35 182.18 142.81 182.18" fill={svgColor}/><path d="M143,177.06l-1,4.25a1,1,0,0,0,1,1.24l2-.13a1,1,0,0,0,.75-1.59Z" fill={svgColor}/><path d="M106.91,202.16s6.55,13.69,24.44,6.47,37.22-9.92,46.89,2v5.82l-71.33.08Z" opacity="0.08"/><path d="M88.29,86.62v26.84h231V86.62Zm148,13a6.55,6.55,0,0,1-6.55,6.55H177.34a6.55,6.55,0,0,1-6.55-6.55h0A6.56,6.56,0,0,1,177.34,93h52.43a6.56,6.56,0,0,1,6.55,6.56Z" fill="#c1c1c1"/><rect x="191.21" y="45.21" width="26.13" height="24.77" fill={svgColor}/><path d="M192.36,67.17,180.44,93.72a3.44,3.44,0,0,0,3.15,4.86H224.3a3.45,3.45,0,0,0,3.18-4.79L216.23,67.17Z" fill={svgColor}/><rect x="196.49" y="52.36" width="14.55" height="14.55" fill="#fff" opacity="0.35"/><circle cx="211" cy="199.38" r="9.57" fill="#bababa"/></svg>
    </Box>  
  );
}