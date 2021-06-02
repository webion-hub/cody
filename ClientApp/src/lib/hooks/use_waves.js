import React, { useEffect } from 'react';
import { WavesGenerator } from "src/lib/waves_generator/waves_generator";
import { useTheme } from '@material-ui/core/styles';

export function useWaves(settings) {
  const theme = useTheme()
  const [waves, setWaves] = React.useState("")

  const asSvg = settings ? settings.asSvg : false;
  let color = settings?.color
  color = color ?? theme.palette.background[750];  

  useEffect(() => {
    const waves = asSvg ? 
      setWavesGenerator().getSvg() :
      setWavesGenerator().getSvgForCss()
    setWaves(waves)
  }, [theme])

  const setWavesGenerator = () => {
    return WavesGenerator
      .set({
        color: color,
        width: 1440,
        height: 590,
        waves: 3,
        waveSteps: 4,
        waveStepHeight: 100,
        offsetY: -15,
      })
  }

  return waves
}