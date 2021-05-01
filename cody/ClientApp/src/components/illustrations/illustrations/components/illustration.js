import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Colors } from "src/lib/default_values/themes/colors/main_colors";
import IllustrationLoader from "../lib/illustration_loader";


export const Illustration = React.forwardRef((props, ref) => {
  const skeleton = getIllustrationSkeleton();
  const illustration = useRef(skeleton);
  const [, setIsLoaded] = useState(false);

  const updateContent = (svg) => {
    illustration.current = svg;
    setIsLoaded(true);
  };

  useEffect(() => {
    IllustrationLoader
      .create({...props, ref: ref })
      .load()
      .then(svg => updateContent(svg));
  }, []);

  return illustration.current;
});


const getIllustrationSkeleton = () => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Skeleton height={200} width={128}/>
      </Grid>
    </Box>
  );
}


Illustration.lazy = (illustrationName) => {
  const path = `illustrations/${illustrationName}.svg`;
  return (props) => {
    return <Illustration path={path} {...props}/>;
  };
};


Illustration.defaultProps = {
  boxProps: {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    height: '100%',
  },
  svgProps: {
    height: '100%',
    width: '100%',
    textColor: '#fff',
    primaryColor: Colors.primary,
    secondaryColor: Colors.secondary,
    tertiaryColor: Colors.tertiary,
  },
};