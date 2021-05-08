import { Color } from 'src/lib/color/color';

export class AppBarOpacityController {
  constructor(ref){
    this.ref = ref;
  }
  
  static setRef = (ref) => {
    return new AppBarOpacityController(ref);
  }

  updateOpacity = (color) => {
    if(!this.ref.current)
      return

    this.ref.current.style.backgroundColor = 
      Color.setColor(color).opacity(this.getOpacity()).color
  }

  /**
   * @private
   */

  getOpacity = () => {
    const scrollY = window.scrollY
    const halfScreen = window.innerHeight / 2

    if(scrollY >= halfScreen)
      return 0.25;

    return 1 - (scrollY / halfScreen) + 0.25;
  }
}