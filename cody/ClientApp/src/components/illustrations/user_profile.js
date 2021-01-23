import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function UserProfile(props){
  const svgColor = Colors.primary;
  const svgColorSecondary = Colors.secondary;

  return (
    <Box
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 300"><defs><clipPath id="clip-path"><circle cx="-152.26" cy="-45.49" r="97.58" fill="none"></circle></clipPath></defs><circle cx="119.12" cy="106.27" r="68.98" fill="#e6e6e6" opacity="0.45"></circle><path d="M128.33,74.61s2,9.64,1.13,16.31a4.94,4.94,0,0,1-5.58,4.25c-3.35-.48-7.75-2.12-9.45-7.15l-3.94-8.2s-2.28-5.22,2.76-9.84S127.4,68.67,128.33,74.61Z" fill="#f4a28c"></path><polygon points="111.21 81.31 109.93 113.56 127.75 112.99 121.52 89.75 111.21 81.31" fill="#f4a28c"></polygon><path d="M126,75.3a39.79,39.79,0,0,1-9.1.38,8.19,8.19,0,0,1,1.06,8.94,6.67,6.67,0,0,1-7.7,3.6l-1.33-12.58a10,10,0,0,1,4-9.48,37,37,0,0,1,3.95-2.54c3.45-1.88,9-.1,12-2.92a2.37,2.37,0,0,1,3.92,1.1c1,3.75,1.05,9.85-3.87,12.55A9.3,9.3,0,0,1,126,75.3Z" fill="#24285b"></path><path d="M118.93,84.21s-.52-3.76-3.32-3.13-2.07,6.06,1.83,6.11Z" fill="#f4a28c"></path><path d="M129.28,80.75l3.17,3.44a1.58,1.58,0,0,1-.69,2.57l-3.66,1.15Z" fill="#f4a28c"></path><path d="M123.1,94.78A11.66,11.66,0,0,1,117,92.05s1,5.83,8.07,10.85Z" fill="#ce8172" opacity="0.31"></path><path d="M72.65,157.25s-1.06-43.3,45.64-45.54,45.47,47.45,45.47,47.45S119.7,199.32,72.65,157.25Z" fill={svgColor}></path><circle cx="282.06" cy="106.18" r="68.98" fill="#e6e6e6" opacity="0.45"></circle><path d="M291.26,74.51s2,9.64,1.13,16.32a4.94,4.94,0,0,1-5.57,4.25c-3.36-.49-7.75-2.12-9.45-7.16l-3.94-8.19s-2.29-5.23,2.76-9.84S290.34,68.57,291.26,74.51Z" fill="#f4a28c"></path><polygon points="274.14 81.21 272.86 113.46 290.68 112.89 284.46 89.66 274.14 81.21" fill="#f4a28c"></polygon><path d="M281.86,84.11s-.52-3.75-3.31-3.13-2.08,6.06,1.83,6.11Z" fill="#f4a28c"></path><path d="M292.21,80.65l3.17,3.44a1.58,1.58,0,0,1-.69,2.58L291,87.81Z" fill="#f4a28c"></path><path d="M286,94.68A11.63,11.63,0,0,1,279.91,92s.95,5.83,8.07,10.86Z" fill="#ce8172" opacity="0.31"></path><path d="M235.58,157.15s-1.05-43.3,45.65-45.54,45.47,47.45,45.47,47.45S282.63,199.22,235.58,157.15Z" fill={svgColor}></path><path d="M283.94,77.77l14.51-1.28s-1.79-10.47-12-12.26-16.09,3.83-16.85,14.56,4,15.29,4,15.29S286.8,94.36,283.94,77.77Z" fill="#24285b"></path><path d="M275.58,66s-12.37,2.46-12.37,21.13-14.64,27.7-2.55,38.93,31.49,3.92,23.32-11.23,4.7-20.6,0-37S275.58,66,275.58,66Z" fill="#24285b"></path><rect x="68.66" y="196.69" width="105.52" height="66.31" fill="#24285b"></rect><rect x="98.87" y="230.02" width="45.28" height="21.45" fill={svgColor}></rect><rect x="90.36" y="208.4" width="62.3" height="7.49" fill={svgColorSecondary} opacity="1"></rect><rect x="233.04" y="196.69" width="105.52" height="66.31" fill="#24285b"></rect><rect x="263.25" y="230.02" width="45.28" height="21.45" fill={svgColor}></rect><rect x="254.74" y="208.4" width="62.3" height="7.49" fill={svgColorSecondary} opacity="1"></rect></svg>
    </Box>
  );
}