import React from 'react';

import { Paper } from '@material-ui/core';
import { useBackgroundWaves } from 'src/lib/hooks/use_background_waves';

export function PaperWithWaves(props){
  const classWithWavedBackground = useBackgroundWaves();

  const { className, children, otherProps } = props;
  const classesName = `${classWithWavedBackground} ${className}`

  return(
    <Paper 
      {...otherProps}
      className={classesName}
    >
      {children}
    </Paper>
  );
}

PaperWithWaves.defaultProps = {
  className: ""
}
