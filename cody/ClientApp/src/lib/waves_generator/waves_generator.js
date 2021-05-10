import { getRandomValue } from "../get_random_value";
import { WaveGenerator } from "./utilities/wave_generator";

export class WavesGenerator{
  constructor(settings){
    this.width = settings.width;
    this.height = settings.height;
    this.waves = settings.waves;
    this.waveSteps = settings.waveSteps;
    this.waveStepHeight = settings.waveStepHeight;
    this.offsetY = settings.offsetY;

    this.color = settings.color;
  }

  static set(settings) {
    return new WavesGenerator(settings);
  }

  getWave(yPos){
    return WaveGenerator
      .set({
        width: this.width,
        height: this.height,
        waveSteps: this.waveSteps,
        waveStepHeight: this.waveStepHeight,
        percentageOffsetX: 0,
        percentageOffsetY: yPos,
      })
      .getWavePathDCompleted()
  }

  getColor(index){
    const colorStep = 1 / this.waves;
    const colorOpacity = colorStep*(index + 1)
    const color = this.color.opacity(colorOpacity) 
    return color.replace('#', '%23')
  }

  getOffsetY(index){
    const offsetStep = 100 / this.waves; 
    const wavePosition = index*offsetStep;
    const yOffsetNoise = getRandomValue(-offsetStep/8, offsetStep/8)
    return 100 - wavePosition + yOffsetNoise + this.offsetY;
  }

  getWavePath(index) {
    const offsetY = this.getOffsetY(index)
    const color = this.getColor(index)

    const wave = this.getWave(offsetY)    

    return (
      <path 
        key={index} 
        d={wave} 
        fill={color} 
        style={{
          transition: "0.5s ease-in-out",
        }}
      />
    )
  }

  getSvg(){
    return (
      <svg viewBox={`0 0 ${this.width} ${this.height}`} >
        {
          [...Array(this.waves)]
            .map((e, index) => this.getWavePath(index))
        }
      </svg>
    )
  }

  getWavePathForCss(index) {
    const offsetY = this.getOffsetY(index)
    const color = this.getColor(index)

    const wave = this.getWave(offsetY)    

    return `%3E%3Cpath d='${wave}' fill='${color}' style='transition: all 0.25s ease-in-out 0s;'%3E%3C/path`
  }

  getSvgForCss(){
    let waves = ""
    for(var wave = 0; wave < this.waves; wave++){
      waves += this.getWavePathForCss(wave) 
    }
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${this.width} ${this.height}'${waves}%3E%3C/svg%3E`
  }
}