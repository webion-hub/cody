import { getWindowDimensions } from "../../window_dimensions"

export const Form = {
  imageWidth: dynamicWidth(330),
  width: dynamicWidth(300),
};

function dynamicWidth(width){
  const screenWidth = getWindowDimensions().width;
  const isWidthBigger = width > screenWidth;

  return isWidthBigger ?
    screenWidth - 5:
    width;
}