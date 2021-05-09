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
    if(action === 'dark'){
      const brightnessPercent = Math.round((shade * percent) / 100)
      const newShade = shade - brightnessPercent
      return newShade > 255 ? 255 : newShade
    }
    
    if(action === 'light'){
      const brightnessPercent = Math.round(((255 - shade) * percent) / 100)
      const newShade = shade - brightnessPercent
      return newShade < 0 ? 0 : newShade
    }
  } 
}

/**
 * @typedef {(
 *  'dark' |
 *  'light'
 * )} BrightnessAction
 */