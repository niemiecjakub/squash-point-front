import { useState } from "react";
import { LeagueProfileDetails } from "../squashpoint";
import { leagueGetByIdApi } from "../Services/LeagueService";

type Props = {};

const useLeague = (props: Props) => {
    const [leagueInfo, setLeagueInfo] = useState<LeagueProfileDetails>({} as LeagueProfileDetails);
    const [leagueLoading, setLeagueLoading] = useState<boolean>(true);

    const getLeagueInfo = (id: string) => {
        setLeagueLoading(true);
        leagueGetByIdApi(id)
            .then((res) => {
                setLeagueInfo(res?.data!);
                setLeagueLoading(false);
            })
            .catch((e) => {
                setLeagueLoading(false);
            });
    };

    return { leagueInfo, leagueLoading, getLeagueInfo };
};

export default useLeague;
