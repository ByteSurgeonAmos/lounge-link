export interface UserProfile {
  firstName: string;
  lastName: string;
  designation: string;
  city: string;
  country: string;
  avatar: string;
  bio: string;
  quote: string;
  personalInterests: string[];
  currentProjects: string[]; // Keep as string array in the API response type
  topSkills: string[];
  lookingFor: string[];
  linkPreferences: string[];
  badges: Badge[];
  collaborations: Collaborator[];
  endorsements: Endorsement[];
}

export interface Badge {
  name: string;
}

export interface Collaborator {
  name: string;
  avatar?: string;
}

export interface Endorsement {
  description: string;
  giver: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export interface ProjectType {
  title: string;
  link: string;
}
