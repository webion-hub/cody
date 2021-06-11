import { PageController } from "src/lib/page_controller"
import { AvatarWithTooltip } from "../../avatar_with_tooltip"
import { ProfilePicture } from "src/lib/server_calls/profile_picture";
import { UserSmallSummary } from "src/components/user_summaries/user_small_summary";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  firstAvatar: {
    marginTop: '0px !important',
  }
}));

export function AvatarsForGroup(props){
  const {
    size,
    users,
    callerIs,
    handler,
    className,
    numberOfAvatar,
    maxAvatars,
    TooltipProps,
    noExtraAvatar,
  } = props

  const classes = useStyles();

  const getClassName = (index) => {
    const isIndexZero = index === 0
    const isFirstAvatar = noExtraAvatar && isIndexZero

    const otherClassName = isFirstAvatar ? classes.firstAvatar : ""

    return `${className} ${otherClassName}`
  }

  return (
    users
      ?.map((user, index) => {
        if(index >= maxAvatars)
          return;

        return <AvatarWithTooltip
          key={index}
          AvatarProps={{
            size: size,
            alt: user.username,
            src: ProfilePicture.url`/${user.id}`,
          }}
          ButtonProps={{
            className: getClassName(index),
            style: {zIndex: numberOfAvatar - index}
          }}
          TooltipProps={TooltipProps}
          href={`/user/${user.id}`}
          onClick={e => PageController.push(`/user/${user.id}` ,e)}
          title={
            <UserSmallSummary 
              user={user}
              callerIs={callerIs}
              handler={handler}
              onUserUpdate={_ => EventsDispatcher.setEvent('updateOrganizationMember').update()}
            />
          }
        />
      })
  )
}