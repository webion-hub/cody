
export interface UserAccount {
  username: string;
  email: string;
  password?: string;
  accountDetail: UserAccountDetail;
}

export interface UserAccountDetail {
  name: string;
  surname: string;
  birthDate: Date;
  profilePictureId?: number;
  profilePicture?: UserProfilePicture;
}

export interface UserProfilePicture {
  id?: number;
  picture: File | string;
}

export interface StandardRequestOptions {
  onSuccess?(): void;
  onError?(): void;
}

export enum UserRejectReasons {
  username,
  password,
  email,
  surname,
  user_exists,
  email_exists,
  server_error,
}

export enum UserAccountRole {
  Admin,
  User,
}

export enum OrganizationRole {
  User,
  Admin,
  Owner,
}

export interface CommonFilterOptions {
  filter?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  total: number;
  values: T[];
}


export namespace Cody {
  export interface Organization {
    id?: number;
    name: string;
    membersCount: number;
    isCallerAMember: boolean;
    hasLogo: boolean;
    hasCover: boolean;
    kind: OrganizationKind;
    state: OrganizationState;
    detail: OrganizationDetail;
  }

  export enum OrganizationKind {
    School,
    Company,
    Team,
  }

  export interface OrganizationState {
    hasBeenVerified: boolean;
    hasBeenDeleted: boolean;
    visibility: OrganizationVisibility;
    accessCriteria: OrganizationAccessCriteria;
  }

  export enum OrganizationVisibility {
    Public,
    Private,
  }

  export enum OrganizationAccessCriteria {
    Open,
    OnInvite,
  }

  export interface OrganizationDetail {
    city?: string;
    region?: string;
    country?: string;
    description?: string;
    website?: string;
  }

  export interface OrganizationMember {
    id: number;
    username: string;
    name: string;
    surname: string;
    role: OrganizationRole;
  }
}