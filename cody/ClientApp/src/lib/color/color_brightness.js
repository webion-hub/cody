export class ColorBrightness {
  /**
   * @param {BrightnessAction} action
   */
  static changeBrightness = (color, percent, action) => {
    const newColor = {
      ...color,
      r: this.changeShadeBrightness(color.r, percent, action),
      g: this.changeShadeBrightness(color.g, percent, action),
      b: this.changeShadeBrightness(color.b, percent, action)
    }

    return newColor
  }

  /**
   * @private
   * @param {BrightnessAction} action
   */
  static changeShadeBrightness = (shade, percent, action) => {
    const brightnessPercent = this.getBrightnessPercent(shade, percent)
    if(action === 'dark')
      return shade - brightnessPercent
    
    if(action === 'light')
      return shade + brightnessPercent
  } 

  /**
   * @private
   */
  static getBrightnessPercent = (shade, percent) => {
    return Math.round((shade * percent) / 100)
  }
}

/**
 * @typedef {(
 *  'dark' |
 *  'light'
 * )} BrightnessAction
 */