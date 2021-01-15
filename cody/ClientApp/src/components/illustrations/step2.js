import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/custom_colors';

export function Step2(props){
  const svgColor = Colors.primary;

  return (
    <Box
      width={props.size == "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? null : 0}
    >
      <svg width={props.size == "100%" ? props.size : null} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><path d="M171.46,91.8a10.41,10.41,0,0,0,1.59,14.87c9.73,7.6,23.81,21.12,38.07,21.71,18.49.75,25.62-39.26,25.62-39.26l-7.08-2.38s-8.63,51.6-40.19,4.47c-4-6-13.4-5-18,.59Z" fill={svgColor}/><path d="M171.46,91.8a10.41,10.41,0,0,0,1.59,14.87c9.73,7.6,23.81,21.12,38.07,21.71,18.49.75,25.62-39.26,25.62-39.26l-7.08-2.38s-8.63,51.6-40.19,4.47c-4-6-13.4-5-18,.59Z" fill="#fff" opacity="0.46"/><ellipse cx="204.08" cy="254.78" rx="173" ry="11.07" fill="#e6e6e6" opacity="0.45"/><path d="M203,185.77s2.33,1.64,4.43.42,4,.35,2.55,2.11-7.63,2.69-7.63,2.69L200,187.24Z" fill={svgColor}/><path d="M129.23,205.16s-1.36,2.5.1,4.44.11,4-1.8,2.78-3.56-7.27-3.56-7.27l3.44-2.8Z" fill={svgColor}/><rect x="94.08" y="213.83" width="61.79" height="38.78" fill="#e6e6e6"/><rect x="178.33" y="190.82" width="61.79" height="61.79" fill="#ffd200"/><rect x="261.57" y="155.59" width="61.79" height="97.02" fill="#e6e6e6"/><path d="M183.09,65.62a30.51,30.51,0,0,1-3,7.57,2.46,2.46,0,0,1-3.41.72A5.42,5.42,0,0,1,174,68.69l0-4.52a4.38,4.38,0,0,1,3.33-3.83C180.54,59.34,183.93,62.76,183.09,65.62Z" fill="#f4a28c"/><polygon points="173.97 64.99 166.55 79.2 174.68 82.73 176.81 70.97 173.97 64.99" fill="#f4a28c"/><path d="M181.87,65.42a18.93,18.93,0,0,1-4.16-1.76,4.09,4.09,0,0,1-1.43,4.25,3.33,3.33,0,0,1-4.22,0L174.13,62a5,5,0,0,1,3.81-3.41,17.51,17.51,0,0,1,2.32-.3c1.94-.11,4.07,1.87,6,1.23a1.18,1.18,0,0,1,1.53,1.33c-.34,1.9-1.63,4.65-4.41,4.81A4.3,4.3,0,0,1,181.87,65.42Z" fill="#24285b"/><path d="M176.83,67.93s.56-1.79-.83-2.11-2.22,2.28-.47,3.14Z" fill="#f4a28c"/><path d="M182.21,68.58l.69,2.22a.79.79,0,0,1-.85,1l-1.89-.27Z" fill="#f4a28c"/><path d="M176.46,73.57A5.85,5.85,0,0,1,174.28,71s-.81,2.82,1.32,6.59Z" fill="#ce8172" opacity="0.31"/><path d="M166.55,79.2l5.53,2.4a35.23,35.23,0,0,0,4.13,1.53c4.5,1.36,17.49,6.55,18.7,21.73,1.47,18.39-26.06,40.77-26.06,40.77L139.94,136S125.1,67,166.55,79.2Z" fill={svgColor}/><path d="M342.53,240s-8.52-2.32-10.37-10.25c0,0,13.19-2.66,13.57,11Z" fill={svgColor} opacity="0.58"/><path d="M343.57,239.11s-5.95-9.41-.71-18.2c0,0,10,6.37,5.57,18.22Z" fill={svgColor} opacity="0.73"/><path d="M345.1,239.12s3.15-9.94,12.65-11.82c0,0,1.78,6.45-6.15,11.84Z" fill={svgColor}/><polygon points="338.93 238.89 340.65 250.7 351.53 250.75 353.13 238.95 338.93 238.89" fill="#24285b"/><path d="M231,87.19s.21-8.5,3-10.33.69,6.2.69,6.2,6.59.6,2.06,6.06Z" fill="#f4a28c"/><text transform="translate(203.03 226.46)" fontSize="20.21" fill="#24285b" fontWeight="800">2</text><path d="M234,84s3.12-7,4.82-5.92-2.72,7.44-2.72,7.44Z" fill="#f4a28c"/><path d="M139.94,136s-5.66,18.38,8.29,22.13,39.18-5.15,51,29.57l5.47-2.61s-.75-30.83-32.38-42.55Z" fill="#24285b"/><path d="M143.89,144.6s15.87,30.44-18.12,54.92l3.46,5.64s35.32-12.55,35.86-56.19Z" fill="#24285b"/><path d="M165.09,95.6s-.52,7.41-10.39,16.09,1.17,27.54,1.17,27.54L139.94,136s-4.28-22.56-1.78-36.75,26.12-3.67,26.12-3.67Z" opacity="0.08"/><path d="M150.53,77.21c-17.85-.51-55.78,4.21-44.34,55.49h7.92s1-37.74,33.58-33.4a28.21,28.21,0,0,0,3.67.29c5.5,0,18.77-1,14.25-12.16A16.67,16.67,0,0,0,150.53,77.21Z" fill={svgColor}/><path d="M150.53,77.21c-17.85-.51-55.78,4.21-44.34,55.49h7.92s1-37.74,33.58-33.4a28.21,28.21,0,0,0,3.67.29c5.5,0,18.77-1,14.25-12.16A16.67,16.67,0,0,0,150.53,77.21Z" fill="#fff" opacity="0.46"/><path d="M112.7,132.7a14.17,14.17,0,0,1-.64,7.66c-1.53,3.45-4.21,4.09-6.38,2.68s2.81-7,2.81-7l-1.15-3.32Z" fill="#f4a28c"/></svg>    
    </Box>
  );
}