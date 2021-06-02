import React from 'react';
import { Box } from '@material-ui/core';
import { Colors } from 'src/lib/default_values/themes/colors/main_colors';

export function P2(props){
  const svgColor = Colors.primary;

  return (
    <Box 
      width={props.size === "100%" ? null : props.size}
      maxWidth={props.maxWidth}
      margin={props.margin ? props.margin : 0}
    >
      <svg width={props.size === "100%" ? props.size : null} display="block" xmlns="http://www.w3.org/2000/svg" id="b11d0abb-dcb5-4d63-b400-5e7a9e1e60ac" data-name="Layer 1" viewBox="0 0 273.25 205.11998"><defs><style>{`.aa770d9f-086c-4e66-bcb5-0a49c2769ea0{fill:none;}.b6feb6fa-34db-4f37-99f3-3321151cad00{fill:#e6e6e6;}.b7acb335-1650-448a-81c6-eee7faf8c4d7{fill:#24285b;}.b9238b0c-34c8-45db-bde8-b6eac364bfe3{fill:${svgColor};}.a8e56b8d-2c17-4793-8a26-d5d32ee76194{fill:#c9c9c9;}`}</style></defs><rect className="aa770d9f-086c-4e66-bcb5-0a49c2769ea0" width="273.25" height="205.11998"/><rect className="b6feb6fa-34db-4f37-99f3-3321151cad00" x="170.61" y="66.21" width="102.64" height="59.35999"/><circle className="b7acb335-1650-448a-81c6-eee7faf8c4d7" cx="188.13997" cy="85.35998" r="5.96002" transform="translate(43.27603 232.3904) rotate(-69.88182)"/><circle className="b9238b0c-34c8-45db-bde8-b6eac364bfe3" cx="188.14" cy="106.12" r="5.96002" transform="translate(27.97063 250.77717) rotate(-71.56505)"/><rect className="a8e56b8d-2c17-4793-8a26-d5d32ee76194" x="201.92999" y="81.02" width="53.78" height="7.25"/><rect className="a8e56b8d-2c17-4793-8a26-d5d32ee76194" x="201.92999" y="102.00999" width="53.78" height="7.25"/></svg>
    </Box>  
  );
}