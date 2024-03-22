export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
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
