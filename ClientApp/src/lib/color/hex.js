export class Hex {
  static getHex = (dec) => {
    const limitedDec = dec > 1 ? 1 : dec
    const normalizedDec = Math.round(limitedDec * 255)
  
    return normalizedDec.toString(16)
  }
  
  static getLongHex = (hex) => {
    if(hex.length > 5)
      return hex
  
    const r = hex[1]
    const g = hex[2]
    const b = hex[3]
  
    const alpha = hex[4] ?? ""
  
    return `#${r}${r}${g}${g}${b}${b}${alpha}${alpha}`
  }

  static getHexShade = (shade) => {
    const hexShade = shade.toString(16)
    return hexShade.length === 1 
      ? `0${hexShade}` 
      : hexShade  
  }
}