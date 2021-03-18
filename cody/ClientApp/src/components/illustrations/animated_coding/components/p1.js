import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from 'src/lib/default_values/themes/colors/main_colors';

export function P1(props){
  const svgColorSecondary = Colors.secondary;

  return (
    <Box 
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} display="block" xmlns="http://www.w3.org/2000/svg" id="f5695e8d-17a2-4409-a1a2-6386916995c2" data-name="Layer 1" viewBox="0 0 273.25 205.38998"><defs><style>{`.ba66f002-5268-4cb5-b937-4f9b14420805{fill:none;}.e1819cb5-9f52-44fc-a447-a16b90f35aad{fill:${svgColorSecondary};}.f1ee94fb-7c27-4dcf-8cee-51da99ba612d{fill:#fff;}`}</style></defs><rect className="ba66f002-5268-4cb5-b937-4f9b14420805" y="0.27" width="273.25" height="205.11998"/><rect className="e1819cb5-9f52-44fc-a447-a16b90f35aad" x="168.33" width="60.06999" height="41.3"/><path className="f1ee94fb-7c27-4dcf-8cee-51da99ba612d" d="M190.29,28.76a1.41,1.41,0,0,1-.86-.3l-9-7.12a1.35008,1.35008,0,0,1-.53-1.08,1.41,1.41,0,0,1,.52-1.09l9-7.25a1.39386,1.39386,0,1,1,1.75,2.17h0l-7.65,6.15,7.64,6a1.39,1.39,0,0,1-.87,2.48Z"/><path className="f1ee94fb-7c27-4dcf-8cee-51da99ba612d" d="M206.6,28.76a1.39,1.39,0,0,1-.86-2.48l7.63-6-7.64-6.15a1.39073,1.39073,0,0,1,1.74-2.17h0l9,7.25a1.38,1.38,0,0,1,0,2.17l-9,7.12A1.40987,1.40987,0,0,1,206.6,28.76Z"/><path className="f1ee94fb-7c27-4dcf-8cee-51da99ba612d" d="M194.67,28.76a1.47,1.47,0,0,1-.58-.12,1.4,1.4,0,0,1-.69-1.85l6.57-14.36a1.39,1.39,0,1,1,2.52,1.15l-6.56,14.37A1.38,1.38,0,0,1,194.67,28.76Z"/></svg>
    </Box>  
  );
}