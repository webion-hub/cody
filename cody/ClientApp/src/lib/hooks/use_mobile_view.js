import { useMediaQuery, useTheme } from "@material-ui/core";

export const useMobileView = () => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  return mobileView
}