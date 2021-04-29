import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { Colors } from "src/lib/default_values/themes/colors/main_colors";
import IllustrationLoader from "./illustration_loader";


export const Illustration = React.forwardRef((props, _ref) => {
  const illustration = useRef(null);
  const [, setIsLoaded] = useState(false);

  const updateContent = svg => {
    illustration.current = svg;
    setIsLoaded(true);
  };

  useEffect(() => {
    IllustrationLoader
      .create(props)
      .load()
      .then(svg => updateContent(svg));
  }, []);

  return illustration.current;
});


Illustration.lazy = (illustrationName) => {
  const path = `illustrations/${illustrationName}.svg`;
  return (props) => {
    return <Illustration path={path} {...props}/>;
  };
};


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
    textColor: '#fff',
    primaryColor: Colors.primary,
    secondaryColor: Colors.secondary,
    tertiaryColor: Colors.tertiary,
  },
};