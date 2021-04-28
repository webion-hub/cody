import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Colors } from "src/lib/default_values/themes/colors/main_colors";
import IllustrationLoader from "./illustration_loader";


export const Illustration = React.forwardRef((props, _ref) => {
  const {path} = props;
  const svgRef = useRef(null);
  const [, setIsLoaded] = useState(false);

  const updateContent = svg => {
    svgRef.current = svg;
    setIsLoaded(true);
  };

  useEffect(() => {
    IllustrationLoader
      .load(path, props)
      .then(svg => updateContent(svg));
  }, []);

  return svgRef.current;
});


Illustration.defaultProps = {
  divProps: {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    height: '100%',
  },
  svgProps: {
    height: '100%',
    width: '100%',
    primaryColor: Colors.primary,
    secondaryColor: Colors.secondary,
    tertiaryColor: Colors.tertiary,
  },
};