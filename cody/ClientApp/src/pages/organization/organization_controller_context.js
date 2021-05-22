import React, { useEffect } from "react";

import Organization from "src/lib/server_calls/organization";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import { useListener } from "src/lib/hooks/use_listener";
import { User } from "src/lib/server_calls/user";
import { UserContext } from "src/components/user_controller_context/user_controller_context";

export const OrganizationContext = React.createContext({
	organizationData: null,
	smallUserList: [],
	callerIs: "",
	organization: _ => {},
	loading: true,
});

export const OrganizationContextConsumer = OrganizationContext.Consumer;

export const OrganizationControllerContext = ({id, children}) => {
  const { userState } = React.useContext(UserContext)

  const [loading, setLoading] = React.useState(true)
  const organizationData = React.useRef(null)
  const smallUserList = React.useRef([])
  const callerIs = React.useRef("noMember")
  
	const organization = Organization.withId(id)

  const getOrganizationByPageId = async () => {
    await organization
      .getInfo()
      .then(data => organizationData.current = data)
  } 

  const getMembers = async () => {
    await organization
      .getMembers({
        filter: "",
        limit: 3,
        offset: null
      })
      .then(users => smallUserList.current = users)
  }

  const getRole = async () => {
    await User
      .getRoleIn(id)
      .then(role => callerIs.current = role)
  }

	const getOrganizationData = async () => {
    if(userState === "loading")
      return

    callerIs.current = "noMember"
		setLoading(true)
		await getOrganizationByPageId()
		await getMembers()
		await getRole()
		setLoading(false)
	}

  const updateMembers = async () => {
		setLoading(true)
    await getMembers()
		await getRole()
		setLoading(false)
  }

  useEffect(getOrganizationData, [id, userState])

	useListener({
    removeFirstExecution: true,
		eventFunction: updateMembers,
		controller: EventsDispatcher.setEvent('updateOrganizationMember'),
	}, [id])

	const value = {
    id,
		organizationData: organizationData.current,
		smallUserList: smallUserList.current,
		callerIs: callerIs.current,
		organization,
		loading,
	}

	return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}