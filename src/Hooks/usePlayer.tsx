import { useEffect, useState } from "react";
import { getUserSocialDataApi, playerGetByIdApi } from "../Services/PlayerService";
import { toast } from "react-toastify";
import {
    acceptFriendRequestApi,
    deleteFriendApi,
    followPlayerApi,
    sendFriendRequestApi,
    unfollowPlayerApi,
} from "../Services/AccountService";
import { useAuth } from "../Context/useAuth";
import { PlayerProfileDetails } from "../squashpoint";

type Props = {
    playerId: string;
};

const usePlayer = ({ playerId }: Props) => {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false);
    const [isFriendRequestReceived, setIsFriendRequestReceived] = useState<boolean>(false);
    const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
    const [playerInfoLoading, setPlayerInfoLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        getPlayerInfo();
    }, []);

    const getPlayerInfo = async () => {
        setPlayerInfoLoading(true);
        if (user) {
            getUserSocialData();
        }
        getplayerData();
        setPlayerInfoLoading(false);
    };

    const getplayerData = async () => {
        await playerGetByIdApi(playerId).then((res) => {
            setPlayerInfo(res?.data!);
        });
    };

    const getUserSocialData = async () => {
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
    };

    const handlePlayerFollow = async () => {
        await followPlayerApi(playerId);
        await getPlayerInfo();
        toast.success(`You are now following ${playerInfo!.fullName}`);
    };

    const handlePlayerUnfollow = async () => {
        await unfollowPlayerApi(playerId);
        await getPlayerInfo();
        toast.warning(`You are no longer following ${playerInfo!.fullName}`);
    };

    const handleSendFriendRequest = async () => {
        await sendFriendRequestApi(playerId);
        await getPlayerInfo();
        toast.success(`Friend request sent to ${playerInfo!.fullName}`);
    };

    const handleAcceptFriendRequest = async () => {
        await acceptFriendRequestApi(playerId);
        await getPlayerInfo();
        toast.success(`You are now friends with ${playerInfo!.fullName}`);
    };

    const handleDeleteFriend = async () => {
        await deleteFriendApi(playerId);
        await getPlayerInfo();
        toast.info(`${playerInfo!.fullName} removed from friend list`);
    };

    return {
        playerInfo,
        playerInfoLoading,
        getplayerData,
        getPlayerInfo,
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

export default usePlayer;
