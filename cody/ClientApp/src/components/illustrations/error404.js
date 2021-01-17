import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function Error404(props){
  const svgColor = Colors.primary;

  return (
    <Box
      width={props.size == "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size == "100%" ? props.size : null} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 400 300"><rect x="92.16" y="55.69" width="227.75" height="157.06" fill="#e6e6e6"/><rect x="92.16" y="88.39" width="227.75" height="124.36" fill="#ccc" opacity="0.44"/><polygon points="311.21 179.69 293.86 204.36 310.19 204.36 310.19 212.75 319.91 212.75 319.3 182.66 311.21 179.69" opacity="0.08"/><path d="M95,101.72s4.72-3.18,6.93,8.5-4.27,21.6,11.25,24,25.68-4.16,29.26,14.48,23.74,27.07,16.85,43.92-12.64,20.13-12.64,20.13H92.16S91.75,108.36,95,101.72Z" opacity="0.08"/><ellipse cx="100.51" cy="272.61" rx="73.82" ry="4.78" fill="#e6e6e6" opacity="0.45"/><ellipse cx="318.45" cy="272.05" rx="36.91" ry="3.72" fill="#e6e6e6" opacity="0.45"/><circle cx="110.53" cy="70.1" r="4.38" fill="#24285b"/><circle cx="123.56" cy="70.1" r="4.38" fill={svgColor}/><circle cx="135.84" cy="70.1" r="4.38" fill="#ffd200"/><rect x="259.16" y="40.05" width="84.69" height="63.98" fill="#24285b"/><path d="M67.06,264.43s-1.23,3.42-4.32,3.68-3.89,3.28-1.12,4.06,9.94-2.78,9.94-2.78l-.21-4.45Z" fill={svgColor}/><path d="M109.46,264.43s1.22,3.42,4.31,3.68,3.89,3.28,1.12,4.06-9.93-2.78-9.93-2.78l.2-4.45Z" fill={svgColor}/><path d="M154.14,137a2.5,2.5,0,0,1,0-3.54l14.91-14.9a2.5,2.5,0,0,1,3.53,3.53L157.67,137A2.5,2.5,0,0,1,154.14,137Z" fill="#fff"/><path d="M169.29,137.24l-14.91-14.91a2.5,2.5,0,1,1,3.54-3.53l14.9,14.9a2.5,2.5,0,1,1-3.53,3.54Z" fill="#fff"/><path d="M236.82,137a2.5,2.5,0,0,1,0-3.54l14.91-14.9a2.5,2.5,0,1,1,3.53,3.53L240.36,137A2.52,2.52,0,0,1,236.82,137Z" fill="#fff"/><path d="M252,137.24l-14.91-14.91a2.5,2.5,0,1,1,3.54-3.53l14.9,14.9a2.5,2.5,0,1,1-3.53,3.54Z" fill="#fff"/><text transform="translate(274.39 83.06)" fontSize="28.4" fill="#fff" fontFamily="Roboto" fontWeight="700">404</text><path d="M184.94,179.69a2.49,2.49,0,0,1-2.48-2.3c-.7-8.51,2.53-25.26,19.72-27.7,5.37-.75,9.86.48,13.34,3.68,8.17,7.51,7.36,23.3,7.33,24a2.5,2.5,0,1,1-5-.28c0-.14.71-14.1-5.72-20-2.36-2.16-5.38-2.94-9.25-2.4C186,157,187.37,176.17,187.44,177a2.5,2.5,0,0,1-2.29,2.69Z" fill="#fff"/><path d="M113.41,127.79s22,4.45,20.19,25,18.19,31.78,5.93,43.64-28.6,5.19-28.6,5.19Z" fill={svgColor}/><path d="M113.41,127.79s22,4.45,20.19,25,18.19,31.78,5.93,43.64-28.6,5.19-28.6,5.19Z" fill="#fff" opacity="0.39"/><path d="M95.2,107.45A28.81,28.81,0,0,1,97,114.91a2.32,2.32,0,0,1-2.25,2.4,5.1,5.1,0,0,1-4.93-2.56l-2.47-3.47a4.15,4.15,0,0,1,.5-4.77C89.83,104,94.3,104.78,95.2,107.45Z" fill="#f4a28c"/><polygon points="88.49 112.15 88.68 127.28 97.01 126.58 93.52 115.85 88.49 112.15" fill="#f4a28c"/><path d="M87.82,114.88h0a.42.42,0,0,0,.43.31,3.08,3.08,0,0,0,2.93-2.28,3.84,3.84,0,0,0-1.2-4,18.42,18.42,0,0,0,4.18-.9,4.42,4.42,0,0,0,1.27-.67l.15-3.66s.84-3.86-1.33-4-2.44,2.36-4.49,1.2-2.6-1.65-4-.29.85,2.11-1.84,2.88-2.44,1.89-2.11,3.12a2.2,2.2,0,0,0,.84,1A14.18,14.18,0,0,1,87.82,114.88Z" fill="#24285b"/><path d="M91.62,112.64s-.54-1.7-1.78-1.19-.48,3,1.33,2.68Z" fill="#f4a28c"/><path d="M96.13,110.22l1.73,1.34a.74.74,0,0,1-.11,1.24l-1.6.82Z" fill="#f4a28c"/><path d="M94,117.29a7.1,7.1,0,0,1-3.36-1.08s.52,3,4.41,4.23Z" fill="#ce8172" opacity="0.31"/><path d="M104.41,125.82a106.54,106.54,0,0,0-39.94,8.54,15.39,15.39,0,0,0-7.77,21.06l21.73,43.35,40.28-2.39s7.34-24.36,5.87-51.91A19.8,19.8,0,0,0,104.41,125.82Z" fill={svgColor}/><path d="M78.43,198.77l-12,66.28h6l15.09-36a62.42,62.42,0,0,1,26.79-30.17l4.42-2.51Z" fill="#24285b"/><path d="M75.1,140.12a21.4,21.4,0,0,1,7.67,19.57C80.93,172.24,79,182,90.6,179.07s17.83-29.83,17.83-29.83l13.5.33-2.33,30-7.83.54a8.46,8.46,0,0,0-7.72,6.78l-2.11,10.47-23.51,1.39-3.33-5L60.43,177.91,58.6,152.57Z" opacity="0.08"/><rect x="92.24" y="140.49" width="26.16" height="35.83" transform="matrix(-1, -0.07, 0.07, -1, 199.66, 323.6)" fill="#ffd200"/><path d="M118.71,196.38l-6.21,68.67h-8s1.87-51.67-12.57-62.67Z" fill="#24285b"/><path d="M76,144a9.81,9.81,0,0,0-17.56-5.74c-4.62,5.9-8.88,15.74-8.53,31.9.75,34.5,21,43.75,52.25,6L96,171.41S83.7,181.85,72.43,182C64,182.12,76.57,160.46,76,144Z" fill={svgColor}/><path d="M76,144a9.81,9.81,0,0,0-17.56-5.74c-4.62,5.9-8.88,15.74-8.53,31.9.75,34.5,21,43.75,52.25,6L96,171.41S83.7,181.85,72.43,182C64,182.12,76.57,160.46,76,144Z" fill="#fff" opacity="0.39"/><path d="M118.48,157.75s-9,16.53-27,11.86l-.39,5.79,26.1,1.77Z" opacity="0.08"/><path d="M97.14,172.28s3.68-6.5,8.18-4.78-3.16,8.66-3.16,8.66Z" fill="#f4a28c"/><path d="M137.68,261.51s-8.52-2.33-10.37-10.25c0,0,13.19-2.67,13.57,10.95Z" fill={svgColor} opacity="0.58"/><path d="M138.72,260.66s-5.95-9.4-.71-18.2c0,0,10,6.38,5.57,18.22Z" fill={svgColor} opacity="0.73"/><path d="M140.25,260.67s3.15-9.93,12.65-11.81c0,0,1.78,6.45-6.15,11.84Z" fill={svgColor}/><polygon points="134.08 260.45 135.8 272.26 146.68 272.3 148.28 260.51 134.08 260.45" fill="#24285b"/><rect x="274.39" y="104.03" width="45.53" height="15.69" opacity="0.08"/><rect x="316.06" y="191.51" width="6.47" height="65.12" fill="#e6e6e6"/><polygon points="319.91 157.22 293.86 197.13 319.91 197.13 345.97 197.13 319.91 157.22" fill="#ffd200"/><rect x="310.19" y="251.05" width="18.89" height="21.26" fill="#24285b"/><rect x="317.85" y="172.06" width="3.7" height="12" fill="#24285b"/><rect x="317.85" y="186.4" width="3.7" height="3.7" fill="#24285b"/></svg>    
    </Box>
  );
}