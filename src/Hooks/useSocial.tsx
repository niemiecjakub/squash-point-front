import { useCallback, useEffect, useState } from "react";
import { getUserSocialDataApi } from "../Services/PlayerService";
import { useAuth } from "../Context/useAuth";
import { toast } from "react-toastify";
import {
    acceptFriendRequestApi,
    deleteFriendApi,
    followPlayerApi,
    sendFriendRequestApi,
    unfollowPlayerApi,
} from "../Services/AccountService";
import usePlayer from "./usePlayer";

type Props = {
    playerId?: string;
    onSuccess?: () => void;
};

const useSocial = ({ playerId, onSuccess }: Props) => {
    const { user } = useAuth();
    const { playerInfo } = usePlayer({ playerId: playerId! });
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false);
    const [isFriendRequestReceived, setIsFriendRequestReceived] = useState<boolean>(false);

    const getUserSocialData = useCallback(async () => {
        await getUserSocialDataApi(user!.id)
            .then((res) => {
                if (res) {
                    const { following, sentFriendRequests, receivedFriendRequests, friends } = res.data;
                    setIsFollowing(following.some((f) => f.id === playerId));
                    setIsFriend(friends.some((f) => f.id === playerId));
                    setIsFriendRequestSent(sentFriendRequests.some((f) => f.id === playerId));
                    setIsFriendRequestReceived(receivedFriendRequests.some((f) => f.id === playerId));
                }
            })
            .catch((e) => toast.warning("Server error occured"));
    }, []);

    const handlePlayerFollow = async () => {
        await followPlayerApi(playerId!);
        if (onSuccess) {
            await getUserSocialData();
            await onSuccess();
        }
        toast.success(`You are now following ${playerInfo?.fullName}`);
    };

    const handlePlayerUnfollow = async () => {
        await unfollowPlayerApi(playerId!);
        if (onSuccess) {
            await getUserSocialData();
            await onSuccess();
        }
        toast.warning(`You are no longer following ${playerInfo?.fullName}`);
    };

    const handleSendFriendRequest = async () => {
        await sendFriendRequestApi(playerId!);
        if (onSuccess) {
            await getUserSocialData();
            await onSuccess();
        }
        toast.success(`Friend request sent to ${playerInfo?.fullName}`);
    };

    const handleAcceptFriendRequest = async () => {
        await acceptFriendRequestApi(playerId!);
        if (onSuccess) {
            await getUserSocialData();
            await onSuccess();
        }
        toast.success(`You are now friends with ${playerInfo?.fullName}`);
    };

    const handleDeleteFriend = async () => {
        await deleteFriendApi(playerId!);
        if (onSuccess) {
            await getUserSocialData();
            await onSuccess();
        }
        toast.info(`${playerInfo?.fullName} removed from friend list`);
    };
    useEffect(() => {
        getUserSocialData();
    }, [getUserSocialData]);

    return {
        isFollowing,
        isFriend,
        isFriendRequestReceived,
        isFriendRequestSent,
        getUserSocialData,
        handlePlayerFollow,
        handlePlayerUnfollow,
        handleSendFriendRequest,
        handleAcceptFriendRequest,
        handleDeleteFriend,
    };
};

export default useSocial;
