import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { playersColumns } from "../../Helpers/TableColumns";
import Table from "../../Components/Table/Table";
import { playersGetApi } from "../../Services/PlayerService";
import { Player } from "../../Models/Player";

type Props = {};

const PlayerSearchPage = (props: Props) => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState<Player[]>([]);
    const [playersLoading, setPlayersLoading] = useState<boolean>(true);
    const handlePlayerClick = ({ id }: Player) => {
        navigate(`/player/${id}`);
    };

    useEffect(() => {
        getPlayers();
    }, []);

    const getPlayers = () => {
        setPlayersLoading(true);
        playersGetApi().then((res) => {
            setPlayers(res?.data!);
            setPlayersLoading(false);
        });
    };

    return (
        <>
            <div className="flex w-full">
                <div className="flex-col w-full px-2">
                    <Table
                        className="py-4"
                        title="Players"
                        columns={playersColumns}
                        loading={playersLoading}
                        data={players}
                        onRowClicked={handlePlayerClick}
                    />
                </div>
            </div>
        </>
    );
};

export default PlayerSearchPage;
