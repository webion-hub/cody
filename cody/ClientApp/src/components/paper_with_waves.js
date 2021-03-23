import React from 'react';

import { Paper } from '@material-ui/core';
import { useBackgroundWaves } from 'src/lib/hooks/use_background_waves';

export function PaperWithWaves(props){
  const classWithWavedBackground = useBackgroundWaves();

  const { className, children, otherProps } = props;

  const propsClassName = className ? className : ""
  const classesName = `${classWithWavedBackground} ${propsClassName}`

  return(
    <Paper 
      {...otherProps}
      className={classesName}
    >
      {children}
    </Paper>
  );
}

