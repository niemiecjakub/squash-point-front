import { useCallback, useEffect, useState } from "react";
import {
    playerGamesGetByIdApi,
    playerGamesOverviewGetByIdApi,
    playerGetByIdApi,
    playerLeaguesGetByIdApi,
} from "../Services/PlayerService";
import { LeagueProfile, PlayerGames, PlayerProfileDetails, StatisticsOverview } from "../squashpoint";

type Props = {
    playerId: string;
};

const usePlayer = ({ playerId }: Props) => {
    const [playerLoading, setPlayerLoading] = useState<boolean>(true);

    const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>({} as PlayerProfileDetails);
    const [playerLeagues, setPlayerLeagues] = useState<LeagueProfile[]>([] as LeagueProfile[]);
    const [playerGames, setPlayerGames] = useState<PlayerGames>({} as PlayerGames);
    const [playerStatisctics, setPlayerStatisctics] = useState<StatisticsOverview[]>([] as StatisticsOverview[]);

    const getplayerData = useCallback(async () => {
        setPlayerLoading(true);
        await playerGetByIdApi(playerId).then((res) => {
            setPlayerInfo(res?.data!);
        });
        setPlayerLoading(false);
    }, []);

    const getPlayerLeagues = useCallback(async () => {
        await playerLeaguesGetByIdApi(playerId).then((res) => {
            setPlayerLeagues(res?.data!);
        });
    }, []);

    const getPlayerGames = useCallback(async () => {
        await playerGamesGetByIdApi(playerId).then((res) => {
            setPlayerGames(res?.data!);
        });
    }, []);

    const getPlayerStatisctics = useCallback(async () => {
        await playerGamesOverviewGetByIdApi(playerId!).then((res) => {
            setPlayerStatisctics(res?.data!);
        });
    }, []);

    useEffect(() => {
        getPlayerStatisctics();
        getPlayerGames();
        getPlayerLeagues();
        getplayerData();
    }, [getplayerData, getPlayerGames, getPlayerLeagues, getPlayerStatisctics]);

    return {
        playerInfo,
        playerLeagues,
        playerGames,
        playerStatisctics,
        playerLoading,
        refetchData: getplayerData,
    };
};

export default usePlayer;
