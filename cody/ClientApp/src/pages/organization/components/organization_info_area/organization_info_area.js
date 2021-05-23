import React from "react";
import { BookmarkIconButton } from "src/components/bookmark_icon_button";
import InfoArea from "src/components/info/info_area";
import { OrganizationSettingsMenu } from "src/components/menu/menus/organization_settings_menu";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import JoinOrganization from "src/pages/create_or_join_organization/pages/join/join_organization";
import { OrganizationContext } from "../../organization_controller_context";
import { OrganizationBadgeAvatar } from "./components/organization_badge_avatar";


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
          <JoinOrganization
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