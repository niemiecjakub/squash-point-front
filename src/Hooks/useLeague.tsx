import { useCallback, useEffect, useState } from "react";
import {
    leagueGamesGetApi,
    leagueGetByIdApi,
    leagueJoinApi,
    leagueLeaveApi,
    leaguePlayersGetApi,
} from "../Services/LeagueService";
import { useAuth } from "../Context/useAuth";
import { LeagueDetail, LeagueGames } from "../Models/League";
import { PlayerLeagueScore } from "../Models/Player";

type Props = {
    leagueId: string;
};

const useLeague = ({ leagueId }: Props) => {
    const { user } = useAuth();
    const [isUserJoined, setIsUserJoined] = useState<boolean>(false);
    const [leagueInfo, setLeagueInfo] = useState<LeagueDetail>({} as LeagueDetail);
    const [leagueLoading, setLeagueLoading] = useState<boolean>(true);

    const [leaguePlayers, setLeaguePlayers] = useState<PlayerLeagueScore[]>({} as PlayerLeagueScore[]);
    const [leagueGames, setLeagueGames] = useState<LeagueGames>({} as LeagueGames);

    const getLeagueInfo = useCallback(() => {
        setLeagueLoading(true);
        leagueGetByIdApi(leagueId)
            .then((res) => {
                setLeagueInfo(res?.data!);
                setLeagueLoading(false);
            })
            .catch((e) => {
                setLeagueLoading(false);
            });
    }, []);

    const getLeaguePlayers = useCallback(async () => {
        await leaguePlayersGetApi(leagueId).then((res) => {
            setLeaguePlayers(res?.data!);
        });
    }, []);

    const getLeagueGames = useCallback(async () => {
        await leagueGamesGetApi(leagueId).then((res) => {
            setLeagueGames(res?.data!);
        });
    }, []);

    const handleLeagueJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await leagueJoinApi(leagueId);
        await getLeagueInfo();
    };

    const handleLeagueLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await leagueLeaveApi(leagueId);
        await getLeagueInfo();
    };

    useEffect(() => {
        if (user && leaguePlayers.length > 0) {
            setIsUserJoined(leaguePlayers.filter((p) => p.id == user?.id).length != 0);
        }
    }, [user, leaguePlayers]);

    useEffect(() => {
        getLeaguePlayers();
        getLeagueGames();
        getLeagueInfo();
    }, [getLeaguePlayers, getLeagueGames, getLeagueInfo]);
    return {
        leagueLoading,
        isUserJoined,
        leagueInfo,
        leagueGames,
        leaguePlayers,
        handleLeagueJoin,
        handleLeagueLeave,
    };
};

export default useLeague;
