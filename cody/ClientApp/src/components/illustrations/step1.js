import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function Step1(props){
  const svgColor = Colors.primary;

  return (
    <Box
      width={props.size == "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size == "100%" ? props.size : null} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><path d="M76.63,132.39a9.22,9.22,0,0,0,6.89,11.29c10.66,2.39,27,7.88,38.64,3,15.07-6.39,5.64-41.06,5.64-41.06l-6.55.76s12.6,44.51-30.44,18.77c-5.48-3.28-12.59,1.09-14.18,7.28Z" fill={svgColor}/><path d="M76.63,132.39a9.22,9.22,0,0,0,6.89,11.29c10.66,2.39,27,7.88,38.64,3,15.07-6.39,5.64-41.06,5.64-41.06l-6.55.76s12.6,44.51-30.44,18.77c-5.48-3.28-12.59,1.09-14.18,7.28Z" fill="#fff" opacity="0.46"/><ellipse cx="204.08" cy="254.78" rx="173" ry="11.07" fill="#e6e6e6" opacity="0.45"/><path d="M64.08,249.58s.54,2.8,2.9,3.37,2.62,3,.38,3.29S60,252.89,60,252.89l.88-4.35Z" fill={svgColor}/><path d="M130.3,208.72s1.76,2.24,4.12,1.68,3.71,1.48,1.83,2.75-8.08.38-8.08.38l-1.2-4.28Z" fill={svgColor}/><rect x="94.08" y="213.83" width="61.79" height="38.78" fill="#ffd200"/><rect x="178.33" y="190.82" width="61.79" height="61.79" fill="#e6e6e6"/><rect x="261.57" y="155.59" width="61.79" height="97.02" fill="#e6e6e6"/><path d="M72.74,104.05a30.39,30.39,0,0,1,.57,8.11,2.47,2.47,0,0,1-2.77,2.11,5.44,5.44,0,0,1-4.7-3.56l-2-4.07a4.39,4.39,0,0,1,1.37-4.89C67.76,99.46,72.29,101.1,72.74,104.05Z" fill="#f4a28c"/><polygon points="64.24 107.38 63.6 123.4 72.46 123.12 69.36 111.58 64.24 107.38" fill="#f4a28c"/><path d="M71.56,104.39a19.06,19.06,0,0,1-4.52.19,4.09,4.09,0,0,1,.53,4.45,3.31,3.31,0,0,1-3.83,1.78l-.66-6.25a5,5,0,0,1,2-4.71,17.74,17.74,0,0,1,2-1.26c1.71-.93,4.49,0,6-1.45a1.18,1.18,0,0,1,2,.55c.51,1.86.52,4.89-1.92,6.23A4.33,4.33,0,0,1,71.56,104.39Z" fill="#24285b"/><path d="M68.07,108.82s-.25-1.87-1.64-1.55-1,3,.91,3Z" fill="#f4a28c"/><path d="M73.22,107.1l1.57,1.71a.78.78,0,0,1-.34,1.28l-1.82.57Z" fill="#f4a28c"/><path d="M70.15,114.07a5.76,5.76,0,0,1-3.05-1.36s.47,2.9,4,5.4Z" fill="#ce8172" opacity="0.31"/><path d="M63.6,123.4l6-.19a37.88,37.88,0,0,0,4.38-.38c4.66-.71,18.61-1.56,26.2,11.64,9.19,16-6.13,48-6.13,48h-27S20.89,130,63.6,123.4Z" fill={svgColor}/><path d="M73.42,136.59s3.72,3.84-.71,9.13c-5.45,6.52-7.37,15.43-4.11,23.28a25.14,25.14,0,0,0,12.88,13.47H67.1S53.66,167.2,48.17,152.62,73.42,136.59,73.42,136.59Z" opacity="0.08"/><path d="M71.85,130.2a13.8,13.8,0,0,0-15.7-4.6c-10.41,3.7-28.24,12.52-30.16,30-2.72,24.84,37,30.28,37,30.28l1.29-6.32S23.13,156.56,63,145C63,145,78.89,139.72,71.85,130.2Z" fill={svgColor}/><path d="M71.85,130.2a13.8,13.8,0,0,0-15.7-4.6c-10.41,3.7-28.24,12.52-30.16,30-2.72,24.84,37,30.28,37,30.28l1.29-6.32S23.13,156.56,63,145C63,145,78.89,139.72,71.85,130.2Z" fill="#fff" opacity="0.46"/><path d="M67.1,182.47l-8.43,66.2,7,1.2,11-42.39A15.58,15.58,0,0,1,90.13,196l14.49-2.37a14.23,14.23,0,0,1,14.55,6.86l5.8,10,7.92-2-8.29-16.06a19.61,19.61,0,0,0-18.48-10.57l-12,.67Z" fill="#24285b"/><path d="M64.3,180.47s6.8.13,5.61,4.38-6.95,1-6.95,1Z" fill="#f4a28c"/><path d="M342.53,240s-8.52-2.32-10.37-10.25c0,0,13.19-2.66,13.57,11Z" fill={svgColor} opacity="0.58"/><path d="M343.57,239.11s-5.95-9.41-.71-18.2c0,0,10,6.37,5.57,18.22Z" fill={svgColor} opacity="0.73"/><path d="M345.1,239.12s3.15-9.94,12.65-11.82c0,0,1.78,6.45-6.15,11.84Z" fill={svgColor}/><polygon points="338.93 238.89 340.65 250.7 351.53 250.75 353.13 238.95 338.93 238.89" fill="#24285b"/><path d="M122.48,106.2s-3-6.87-1.51-9.39,2.9,4.7,2.9,4.7,5.49-2,3.93,4.07Z" fill="#f4a28c"/><text transform="translate(119.39 239.97)" fontSize="20.21" fill="#24285b" fontWeight="800">1</text></svg>    
    </Box>
  );
}