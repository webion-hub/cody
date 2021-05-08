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

  lighter = (percent) => {
    const newColor = ColorBrightness
      .changeBrightness(this.colorObj, percent, 'light')

    return new Color(newColor)
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

    const firstColor = color[firstIndex] ?? ""
    const lastColor = color[lastIndex] ?? ""
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