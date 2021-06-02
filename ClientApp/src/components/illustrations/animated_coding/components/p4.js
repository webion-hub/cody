import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from 'src/lib/default_values/themes/colors/main_colors';

export function P4(props){
  const svgColor = Colors.primary;
  const svgColorSecondary = Colors.secondary;

  return (
    <Box 
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} display="block" xmlns="http://www.w3.org/2000/svg" id="e187f4d6-de75-4e62-aefb-8f250c176ce2" data-name="Layer 1" viewBox="0 0 273.25 205.39"><defs><style>{`.bfb76640-a9dc-435c-be8d-65bcc10533d0{fill:none;}.e61bde95-3eec-4a1e-b1c9-b00fcf4d8dfe{fill:#f4a28c;}.b89db46e-8779-4947-9dd6-eda15c35f828{opacity:0.08;isolation:isolate;}.b4f318a4-21b9-4f8f-bab6-fb95ec1f538a{fill:${svgColorSecondary};}.ec2bc5b2-e4da-4960-b3f6-0249d19be98d{fill:#fff;}.e822f6c1-8011-4b00-9331-86d1e12af9d1{fill:${svgColor};}`}</style></defs><rect className="bfb76640-a9dc-435c-be8d-65bcc10533d0" width="273.25" height="205.38998"/><path className="e61bde95-3eec-4a1e-b1c9-b00fcf4d8dfe" d="M137.35,79.4s1.64-3.73,3.86-3,4.19,10.46-3.64,9.95Z"/><path className="b89db46e-8779-4947-9dd6-eda15c35f828" d="M110.24,57.8s-11.63,3.11-6.52,20.19,8.53,43.91-7.1,47.85h33.79l-2.77-43.33Z"/><polygon className="e61bde95-3eec-4a1e-b1c9-b00fcf4d8dfe" points="123.63 96.26 119.06 120.84 135.72 120.84 132.77 96.26 123.63 96.26"/><path className="e61bde95-3eec-4a1e-b1c9-b00fcf4d8dfe" d="M117.64,74.46s-3.53,25.42,8.45,27.7,13.62-27.7,13.62-27.7,1.93-9.17-4.7-15.13S114.58,59.29,117.64,74.46Z"/><path className="b4f318a4-21b9-4f8f-bab6-fb95ec1f538a" d="M117.38,79.4l-1.23-3.36a58.64785,58.64785,0,0,0-3.16-7.12c-2.13-4.06-5.19-12.17.94-17,8.42-6.64,11.23,1.8,16.59-4.46s12.77,2.16,13.79,5.48,8.17,5.62,5.87,12.51-2.37,14.1-10.61,12.9-17.13-7.81-17.13-7.81S120.07,74.2,117.38,79.4Z"/><circle className="ec2bc5b2-e4da-4960-b3f6-0249d19be98d" cx="122.81999" cy="84.71" r="4.57001"/><circle className="ec2bc5b2-e4da-4960-b3f6-0249d19be98d" cx="132.89" cy="85.10999" r="4.57001"/><path className="e822f6c1-8011-4b00-9331-86d1e12af9d1" d="M171.5,205.39H79.73c-5.22-13.69995-26.39-78.73,39.33-84.55h16.66S205.66,130.92,171.5,205.39Z"/><polygon className="b89db46e-8779-4947-9dd6-eda15c35f828" points="110.32 173.45 106.51 205.39 90.64 205.39 92.32 196.18 82.89 159.36 95.23 159.36 110.32 173.45"/><path className="e61bde95-3eec-4a1e-b1c9-b00fcf4d8dfe" d="M117.38,79.4s-1.64-3.73-3.86-3-3.42,11,4.42,10.51Z"/><polygon className="b4f318a4-21b9-4f8f-bab6-fb95ec1f538a" points="163.16 150.19 151.77 197.71 150.96 205.39 104.87 205.39 103.27 194.25 95.23 159.36 93.12 150.19 163.16 150.19"/><circle className="ec2bc5b2-e4da-4960-b3f6-0249d19be98d" cx="128.75999" cy="171.07001" r="6.07001"/><path className="b89db46e-8779-4947-9dd6-eda15c35f828" d="M122.81,100.72s5,3,9-.24c0,0,.28,7.59-10,5.64Z"/></svg>
    </Box>  
  );
}