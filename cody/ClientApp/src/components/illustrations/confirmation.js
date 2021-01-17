import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function Confirmation(props){
  const svgColor = Colors.primary;

  return (
    <Box
      width={props.size == "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size == "100%" ? props.size : null} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 300"><rect x="152.61" y="41.72" width="142.26" height="175.91" fill="#e6e6e6"/><rect x="190.23" y="170.64" width="66.6" height="25.02" fill="#ffd200"/><path d="M158,100.17s14.32,2.15,11.77,11.94A34.47,34.47,0,0,1,160.05,128v22L181,173.72l6.91-14,19.41,9s-14.81,35.4-11.24,48.93H169.77l-23.93-53.36,2.71-46Z" opacity="0.09"/><path d="M191.39,167.78s11.4,1.65,4.59,13.57-11.91,49.51-32.17,40.41Z" fill="#f4a28c"/><path d="M191.39,167.78s11.4,1.65,4.59,13.57-11.91,49.51-32.17,40.41Z" opacity="0.09"/><polygon points="147.37 106.76 140.7 130.3 153.94 133.05 153.48 114.81 147.37 106.76" fill="#f4a28c"/><path d="M153.75,118.8a8.86,8.86,0,0,1-4-3.1s-.34,4.47,4,9.44Z" fill="#ce8172" opacity="0.31"/><path d="M161.08,107.44s-.66,7.44-2.76,12.1a3.76,3.76,0,0,1-5,1.86c-2.33-1.09-5.16-3.24-5.29-7.27L147,107.31a6.71,6.71,0,0,1,4.17-6.54C155.83,98.53,161.72,102.93,161.08,107.44Z" fill="#f4a28c"/><path d="M147,131.61l7,1.44s28.8,17,27.78,39-15.07,47.75-15.07,47.75h-49S83.9,140.48,147,131.61Z" fill={svgColor}/><rect x="177.84" y="155.46" width="14.64" height="26.48" transform="translate(75.95 -56.73) rotate(21.82)" fill="#ffd200"/><path d="M139.42,146.09s15.54,4.11,15.79,24.28-1.53,33.45,14.56,32.17l-40.48,17.22H117.63s-7.21-16.46-8.3-34.84S127.45,143.26,139.42,146.09Z" opacity="0.09"/><polygon points="117.63 219.76 115.64 251.56 179.21 249.77 166.65 219.76 117.63 219.76" fill="#24285b"/><path d="M152.15,112.35s.45-2.84-1.72-3-2.83,3.94,0,4.84Z" fill="#f4a28c"/><path d="M127.16,142.64s12.47-2.49,16.89,10.94.08,51.22,9.45,54.51,29.33-29.74,29.33-29.74-.19-10.75,7.1-13.82,2.69,13.05-1.15,16.89S174.77,229,145,228.07,103,153.78,127.16,142.64Z" fill="#f4a28c"/><path d="M160.42,112.11,162,115.3a1.2,1.2,0,0,1-1.06,1.72l-2.91,0Z" fill="#f4a28c"/><path d="M161.13,97.79s7.27,8.55-2.14,10.34-11.35,3.48-10.44,13,4.62,18.29-7.85,24.27-1.76,16-4,27.69-13.28,19.78-27.32,11.81-22.73-28.41-7.66-40.66,34-15.19,34-34.92S151.4,88.6,161.13,97.79Z" fill="#24285b"/><circle cx="222.83" cy="116.47" r="32.34" fill={svgColor}/><circle cx="170.52" cy="57.33" r="5.15" fill="#ffd200"/><circle cx="185.04" cy="57.33" r="5.15" fill={svgColor}/><circle cx="198.93" cy="57.33" r="5.15" fill="#24285b"/><polyline points="209.09 116.47 219.04 129.68 235.13 104.28" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7"/></svg>
    </Box>
  );
}