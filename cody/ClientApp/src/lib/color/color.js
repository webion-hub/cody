import { ColorBrightness } from "./color_brightness"
import { Hex } from "./hex"

export class Color {
  constructor(colorObj){
    this.colorObj = colorObj
    this.color = this.getColor()
  }

  static setColor = (color) => {
    const normalizedColor = Hex.getLongHex(color)
    const finalColor = {
      r: this.getShade(normalizedColor, 'red'),
      g: this.getShade(normalizedColor, 'blue'),
      b: this.getShade(normalizedColor, 'green'),
      alpha: this.getShade(normalizedColor, 'alpha'),
    }
    
    return new Color(finalColor)
  }

  opacity = (opacity) => {
    this.colorObj.alpha = Hex.getHex(opacity)
    return new Color(this.colorObj)
  }

  darkness = (percent) => {
    const newColor = ColorBrightness
      .changeBrightness(this.colorObj, percent, 'dark')
    
    return new Color(newColor)
  }

  lightness = (percent) => {
    const newColor = ColorBrightness
      .changeBrightness(this.colorObj, percent, 'light')

    return new Color(newColor)
  }

  brightness = (percent) => {
    if(percent > 0)
      return this.lightness(percent)

    return this.darkness(Math.abs(percent))
  }

  negative = () => {
    const finalColor = {
      r: 255 - this.colorObj.r,
      g: 255 - this.colorObj.g,
      b: 255 - this.colorObj.b,
      alpha: this.colorObj.alpha,
    }
    
    return new Color(finalColor)
  }

  /**
   * @private
   */
  getColor = () => {
    const r = Hex.getHexShade(this.colorObj.r)
    const g = Hex.getHexShade(this.colorObj.g)
    const b = Hex.getHexShade(this.colorObj.b)
    const alpha = Hex.getHexShade(this.colorObj.alpha)
    return `#${r}${g}${b}${alpha}`
  }

  /**
   * @private
   * @param {ShadeStr} what
   */
  static getShade = (color, what) => {
    let firstIndex = 0;
    let lastIndex = 0;
    if(what === 'red'){firstIndex = 1; lastIndex = 2}
    if(what === 'blue'){firstIndex = 3; lastIndex = 4}
    if(what === 'green'){firstIndex = 5; lastIndex = 6}
    if(what === 'alpha'){firstIndex = 7; lastIndex = 8}

    if(what === 'alpha' && color.length <= 7)
      return ''

    const firstColor = color[firstIndex] ?? 0
    const lastColor = color[lastIndex] ?? 0
    const shade = firstColor + lastColor
    return parseInt(shade, 16)
  }
}

/**
 * @typedef {(
 *  'red' |
 *  'blue' |
 *  'green' |
 *  'alpha'
 * )} ShadeStr
 */

String.prototype.opacity = function (opacity){
  return Color.setColor(this).opacity(opacity)
};

String.prototype.darkness = function (percent){
  return Color.setColor(this).darkness(percent)
};

String.prototype.lightness = function (percent){
  return Color.setColor(this).lightness(percent)
};

String.prototype.negative = function (){
  return Color.setColor(this).negative()
};