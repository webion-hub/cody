import React, { useEffect } from "react";

import Organization from "src/lib/server_calls/organization";
import { UserOrganizationsController } from "src/lib/user_organizations_controller";
import { useListener } from "src/lib/hooks/use_listener";
import { User } from "src/lib/server_calls/user";

export const OrganizationContext = React.createContext({
	organizationData: null,
	smallUserList: [],
	callerIs: "",
	organization: _ => {},
	loading: true,
});

export const OrganizationContextConsumer = OrganizationContext.Consumer;

export const OrganizationControllerContext = ({id, children}) => {
	const [loading, setLoading] = React.useState(true)
  const [organizationData, setOrganizationData] = React.useState(null)
  const [smallUserList, setSmallUserList] = React.useState([])
  const [callerIs, setCallerIs] = React.useState("")
	const organization = Organization.withId(id)

  const getOrganizationByPageId = async () => {
    await organization
      .getInfo()
      .then(setOrganizationData)
  } 

  const getMembers = async () => {
    await organization
      .getMembersOf({
        filter: "",
        limit: 3,
        offset: null
      })
      .then(setSmallUserList)
  }

  const getRole = async () => {
    await User
      .getRoleIn(id)
      .then(setCallerIs)
  }

	const getOrganizationData = async () => {
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

  useEffect(getOrganizationData, [id])

	useListener({
    removeFirstExecution: true,
		eventFunction: updateMembers,
		controller: UserOrganizationsController.setEvent('updateOrganizationMember'),
	}, [])


	const value = {
    id,
		organizationData,
		smallUserList,
		callerIs: callerIs === "" ? "noMember" : callerIs,
		organization,
		loading,
	}

	return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}