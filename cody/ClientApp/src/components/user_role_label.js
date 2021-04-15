import React from "react";
import { UserRoleIcon } from "./user_role_icon";

export function UserRoleLabel({role, className}){

  const getLabel = () => {
    const labels = {
      Owner: "Propietario",
      Admin: "Admin",
      User: "Utente",
    }

    return labels[role]
  }

  return (
    <>
      <UserRoleIcon role={role} className={className}/>{getLabel()}
    </>    
  )
}