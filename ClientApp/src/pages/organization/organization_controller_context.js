import React, { useEffect } from "react";

import Organization from "src/lib/server_calls/organization";
import { EventsDispatcher } from "src/lib/events_dispatcher";
import { useListener } from "src/lib/hooks/use_listener";
import { User } from "src/lib/server_calls/user";
import { UserContext } from "src/components/global_contexts/user_controller_context/user_controller_context";

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
  const [organizationData, setOrganizationData] = React.useState(null)
  const [smallUserList, setSmallUserList] = React.useState([])
  const [callerIs, setCallerIs] = React.useState("noMember")
	const organization = Organization.withId(id)

  const getOrganizationByPageId = async () => {
    await organization
      .getInfo()
      .then(setOrganizationData)
  } 

  const getMembers = async () => {
    await organization
      .getMembers({
        filter: "",
        limit: 3,
        offset: null
      })
      .then(setSmallUserList)
  }

  const getRole = async () => {
    await User
      .getRoleIn(id)
      .then(role => setCallerIs(role ?? "noMember"))
  }

	const getOrganizationData = async () => {
    if(userState === "loading")
      return

    setCallerIs("noMember")
		setLoading(true)
		await getOrganizationByPageId()
		await getMembers()
		await getRole()
		setLoading(false)
	}

  const updateMembers = async () => {
    await getMembers()
		await getRole()
  }

  useEffect(getOrganizationData, [id, userState])

	useListener({
    removeFirstExecution: true,
		eventFunction: updateMembers,
		controller: EventsDispatcher.setEvent('updateOrganizationMember'),
	}, [id])

	const value = {
    id,
		organizationData,
		smallUserList,
		callerIs: callerIs ?? "noMember",
		organization,
		loading,
	}

	return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}