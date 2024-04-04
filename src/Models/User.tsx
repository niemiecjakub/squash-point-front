export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    photo: string;
}

export interface UserProfileToken extends UserProfile {
    token: string;
}

export interface UserSocialProfile {
    following: UserProfile[];
    followers: UserProfile[];
    friends: UserProfile[];
    sentFriendRequests: UserProfile[];
    receivedFriendRequests: UserProfile[];
}

export type PlayerEditInputs = {
    firstName: string;
    lastName: string;
    email: string;
    image: FileList;
};
