import { ButtonAvatar } from "../buttons/button_avatar";
import { InteractiveTooltip } from "../tooltips/interactive_tooltip";
import { TooltipWithWaves } from "../tooltips/tooltip_with_waves";

export function AvatarWithTooltip(props){

  const {
    onClick,
    href,
    children,
    title,
    TooltipComponent,
    TooltipProps,
    ButtonProps,
    AvatarProps
  } = props

  const tooltipWithWavesProps = TooltipComponent === TooltipWithWaves 
    && {
      TooltipComponent: InteractiveTooltip,
      removePadding: true
    }

  return (
    <TooltipComponent
      title={title}
      arrow
      {...TooltipProps}
      {...tooltipWithWavesProps}
    >
      <span>
        <ButtonAvatar
          onClick={onClick}
          href={href}
          ButtonProps={ButtonProps}
          AvatarProps={AvatarProps}
        >
          {children}
        </ButtonAvatar>
      </span>
    </TooltipComponent>
  )
}

AvatarWithTooltip.defaultProps = {
  placement: "left",
  TooltipComponent: TooltipWithWaves
}