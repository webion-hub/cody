import React, { useLayoutEffect } from 'react';

export function useGetSize(ref){
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);

  }, [ref.current]);

  const updateSize = () => {
    let width;
    let height;
    if(ref !== null){
      if(ref.current !== undefined)
      {
        width = ref.current.offsetWidth;
        height = ref.current.offsetHeight;
      }
      else
      {
        width = ref.innerWidth;
        height = ref.innerHeight;
      }

      const newSize = {
        width: width,
        height: height,
      }
      
      if(newSize !== size)
        setSize(newSize);
    }
	}

  return size;
}