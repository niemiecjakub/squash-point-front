export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
};


export interface UserProfileToken extends UserProfile  {
  token: string;
};