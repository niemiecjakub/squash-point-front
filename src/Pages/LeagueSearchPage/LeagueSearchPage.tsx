import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table/Table";
import { leaguesGetApi } from "../../Services/LeagueService";
import { LeagueProfile } from "../../squashpoint";
import { leaguesColumns } from "../../Helpers/TableColumns";

type Props = {};

const LeagueSearchPage = (props: Props) => {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState<LeagueProfile[]>([]);
    const [leaguesLoading, setLeaguesLoading] = useState<boolean>(true);
    const handleLeagueClick = ({ id }: LeagueProfile) => {
        navigate(`/league/${id}`);
    };

    useEffect(() => {
        getLeagues();
    }, []);

    const getLeagues = () => {
        setLeaguesLoading(true);
        leaguesGetApi().then((res) => {
            setLeagues(res?.data!);
            setLeaguesLoading(false);
        });
    };

    return (
        <>
            <div className="flex w-full">
                <div className="flex-col w-full px-2">
                    <Table
                        title="Leagues"
                        columns={leaguesColumns}
                        loading={leaguesLoading}
                        data={leagues}
                        onRowClicked={handleLeagueClick}
                    />
                </div>
            </div>
        </>
    );
};

export default LeagueSearchPage;
