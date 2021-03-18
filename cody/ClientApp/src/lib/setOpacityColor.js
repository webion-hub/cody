export const setOpacityColor = (color, opacity) => {
  let newColor = ""

  if(color.charAt(0) === '#'){
    const rgbColor = hexToRgb(color)

    newColor = "rgba"
    for(let i = 3; i < rgbColor.length - 1; i++){
      newColor += rgbColor[i];
    }

    newColor += `, ${opacity})`
  }
  else if(color.substring(0,4) === "rgb(")
  {
    newColor = "rgba"
    for(let i = 3; i < color.length - 1; i++){
      newColor += color[i];
    }

    newColor += `, ${opacity})`			
  }
  else if(color.substring(0,4) === "rgba")
  {
    newColor = "rgba"
    for(let i = 4; i < color.length - 2; i++){
      newColor += color[i];
    }

    newColor += ` ${opacity})`			
  }

  return newColor;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = result ? parseInt(result[1], 16) : null;
  const g = result ? parseInt(result[2], 16) : null;
  const b = result ? parseInt(result[3], 16) : null;

  return result ? `rgb(${r}, ${g}, ${b})` : null;
}