import { getRandomValue } from "../../get_random_value";

export class WaveGenerator{
  constructor(settings){
    this.width = settings.width;
    this.height = settings.height;
    this.waveSteps = settings.waveSteps;
    this.waveStepHeight = settings.waveStepHeight

    this.offsetX = 
      this.convertPercentageOffsetToPx(settings.percentageOffsetX, this.width);
    this.offsetY = 
      this.convertPercentageOffsetToPx(settings.percentageOffsetY, this.height);

    this.waveFunction = Math.sin;
    this.waveFunctionMultiplier = 10;
    this.waveFunctionOffsetX = 5;
    this.waveFunctionCycles = 10;
  }

  static set(settings) {
    return new WaveGenerator(settings);
  }

  convertPercentageOffsetToPx(percentageOffset, reference) {
    return (percentageOffset / 100) * reference;
  }

  getVectorString(vector){
    const x = vector.x;
    const y = vector.y;
    return `${x + this.offsetX},${y + this.offsetY}`
  }

  getBezierCurve(vector, x, y) {
    return `${vector} ${x + this.offsetX},${y + this.offsetY}`
  }

  getWaveStepPath(vector, x, y) {
    const vectorStr = this.getVectorString(vector)
    const bezierCurve = this.getBezierCurve(vectorStr, x, y)
    return `S${bezierCurve}`
  }

  getWaveHeight(x) {
    let yPrepared = 0;
    if(this.waveFunction !== null){
      const xNormalized = this.waveFunctionCycles*x /this.width
      yPrepared = xNormalized + this.waveFunctionOffsetX;
      yPrepared = this.waveFunction(yPrepared)*this.waveFunctionMultiplier
    }
    
    const yNoise = getRandomValue(-this.waveStepHeight/2, this.waveStepHeight/2)
    
    return yPrepared + yNoise;
  }

  getWavePathD() {
    let waveStepWidth = this.width / this.waveSteps;
    let wave = ""

    let vectorStep = {x: 0, y: 0}
    let waveStepEndPointX = 0;
    let waveStepEndPointY = 0;

    for(let waveStep = 1; waveStep < this.waveSteps + 1; waveStep++){
        vectorStep.x = waveStepEndPointX + waveStepWidth / 2;
        vectorStep.y = this.getWaveHeight(waveStepEndPointX)

        waveStepEndPointX = waveStep * waveStepWidth;
        waveStepEndPointY = this.getWaveHeight(waveStepEndPointX)

        wave += this.getWaveStepPath(
          vectorStep,
          waveStepEndPointX,
          waveStepEndPointY
        )
    }

    return wave;
  }

  getWavePathDCompleted(){
    const wave = this.getWavePathD();
    const wavePath = `M${this.offsetX},${this.offsetY} ${wave} L${this.offsetX + this.width} 0 L${this.offsetX} 0`;
    return wavePath
  }
}
