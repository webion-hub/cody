import React from "react";
import { BookmarkIconButton } from "src/components/icon_buttons/bookmark_icon_button";
import InfoArea from "src/components/bases/informations/info_area/info_area";
import { OrganizationSettingsMenu } from "src/components/menu/menus/organization_settings_menu";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import { OrganizationContext } from "../../organization_controller_context";
import { OrganizationBadgeAvatar } from "./components/organization_badge_avatar";
import { JoinOrganizationButton } from 'src/components/buttons/join_organization_button';


export default function OrganizationInfoArea(props){
	const {
		organizationData,
    smallUserList,
    callerIs,
    organization,
		loading,
	} = React.useContext(OrganizationContext);
  const isCallerAMember = callerIs !== "noMember"

  return (
    <InfoArea
      onUserUpdate={_ => EventsDispatcher.setEvent('updateOrganizationMember').update()}
      data={{
        title: organizationData?.name,
        subTitle: organizationData?.detail.location,
        verified: organizationData?.state.hasBeenVerified,
        description: organizationData?.detail.description,
        website: organizationData?.detail.website,
      }}
      smallUserList={smallUserList}
      callerIs={callerIs}
      loading={loading}
      handler={organization}
      button={
        (!isCallerAMember && !loading) && 
        <JoinOrganizationButton
          organization={organizationData}
        />
      }
      leftIcon={
        isCallerAMember &&
          <BookmarkIconButton
            organizationData={organizationData}
          />
      }
      rightMenu={
        <OrganizationSettingsMenu 
          organizationData={organizationData}
          callerIs={callerIs}
          loading={loading}
        />
      }
      avatar={<OrganizationBadgeAvatar/>}
    />
  );
}