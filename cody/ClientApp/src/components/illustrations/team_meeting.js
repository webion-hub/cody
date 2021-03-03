import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from '../../lib/default_values/themes/colors/main_colors';

export function TeamMeeting(props){
  const svgColor = Colors.primary;
  const svgColorSecondary = Colors.secondary;

  return (
    <Box
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} height={props.height === "100%" ? props.height : null} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><title>_</title><ellipse cx="203.55" cy="252.81" rx="158.28" ry="16" fill="#e6e6e6" opacity="0.45"/><path d="M111.82,102.39a12.47,12.47,0,0,1,16.5-15.25c7.66,3,16.23,9.13,23.3,21.35,5.51,9.52,9.47,15.83,12.3,20a8,8,0,0,0,12.93.45l23.47-30,8.77,6.46s-19.8,49.19-42.07,47.2C147.82,150.91,122.24,136,111.82,102.39Z" fill={svgColor}/><path d="M111.82,102.39a12.47,12.47,0,0,1,16.5-15.25c7.66,3,16.23,9.13,23.3,21.35,5.51,9.52,9.47,15.83,12.3,20a8,8,0,0,0,12.93.45l23.47-30,8.77,6.46s-19.8,49.19-42.07,47.2C147.82,150.91,122.24,136,111.82,102.39Z" fill="#fff" opacity="0.64"/><path d="M126.08,244.46s1.31,3.63,4.59,3.91,4.14,3.48,1.19,4.32-10.56-3-10.56-3l.21-4.73Z" fill={svgColor}/><path d="M84.85,244.46s-1.3,3.63-4.58,3.91-4.14,3.48-1.19,4.32,10.56-3,10.56-3L89.42,245Z" fill={svgColor}/><path d="M104.26,68.89a33.86,33.86,0,0,1,3,8.47A2.72,2.72,0,0,1,105,80.43a6,6,0,0,1-6.06-2.38l-3.3-3.76a4.85,4.85,0,0,1,0-5.61C97.58,65.49,102.89,65.89,104.26,68.89Z" fill="#f4a28c"/><polygon points="97.25 72.9 96.47 90.61 106.26 90.34 102.9 77.56 97.25 72.9" fill="#f4a28c"/><path d="M105.67,72l2.18,1.36a.86.86,0,0,1,0,1.46L106.11,76Z" fill="#f4a28c"/><path d="M103.69,80.49A6.43,6.43,0,0,1,100.33,79s.51,3.2,4.41,6Z" fill="#ce8172" opacity="0.31"/><path d="M119.75,85.43A124.57,124.57,0,0,0,73,95.42a18,18,0,0,0-9.1,24.65l25.43,50.71L136.49,168s8.58-28.5,6.85-60.74A23.15,23.15,0,0,0,119.75,85.43Z" fill={svgColor}/><path d="M96.88,79.37l3.38-1.82.34-1.79a4.31,4.31,0,0,0,0-4.76s6.48-3.15,5-5.86-6.3-6.32-11-2.89S87.62,71.94,96.88,79.37Z" fill="#24285b"/><path d="M100.7,75.37s-.83-1.91-2.21-1.17-.2,3.51,1.87,3Z" fill="#f4a28c"/><path d="M93.55,88.69a75.54,75.54,0,0,1,17.69-2.82s8.25,32.93,1.75,59.46C113,145.33,103.75,111.91,93.55,88.69Z" fill="#fff"/><path d="M75.11,104s16.24,1.35,14.17,12.47,5,41.88,9.77,44.44l15.43,8.35-25.13,1.48-8.26-16.46L65.45,123.26Z" opacity="0.09"/><path d="M93.55,88.69s-.32-4,2.52-4.13a15,15,0,0,1,4.63.4s8.31-6.51,10.54.91C111.24,85.87,99.35,87.19,93.55,88.69Z" fill={svgColor}/><path d="M93.55,88.69s-.32-4,2.52-4.13a15,15,0,0,1,4.63.4s8.31-6.51,10.54.91C111.24,85.87,99.35,87.19,93.55,88.69Z" fill="#fff" opacity="0.77"/><path d="M99.35,87.45s-.94-3.13,1-3.52,3.76-1.66,4.18,2.35S101,90.71,99.35,87.45Z" fill="#24285b"/><path d="M100.66,89s6.24,22.08,6.3,36.28l6,20a88.5,88.5,0,0,0,2.49-21.79s-6.44-29.05-11-35.84Z" fill="#24285b"/><polygon points="200.32 98.96 201.94 96.07 210.05 101.85 208.07 104.67 200.32 98.96" fill="#fff"/><path d="M203.11,97.08s2.75-10.54,5.74-11.67.48,5.39.48,5.39,8.73,4.85,0,10.71Z" fill="#f4a28c"/><path d="M82.11,245.6l7.24-74.82L136.49,168l-8,77.61h-9.08s2.27-49.22-4.91-60.49l0-.05a4.1,4.1,0,0,0-7,.31c-9.86,18.38-15.79,60.23-15.79,60.23Z" fill="#24285b"/><path d="M67.22,99.36S26.83,136.08,31.5,146.89s47,29.5,47,29.5l5-6.28s-23.22-22-23.37-24.78,8.77-6.33,16.51-16.11S91.1,96.24,67.22,99.36Z" fill={svgColor}/><path d="M67.22,99.36S26.83,136.08,31.5,146.89s47,29.5,47,29.5l5-6.28s-23.22-22-23.37-24.78,8.77-6.33,16.51-16.11S91.1,96.24,67.22,99.36Z" fill="#fff" opacity="0.64"/><path d="M83.49,170.11s5.35,3.76,5.68,5.45-.44,8.33-2,8.88-5.7-.77-4.82-1.65l1.42-1.42s-4.86-2.41-5.28-5Z" fill="#f4a28c"/><path d="M240.89,88.27s-10.18-.51-12.79,6.26,1.08,39.28-2.53,41.39-28.65-8.75-28.65-8.75a26.64,26.64,0,0,0-5.1-3.33c-1.8-.69-.22,1.42-.15,2.07,0,0-7-3.45-7.19.39s36.87,23.64,47.61,20.65,8.74-57.4,8.74-57.4" fill="#f4a28c"/><polygon points="267.01 186.98 275.22 247.24 271.1 247.06 251.69 186.33 267.01 186.98" fill="#f4a28c"/><polygon points="247.59 186.48 237.47 245.62 233.33 245.44 233.54 185.55 247.59 186.48" fill="#f4a28c"/><path d="M275.22,247.24s2.17,3,5.1,3,3.19,4.14-1.51,3.51a26.12,26.12,0,0,1-4.31-.93,7.67,7.67,0,0,0-4,0,1.26,1.26,0,0,1-1.32-.59c-1.27-1.63,2.17-5.11,2.17-5.11Z" fill={svgColor}/><path d="M233.63,245.45s-2.42,2.81-5.34,2.54-3.53,3.86,1.2,3.63a26.11,26.11,0,0,0,4.38-.56,7.64,7.64,0,0,1,4,.31,1.27,1.27,0,0,0,1.37-.48c1.41-1.51-1.72-5.27-1.72-5.27Z" fill={svgColor}/><polygon points="262.99 138.96 275.99 203.93 224.86 205.05 232.44 138.64 262.99 138.96" fill="#24285b"/><path d="M240.78,67.31s-.89,6.14-.09,10.3a3.11,3.11,0,0,0,3.67,2.46A6.87,6.87,0,0,0,250,75.22l2.17-5.31a5.56,5.56,0,0,0-2.11-6.08C246.74,61.11,241.14,63.54,240.78,67.31Z" fill="#f4a28c"/><polygon points="251.69 68.4 251.72 88.73 244.17 88.2 246.23 74.16 251.69 68.4" fill="#f4a28c"/><path d="M240.42,71.2l-1.87,2.29a1,1,0,0,0,.53,1.59l2.35.59Z" fill="#f4a28c"/><path d="M238.62,67.42h0a23.85,23.85,0,0,1,12,8l.94,1.18s5.83-7.6,4-12.36S241.62,54.41,238.62,67.42Z" fill="#24285b"/><circle cx="256.05" cy="59.35" r="3.96" fill="#24285b"/><path d="M247.06,73s.18-2.38,2-2.09,1.54,3.73-.91,3.91Z" fill="#f4a28c"/><path d="M241.07,83.89l14.07.6L255,88.87s23.66.57,21.34,15.86S263,139,263,139l-27.43-.19A105.85,105.85,0,0,1,224,112.19c-3.88-14.54,16.94-23.92,16.94-23.92Z" fill={svgColor}/><path d="M267.8,98.42s-10.12,2.62-8.19,16.44-.27,18.46-16,19.36l2.45,5L263,139s4.28-7.61,5.35-10.43S267.8,98.42,267.8,98.42Z" opacity="0.09"/><rect x="220.03" y="112.35" width="25.61" height="34.54" transform="translate(-5.89 11.19) rotate(-2.72)" fill={svgColorSecondary}/><path d="M249.4,142.75s-2.22-5.4-7.36-4.86-1.93,10.15,4.88,10.68,21,17.71,30.09,9.57,9.69-52.64-1.67-60.25-11.8,15.64-7.42,29.32S275.43,157.37,249.4,142.75Z" fill="#f4a28c"/><path d="M286,145.77s-.05.53-.18,1.46c-.74,5.56-4.09,25.18-14.61,27.37-12.27,2.55-25.44-3.17-25.44-3.17l-2.58,5.89s20.17,20.51,35.07,14.13S299,168,299,168Z" fill={svgColor}/><path d="M286,145.77s-.05.53-.18,1.46c-.74,5.56-4.09,25.18-14.61,27.37-12.27,2.55-25.44-3.17-25.44-3.17l-2.58,5.89s20.17,20.51,35.07,14.13S299,168,299,168Z" fill="#fff" opacity="0.46"/><path d="M303.73,105.73a30.17,30.17,0,0,0-2.8,7.51,2.42,2.42,0,0,0,2,2.77,5.36,5.36,0,0,0,5.43-2l3-3.31a4.32,4.32,0,0,0,.07-5C309.73,102.79,305,103.07,303.73,105.73Z" fill="#f4a28c"/><polygon points="309.16 111.28 312.95 126.63 304.34 128.11 305.02 116.64 309.16 111.28" fill="#f4a28c"/><path d="M302.43,108.49l-2,1.17a.78.78,0,0,0,0,1.31l1.56,1Z" fill="#f4a28c"/><path d="M305,116s3.16-.68,4.21-1.68c0,0-.3,7.19-4.52,8.13Z" fill="#ce8172" opacity="0.31"/><path d="M307.45,111.06s.76-1.7,2-1,.13,3.13-1.71,2.61Z" fill="#f4a28c"/><path d="M313.52,110.75c-.22,0-.47,0-.7,0-.9.06-.72,1.17-1.78,1.13a5,5,0,0,0-.54-.06,1.41,1.41,0,0,0-1,.6,3.41,3.41,0,0,1-.8.85,1.29,1.29,0,0,1-1.05.1.61.61,0,0,1-.3-.2c-.14-.22,0-.51.11-.75a8,8,0,0,0,.48-1.17c.11-.35.2-.7.29-1s.47-1.18.3-1.46-.67-.35-.9-.54-.43-.54-.8-.74c-.83-.46-1.84-.49-2.69-.92a1.68,1.68,0,0,1-.79-.72.9.9,0,0,1,.11-1c.32-.32,1-.46.89-.9,0-.18-.2-.3-.35-.41a3.22,3.22,0,0,1-1.38-2.45,2.11,2.11,0,0,1,1.62-2.13c.58-.1,1.34,0,1.61-.51a1.85,1.85,0,0,0,.06-.88,1.88,1.88,0,0,1,3.19-1.39c.25.25.46.58.8.64s.82-.38,1.21-.65a2,2,0,0,1,2-.09,2.85,2.85,0,0,1,1.33,1.58,2,2,0,0,0,.35.73,1.34,1.34,0,0,0,.64.32c1,.25,2.24,0,3,.65a1.67,1.67,0,0,1,.24,2.23c-.26.32-.65.59-.66,1a1.13,1.13,0,0,0,.23.63c.51.82,1.1,1.77.76,2.67s-1.52,1.68-2.19,2.3-2,.39-2.48,1.21c-.21.37-.15.89-.46,1.18A.81.81,0,0,1,313.52,110.75Z" fill="#24285b"/><path d="M310.57,109.83s2.59-.83,3,1.18-2.43,2.85-3.92,1.36A3.85,3.85,0,0,0,310.57,109.83Z" fill="#f4a28c"/><rect x="289.91" y="212.83" width="55.9" height="39.95" fill="#e6e6e6"/><polygon points="304.67 252.78 301.98 217.6 290.77 219.31 287.43 232.8 289.91 252.78 304.67 252.78" opacity="0.08"/><path d="M303.26,248.16s-1.19,3.33-4.2,3.58-3.8,3.2-1.09,4,9.68-2.71,9.68-2.71l-.2-4.34Z" fill={svgColor}/><path d="M303.61,127.93l8.6-1.48s28.63,0,33.64,9.85,4,46.3-12.6,76.25l-33.9,1s1.88-22-4.44-34S269,142.11,303.61,127.93Z" fill={svgColor}/><path d="M333.25,212.55l-16.58-2.5a15.87,15.87,0,0,0-18.16,17.32l2.17,21.07h8.13l-.7-19.72a7.46,7.46,0,0,1,8.64-7.65C323.81,222.2,332.56,221.71,333.25,212.55Z" fill="#24285b"/><path d="M286.38,248.16s-1.2,3.33-4.2,3.58-3.8,3.2-1.1,4,9.69-2.71,9.69-2.71l-.2-4.34Z" fill={svgColor}/><path d="M330.35,139.81s-9.4,8.24-7.52,17.34c.31,1.47.63,3.25.94,5.2a51.92,51.92,0,0,1-12.18,42.5l-5.93,6.78,27.59.92,2.36-4.62,12.88-21.4Z" opacity="0.08"/><path d="M316.37,212.55l-16.58-2.5a15.87,15.87,0,0,0-18.16,17.32l2.16,21.07h8.14l-.7-19.72a7.46,7.46,0,0,1,8.64-7.65C306.93,222.2,315.68,221.71,316.37,212.55Z" fill="#24285b"/><path d="M346.33,137.2c6.28,8.84,11.87,28.36,7,55.87a18.44,18.44,0,0,1-17,15.16l-25.91,1.64v-8.45l19.69-2.85a7.54,7.54,0,0,0,6.14-9.67c-3.46-11.42-8.84-32.11-7.45-46.85C329.65,133.09,341.12,129.87,346.33,137.2Z" fill={svgColor}/><path d="M346.33,137.2c6.28,8.84,11.87,28.36,7,55.87a18.44,18.44,0,0,1-17,15.16l-25.91,1.64v-8.45l19.69-2.85a7.54,7.54,0,0,0,6.14-9.67c-3.46-11.42-8.84-32.11-7.45-46.85C329.65,133.09,341.12,129.87,346.33,137.2Z" fill="#fff" opacity="0.46"/><path d="M310.42,203.47s-10.51-.27-9,5.21,9,1.19,9,1.19Z" fill="#f4a28c"/><polygon points="275.44 211.84 271.2 187.85 301.3 187.85 303.91 208.3 317.71 208.5 317.71 211.84 275.44 211.84" fill={svgColorSecondary}/><circle cx="287.43" cy="199.35" r="3.01" fill="#fff"/><path d="M245.76,171.43s-1.79-4.43-2.58-3.79a1.33,1.33,0,0,0-.34,1.58s-1.85-3-2.74-3.11-2.56,2.42-2.43,4.4,5.51,6.81,5.51,6.81Z" fill="#f4a28c"/><path d="M159.9,241.54s-8.25-2.26-10-9.93c0,0,12.77-2.58,13.14,10.6Z" fill={svgColor} opacity="0.58"/><path d="M160.91,240.72s-5.76-9.11-.69-17.62c0,0,9.71,6.17,5.39,17.64Z" fill={svgColor} opacity="0.73"/><path d="M162.39,240.72s3-9.61,12.24-11.43c0,0,1.73,6.24-5.95,11.46Z" fill={svgColor}/><polygon points="156.41 240.51 158.08 251.94 168.61 251.99 170.16 240.56 156.41 240.51" fill="#24285b"/><path d="M303.38,50.53H296.8a18.55,18.55,0,0,0-18.55,18.56h0a18.56,18.56,0,0,0,11.53,17.17l3.7,10.13,1.44-8.85a16.79,16.79,0,0,0,1.88.1h6.58a18.56,18.56,0,0,0,18.55-18.55h0A18.56,18.56,0,0,0,303.38,50.53Z" fill="#f2f2f2"/><path d="M232.41,61.22h0A13.25,13.25,0,0,0,219.16,48H202a13.25,13.25,0,0,0-13.25,13.26h0A13.25,13.25,0,0,0,202,74.47h17.18a13.26,13.26,0,0,0,4.05-.64l9.2,4.09-3.94-7.28A13.2,13.2,0,0,0,232.41,61.22Z" fill="#f2f2f2"/><path d="M158.4,39.82H137.22a16.35,16.35,0,0,0-16.35,16.35h0a16.33,16.33,0,0,0,6.55,13.07l-4.66,9.24L133.16,72a16.43,16.43,0,0,0,4.06.53H158.4a16.35,16.35,0,0,0,16.34-16.35h0A16.35,16.35,0,0,0,158.4,39.82Z" fill="#f2f2f2"/></svg>
    </Box>
  );
}