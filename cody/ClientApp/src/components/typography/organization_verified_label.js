import { VerifiedLabel } from "./verified_label";

export function OrganizationVerifiedLabel({organizationData, ...props}){
  return (
    <VerifiedLabel
      label={organizationData?.name}
      verified={organizationData?.state.hasBeenVerified}
      {...props}
    />
  )
}