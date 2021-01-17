import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function RocketLaunch(props){
  const svgColor = Colors.primary;

  return (
    <Box
      width={props.size == "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size == "100%" ? props.size : null} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><path d="M86.19,279.55s-32.31,2.26-45.59-3.19-3.75-21.1,9.19-24.51,20.77,15.32,26.55-2,20.88-25.95,30.53-14.17,19.52,15.53,29.73,5,19.62-1.93,23.76,13.5,52.15-14.18,70.54-8.4,32.34,22.81,43.57,4.43,24.51-23.15,32-12.26,9.87,23.83,23.15,14,31.32-1,26.21,10.55-39.33,15.48-39.33,15.48S117.82,268.1,86.19,279.55Z" fill="#e6e6e6" opacity="0.42"/><path d="M183.06,221s7.16,23.93-6.8,31-22.38-3.94-36.94,5.76-6.89-24-29.1-22.47S96.34,254.4,96.34,254.4,77.2,235.74,67.28,252s-5.13,31.54,39.59,26.94,77.53,1.66,116.27.83,110,6.83,113.8-14.61-16.09-30.95-36.77-18.93-17.22-15.68-41.16-3-52.26,27.28-59.5-28.8Z" fill="#e6e6e6"/><path d="M137.71,17.24C86.45,28.53,52.29,78,61.76,129.63c4.51,24.64,19,49.09,55.41,60.51,87.38,27.4,185.87,13.73,203.23-40.2s6.13-88.66-36.25-115.72C256.77,16.74,191.26,5.44,137.71,17.24Z" fill="#e6e6e6" opacity="0.3"/><path d="M348.58,102.92a7.76,7.76,0,0,0-7.77-7.76,7.45,7.45,0,0,0-1.25.11,10.44,10.44,0,0,0-9.22-5.52l-.38,0a12.42,12.42,0,1,0-24.08,0l-.38,0a10.47,10.47,0,0,0,0,20.94h36.32v-.08A7.76,7.76,0,0,0,348.58,102.92Z" fill="#e6e6e6"/><path d="M95.79,152.9a7.9,7.9,0,0,0-7.9-7.89,7.47,7.47,0,0,0-1.26.11,10.64,10.64,0,0,0-9.38-5.61l-.39,0a12.34,12.34,0,0,0,.39-3.06,12.64,12.64,0,0,0-25.27,0,12.82,12.82,0,0,0,.39,3.06l-.39,0a10.65,10.65,0,0,0,0,21.29H88.92v-.07A7.9,7.9,0,0,0,95.79,152.9Z" fill="#e6e6e6"/><circle cx="124.49" cy="63.01" r="15.85" fill="#ffd200"/><circle cx="124.49" cy="63.01" r="25.67" fill="#ffd200" opacity="0.22"/><path d="M164.8,79.62l-.91,2.23a30,30,0,0,0-2.26,11.42V201.91H173V93.27a30,30,0,0,0-2.26-11.42l-.91-2.23A2.71,2.71,0,0,0,164.8,79.62Z" fill="#ffd200"/><path d="M198.21,30.61l-.11-.11a3.36,3.36,0,0,0-4.76,0l-.11.11a50.32,50.32,0,0,0-14.41,34.94V205.39a3.06,3.06,0,0,0,3.18,2.92h27.44a3.06,3.06,0,0,0,3.18-2.92V65.55A50.32,50.32,0,0,0,198.21,30.61Z" fill={svgColor}/><polygon points="199.84 97.08 212.62 103.09 212.62 158.5 189.54 127.79 199.84 97.08" opacity="0.08"/><path d="M197.39,94l-.07-.08a2.14,2.14,0,0,0-3.2,0l-.07.08a38.51,38.51,0,0,0-9.67,25.52V221.66a2.13,2.13,0,0,0,2.13,2.14h18.41a2.14,2.14,0,0,0,2.14-2.14V119.52A38.51,38.51,0,0,0,197.39,94Z" fill={svgColor}/><path d="M197.39,94l-.07-.08a2.14,2.14,0,0,0-3.2,0l-.07.08a38.51,38.51,0,0,0-9.67,25.52V221.66a2.13,2.13,0,0,0,2.13,2.14h18.41a2.14,2.14,0,0,0,2.14-2.14V119.52A38.51,38.51,0,0,0,197.39,94Z" fill="#fff" opacity="0.32"/><path d="M226.64,79.62l.91,2.23a30,30,0,0,1,2.25,11.42V201.91H218.46V93.27a30.19,30.19,0,0,1,2.25-11.42l.92-2.23A2.71,2.71,0,0,1,226.64,79.62Z" fill="#ffd200"/><rect x="212.62" y="103.09" width="5.84" height="17.45" transform="translate(431.08 223.63) rotate(-180)" fill="#24285b"/><rect x="218.46" y="97.08" width="11.34" height="29.44" transform="translate(448.27 223.6) rotate(-180)" opacity="0.08"/><path d="M184.38,130.67l-7.48,36.72A41.93,41.93,0,0,1,165.2,189l-13.78,13.54a11.67,11.67,0,0,0-3,5L147,212.35a4.78,4.78,0,0,0,4.13,6.11l33.27,3.2Z" fill="#24285b"/><path d="M207.06,130.67l7.47,36.72A42,42,0,0,0,226.24,189L240,202.49a11.67,11.67,0,0,1,3,5l1.43,4.85a4.78,4.78,0,0,1-4.13,6.11l-33.27,3.2Z" fill="#24285b"/><rect x="172.98" y="103.09" width="5.84" height="17.45" fill="#24285b"/><rect x="161.63" y="97.08" width="11.34" height="29.44" opacity="0.08"/><path d="M191.17,198.71l-6.38,8.86a19.45,19.45,0,0,0-3.68,11.4v13.12h29.22V219a19.52,19.52,0,0,0-3.68-11.4l-6.38-8.86A5.6,5.6,0,0,0,191.17,198.71Z" fill="#24285b"/><rect x="189.55" y="110.82" width="11.84" height="4.8" fill="#24285b"/><rect x="188.19" y="50.41" width="15.05" height="35.77" rx="7.52" fill="#fff" opacity="0.34"/></svg>
    </Box>
  );
}