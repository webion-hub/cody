import React from 'react';

import { Paper } from '@material-ui/core';
import { useBackgroundWaves } from 'src/lib/hooks/use_background_waves';

export const PaperWithWaves = React.forwardRef((props, ref) => {
  const classWithWavedBackground = useBackgroundWaves({color: props.color});

  const { className, children, style, otherProps } = props;
  const classesName = `${classWithWavedBackground} ${className}`

  return(
    <Paper
      {...otherProps}
      ref={ref}
      style={style}
      className={classesName}
      elevation={0}
    >
      {children}
    </Paper>
  );
})

PaperWithWaves.defaultProps = {
  className: ""
}
