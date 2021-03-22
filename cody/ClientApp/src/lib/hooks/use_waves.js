import React, { useEffect } from 'react';
import { WavesGenerator } from "src/lib/waves_generator/waves_generator";
import { useTheme } from '@material-ui/core/styles';

export function useWaves(asSvg) {
  const theme = useTheme()
  const [waves, setWaves] = React.useState("")

  useEffect(() => {
    const waves = asSvg !== undefined ? 
      setWavesGenerator().getSvg() :
      setWavesGenerator().getSvgForCss()
    setWaves(waves)
  }, [theme])

  const setWavesGenerator = () => {
    return WavesGenerator
      .set({
        color: theme.palette.background.default,
        width: 1440,
        height: 590,
        waves: 3,
        waveSteps: 4,
        waveStepHeight: 100,
        offsetY: -10,
      })
  }

  return waves
}