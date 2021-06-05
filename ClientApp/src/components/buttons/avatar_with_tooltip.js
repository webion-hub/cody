import { ButtonBase } from "@material-ui/core";
import { CustomAvatar } from "src/components/avatars/custom_avatar";
import { InteractiveTooltip } from "../tooltips/interactive_tooltip";
import { TooltipWithWaves } from "../tooltips/tooltip_with_waves";

export function AvatarWithTooltip(props){

  const {
    onClick,
    href,
    buttonClassName,
    children,
    placement,
    style,
    tooltipTitle,
    TooltipComponent,
    ...otherProps
  } = props

  const tooltipWithWavesProps = TooltipComponent === TooltipWithWaves 
    && {
      TooltipComponent: InteractiveTooltip,
      removePadding: true
    }


  return (
    <TooltipComponent
      title={tooltipTitle}
      placement={placement}
      arrow
      {...tooltipWithWavesProps}
    >
      <ButtonBase
        href={href}
        onClick={onClick}
        className={buttonClassName}
        style={style}
      >
        <CustomAvatar
          disableLoadingRing
          {...otherProps}
        >
          {children}
        </CustomAvatar>
      </ButtonBase>
    </TooltipComponent>
  )
}

AvatarWithTooltip.defaultProps = {
  placement: "left",
  TooltipComponent: TooltipWithWaves
}