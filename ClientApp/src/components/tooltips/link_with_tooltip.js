import { Link } from "@material-ui/core";
import { InteractiveTooltip } from './interactive_tooltip';
import { TooltipWithWaves } from './tooltip_with_waves';

export function LinkWithTooltip(props){
  const {
    children,
    title,
    onClick,
    href
  } = props

  return (
    <TooltipWithWaves
      title={title}
      TooltipComponent={InteractiveTooltip}
      removePadding
    >
      <Link 
        color="inherit" 
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    </TooltipWithWaves>
  )
}